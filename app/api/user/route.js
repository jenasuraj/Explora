import dbConnect from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  //console.log("User ID from query checking whether user already exists:", id);
  if (!id) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }
  try {
    //console.log('in try block')
    const user = await User.findOne({ u_id: id });
    //console.log("user info is",user)
    if (!user) {
      console.log("no user found")
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    //console.log("user found")
    return NextResponse.json({ success: true, data: user },{status:200});
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}



export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { name, description, clerkId, email } = body;
    //console.log(body)
    const newUser = await User.create({
      name,
      u_id: clerkId,
      email,
      about: description, // ✅ map description to about column
      profileImg: "",
      bannerImg: "",
    });
    //console.log("user created !")
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
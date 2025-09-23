import dbConnect from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/Cloudinary";

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

  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const about = formData.get("about");
  const userId = formData.get("userId");
  const profileFile = formData.get("profile");
  const bannerFile = formData.get("banner");

  //console.log("profileFile:", profileFile, "bannerFile:", bannerFile);

  let profileUrl = null;
  let bannerUrl = null;

  // Upload profile image if provided
  if (profileFile && profileFile.size > 0) {
    const buffer = Buffer.from(
      await profileFile.stream().getReader().read().then(r => r.value)
    );
    profileUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "users" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });
  }

  // Upload banner image if provided
  if (bannerFile && bannerFile.size > 0) {
    const buffer = Buffer.from(
      await bannerFile.stream().getReader().read().then(r => r.value)
    );
    bannerUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "users" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });
  }

  try {
    // Build update object dynamically
    const updateData = { name, email, about };
    if (profileUrl) updateData.profileImg = profileUrl;
    if (bannerUrl) updateData.bannerImg = bannerUrl;

    const response = await User.findOneAndUpdate(
      { u_id: userId },
      updateData,
      { new: true, upsert: false }
    );

    if (response) {
      console.log("Updated data:", response);
      return NextResponse.json(
        { message: "Data updated successfully", data: response },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Not able to update the database" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error while updating" }, { status: 400 });
  }
}

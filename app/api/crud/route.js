import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  const response = await req.json();
  try {
    const finalDataString = JSON.stringify(response.finalData);
    const [data] = await db.query(
      "INSERT INTO post(email, place, collection) VALUES(?,?,?)",
      [response.email, response.place, finalDataString]
    );
    return NextResponse.json({ message: data.insertId }, { status: 200 });
  } catch (error) {
    console.error("DB insert error:", error);
    return NextResponse.json(
      { message: "error while submitting in db" },
      { status: 500 }
    );
  }
}

export async function DELETE(req)
{
    const id = await req.json()
    try{
        await db.query('DELETE FROM post WHERE id = ?',[id])
        return NextResponse.json({"message":"deleted"},{status:200})
    }
    catch(error){
        console.log("error in deleting...")
        return NextResponse.json({"message":"issue"},{status:404})
    }
}


export async function GET(req){
    try{
        const[rows] = await db.query('SELECT * FROM post')
        return NextResponse.json({"message":rows},{status:200})
    }
    catch(error){
        return NextResponse.json({"message":"issue fetching data"},{status:404})
    }
}
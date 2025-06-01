import { NextResponse } from "next/server";
import pool from "@/lib/db";


export async function POST(req) {
  const { formData } = await req.json();
  const days = formData.travelDays
  const destination = formData.destination
  const type = formData.travelStyle
  try {
    const [result] = await pool.query('INSERT INTO `travel-table` (days,destination,type) VALUES (?,?,?)', [days,destination,type]);
    return NextResponse.json({ message: 'User added successfully'});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to insert' }, { status: 500 });
  }
}



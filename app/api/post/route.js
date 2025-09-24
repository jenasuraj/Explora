import dbConnect from "@/lib/db";
import Post from "@/model/Post";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json()
    console.log("body is",body.userId)
    const{finalData} = body
    const {userId} = body
    const {place} = body
    const response = await Post.create({post:finalData,userId:userId,place:place})
    try{
        if(response){
            return NextResponse.json({message:"saved and created post !",data:response},{status:200})
        }
    else{
        return NextResponse.json({message:"not able to send error"},{status:400})
    } 
    } 
    catch(error){
        return NextResponse.json({message:"error while posting to DB"},{status:400})
    }  
}



export async function DELETE(req) {
    const body = await req.json()
    console.log("body is",body)  
    const {id} = body
    try{
        await Post.findByIdAndDelete(id)
        return NextResponse.json({message:"user deleted"},{status:200})
    }
    catch(error){
        return NextResponse.json({message:"not delete"},{status:400})
    } 
}
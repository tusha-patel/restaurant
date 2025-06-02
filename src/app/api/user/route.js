import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function GET() {
    return NextResponse.json({ result: true })

}



export async function POST(request) {
    const payload = await request.json();
    console.log(payload);

    let success = false;

    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const user = new userSchema(payload);
    const result = await user.save();
    if (result) {
        success = true
    }

    return NextResponse.json({ result, success })
}
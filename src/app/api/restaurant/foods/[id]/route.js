import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function GET(request, content) {
    const id = await content.params.id;
    let success = false;
    await mongoose.connect(connectionStr { useNewUrlParser: true, useUnifiedTopology: true });
    const result = await foodSchema.find({ restaurant_id: id });
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success });
}

export async function DELETE(request, content) {
    await mongoose.connect(connectionStr );
    const id = await content.params.id;
    let success = false;
    const result = await foodSchema.deleteOne({ _id: id })
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success });
}
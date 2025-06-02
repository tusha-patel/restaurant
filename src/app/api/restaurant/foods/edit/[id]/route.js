import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function GET(request, content) {
    const id = await content.params.id;
    let success = false;
    await mongoose.connect(connectionStr );

    const result = await foodSchema.findOne({ _id: id });
    if (result) {
        success = true;
    }
    return NextResponse.json({ result, success });

}



export async function PUT(request, content) {
    const id = await content.params.id;
    const { name, price, img_path, description } = await request.json();
    let success = false;
    await mongoose.connect(connectionStr );
    const result = await foodSchema.findByIdAndUpdate(id, {
        name: name,
        price: price,
        img_path: img_path ,
        description: description,
    }, { new: true });

    if (result) {
        success = true
    }
    return NextResponse.json({ result, success });
}
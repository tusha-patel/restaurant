import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function PUT(request, {params}) {
    const newStatus = params.id;
    console.log(newStatus);

    const { status } = await request.json();
    let success = false;
    await mongoose.connect(connectionStr );

    let result = await orderSchema.findOneAndUpdate({ status: newStatus }, {
        status: status
    }, { new: true });

    if (result) {
        success = true;
    }
    return NextResponse.json({ success, result })

}
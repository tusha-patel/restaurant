import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(connectionStr );
    let success = false;

    const orderObj = new orderSchema(payload);
    const result = await orderObj.save();
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success });
}


export async function GET(request) {
    const userId = request.nextUrl.searchParams.get("id");
    await mongoose.connect(connectionStr );
    let success = false;
    let result = await orderSchema.find({ user_id: userId });
    if (result) {
        let restaurantData = await Promise.all(
            result.map(async (item) => {
                let restaurantInfo = {};
                restaurantInfo.data = await restaurantSchema.findOne({ _id: item.restaurant_id });
                restaurantInfo.amount = item.amount;
                restaurantInfo.status = item.status;
                return restaurantInfo;
            })
        )

        result = restaurantData;
        success = true;
    }

    return NextResponse.json({ success: true })

}
import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function GET(request, content) {
    const id = content.params.id

    let success = false;
    await mongoose.connect(connectionStr );
    let result = await orderSchema.find({ deliveryBoy_id: id });
    if (result) {
        let restaurantData = await Promise.all(
            result.map(async (item) => {
                let restaurantInfo = {};
                restaurantInfo.data = await restaurantSchema.findOne({ _id: item.restaurant_id })
                restaurantInfo.amount = item.amount;
                restaurantInfo.status = item.status;

                return restaurantInfo;
            })
        )
        result = restaurantData;
        success = true
    }



    return NextResponse.json({ result, success })


}
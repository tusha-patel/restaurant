import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"





export async function GET(request, content) {
    let city = content.params.city;


    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let filter = { city: { $regex: new RegExp(city, "i") } }
    const result = await deliveryPartnerSchema.find(filter);
    if (result) {
        success = true;
    }

    return NextResponse.json({ result, success })
}
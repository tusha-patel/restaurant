import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurantModel";



export async function GET() {
    await mongoose.connect(connectionStr );
    const data = await restaurantSchema.find();
    return NextResponse.json({ result: data });
}

export async function POST(request) {
    await mongoose.connect(connectionStr );
    let payload = await request.json();
    let result;
    let success = false

    if (payload.login) {
        // use it for login
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if (result) {
            success = true;
        }
    } else {
        // use it for signUp 
        const restaurant = new restaurantSchema(payload);
        result = await restaurant.save();
        if (result) {
            success = true;
        }
    }



    return NextResponse.json({ result, success });
}
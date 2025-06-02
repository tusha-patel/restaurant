import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurantModel";



export async function GET() {
    let res = await mongoose.connect(connectionStr, { useNewUrlParser: true });
    console.log(res);

    const data = await restaurantSchema.find();
    console.log(data);
    return NextResponse.json({ result: true });
}

export async function POST(request) {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
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
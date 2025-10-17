import { NextResponse } from "next/server";
import User from "../../../../../models/userMode";
import { connectDB } from "../../../../../lib/mongodb";

export async function POST(request) {
    await connectDB();
    try {
        const body = await request.json();
        const user = await User.findOne({ email: body.email });
        console.log(user);
        if (user) {
            if (user.password === body.password && user.email === body.email) {
                return NextResponse.json({ user }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Email or password incorrect" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

}
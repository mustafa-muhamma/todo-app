import { NextResponse } from "next/server";
import User from "../../../../../models/userMode";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        const newUser = await User.create({ name, email, password });
        if (newUser) {
            return NextResponse.json({ newUser }, { status: 201 });
        } else {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


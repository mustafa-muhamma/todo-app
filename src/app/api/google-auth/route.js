import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/userMode";

export async function POST(req) {
    try {
        await connectDB();

        const { name, email, uid } = await req.json();

        if (!email || !uid) {
            return NextResponse.json(
                { success: false, message: "Missing email or uid." },
                { status: 400 }
            );
        }

        const lowerEmail = email.toLowerCase();

        let user = await User.findOne({ email: lowerEmail });


        if (!user) {
            user = await User.create({
                name,
                email: lowerEmail,
                password: uid,
                authProvider: "google",
            });
        }

        return NextResponse.json({ success: true, message: "User signed in", user });
    } catch (error) {
        console.error("Google auth error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

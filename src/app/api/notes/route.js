import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Note from "../../../../models/noteModel";



export async function GET() {
    const connected = await connectDB();
    if (connected) {
        console.log("Connected to DB");
    }
    try {
        const notes = await Note.find({});
        if (notes.length > 0) {
            return NextResponse.json({ notes }, { status: 200 });
        } else {
            return NextResponse.json({ message: "No notes found" }, { status: 404 });
        }

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    const { title, content } = await request.json();
    try {
        const note = await Note.create({ title, content });
        return NextResponse.json({ note }, { status: 201 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import Note from "../../../../../models/noteModel";

export async function GET(request, { params }) {
    const id = params.id;
    console.log(id);
    try {
        const note = await Note.findById(id);
        if (note) {
            return NextResponse.json({ note }, { status: 200 });
        } else {
            return NextResponse.json({ message: "No note found" }, { status: 404 });
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const id = params.id;
    const { title, content } = await request.json();
    try {
        const updateNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (updateNote) {
            return NextResponse.json({ updateNote }, { status: 200 })
        } else {
            return NextResponse.json({ message: "No note found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}

export async function DELETE(request, { params }) {
    const id = params.id;
    try {
        const deleteNote = await Note.findByIdAndDelete(id);
        if (deleteNote) {
            return NextResponse.json({ deleteNote }, { status: 200 });
        } else {
            return NextResponse.json({ message: "No note found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

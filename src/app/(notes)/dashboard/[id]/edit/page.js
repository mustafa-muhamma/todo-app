import UpdateNoteForm from "@/app/components/UpdateNoteForm";
import { redirect } from "next/navigation";
import { connectDB } from "../../../../../../lib/mongodb";
import Note from "../../../../../../models/noteModel";

export default async function EditNotePage({ params }) {
    const { id } = await params;
    await connectDB();

    const note = await Note.findById(id).lean();

    if (!note) {
        redirect("/dashboard");
    }

    // Convert _id and dates to strings
    const serializedNote = {
        ...note,
        _id: note._id.toString(),
        createdAt: note.createdAt?.toISOString(),
        updatedAt: note.updatedAt?.toISOString(),
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
            <h1 className="text-2xl font-bold mb-6 text-indigo-600">Edit Note</h1>
            <UpdateNoteForm note={serializedNote} />
        </div>
    );
}

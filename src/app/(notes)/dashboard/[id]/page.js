import DeleteNoteButton from "@/app/components/DeleteNoteButton";
import { connectDB } from "../../../../../lib/mongodb";
import NoteModel from "../../../../../models/noteModel";

export const dynamic = "force-dynamic";

const Note = async ({ params }) => {
    const { id } = await params;
    try {
        await connectDB();

        const noteData = await NoteModel.findById(id).lean();

        if (!noteData) {
            return (
                <div className="max-w-3xl mx-auto text-center mt-20 text-gray-500">
                    Note not found.
                </div>
            );
        }
        const note = {
            ...noteData,
            _id: noteData._id.toString(),
            createdAt: noteData.createdAt?.toISOString(),
            updatedAt: noteData.updatedAt?.toISOString(),
        };

        return (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{note.title}</h1>
                    <DeleteNoteButton id={note._id} />
                </header>

                <article className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                </article>
            </div>
        );
    } catch (err) {
        console.error("Note fetch error:", err);
        return (
            <div className="max-w-3xl mx-auto text-center mt-20 text-red-500">
                Failed to load note. Please try again later.
            </div>
        );
    }
};

export default Note;

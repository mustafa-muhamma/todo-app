import DeleteNoteButton from "@/app/components/DeleteNoteButton";
import { getBaseUrl } from "../../../../../lib/getBaseUrl";

export const dynamic = "force-dynamic";

const Note = async ({ params }) => {
    const { id } = params;
    const baseUrl = getBaseUrl();

    try {
        const res = await fetch(`${baseUrl}/api/notes/${id}`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`Failed to fetch note: ${res.status}`);
        }

        const data = await res.json();
        const note = data?.note;

        if (!note) {
            return (
                <div className="max-w-3xl mx-auto text-center mt-20 text-gray-500">
                    Note not found.
                </div>
            );
        }

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

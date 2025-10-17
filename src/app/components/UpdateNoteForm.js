"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { EditNote } from "../actions";

function UpdateNoteForm({ note }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("id", note._id);

        const result = await EditNote(formData);

        if (result.success) {
            setMessage("Note updated successfully!");
            startTransition(() => {
                router.push("/dashboard");
            });
        } else {
            setMessage(`${result.message}`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    defaultValue={note.title}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                    name="content"
                    defaultValue={note.content}
                    rows="5"
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {message && (
                <p className="text-center text-sm font-medium text-gray-600">{message}</p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
                {isPending ? "Updating..." : "Update Note"}
            </button>
        </form>
    );
}

export default UpdateNoteForm;
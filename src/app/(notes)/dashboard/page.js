import NoteCard from "@/app/components/NoteCard";
import Link from "next/link";
import { getBaseUrl } from "../../../../lib/getBaseUrl";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
    const baseUrl = getBaseUrl();

    try {
        const res = await fetch(`${baseUrl}/api/notes`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`Failed to fetch notes: ${res.status}`);
        }

        const data = await res.json();
        const notes = data?.notes || [];

        return (
            <div className="min-h-screen flex bg-gray-100">
                <main className="flex-1 p-8 overflow-y-auto">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
                        <Link
                            href="/dashboard/new"
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            + New Note
                        </Link>
                    </header>

                    {notes.length > 0 ? (
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.map((note) => (
                                <NoteCard key={note._id} note={note} />
                            ))}
                        </section>
                    ) : (
                        <div className="text-center text-gray-500 mt-20">
                            <p className="text-lg">
                                No notes yet. Click “New Note” to get started 📝
                            </p>
                        </div>
                    )}
                </main>
            </div>
        );
    } catch (err) {
        console.error("Dashboard fetch error:", err);
        return (
            <div className="p-8 text-center text-red-500">
                Failed to load notes. Please try again later.
            </div>
        );
    }
}

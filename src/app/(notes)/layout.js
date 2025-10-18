'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const handleLogOut = async () => {
        await fetch("/api/logout");
        router.push("/");
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold text-indigo-600 mb-8 text-center">
                        NoteSpace
                    </h2>

                    <nav className="space-y-3">
                        <Link
                            href="/dashboard"
                            className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                        >
                            All Notes
                        </Link>
                        <Link
                            href="/dashboard/new"
                            className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                        >
                            New Note
                        </Link>
                    </nav>
                </div>

                <div className="border-t mt-8 pt-4">
                    <button
                        onClick={handleLogOut}
                        className="block w-full text-center py-2 px-4 rounded-lg text-red-500 hover:bg-red-50 transition"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

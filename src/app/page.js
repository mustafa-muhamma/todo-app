import Link from "next/link";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Welcome to <span className="text-indigo-600">NoteSpace</span>
                </h1>
                <p className="text-gray-600 mb-8">
                    Organize your thoughts, keep track of tasks, and access your notes anywhere.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
                    >
                        Go to Dashboard
                    </Link>

                    <Link
                        href="/login"
                        className="w-full sm:w-auto border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition duration-200 font-medium"
                    >
                        Login / Register
                    </Link>
                </div>
            </div>

            <footer className="mt-8 text-sm text-gray-500">
                © {new Date().getFullYear()} NoteSpace — All rights reserved.
            </footer>
        </div>
    );
}

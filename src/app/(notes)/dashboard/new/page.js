import { AddNote } from '@/app/actions'

export default function AddNotePage() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
            <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                    Add New Note
                </h1>

                {/* ✅ This automatically calls the server action */}
                <form action={AddNote} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter note title..."
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            rows="6"
                            placeholder="Write your note..."
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Save Note
                    </button>
                </form>
            </div>
        </div>
    )
}

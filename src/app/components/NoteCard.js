import Link from "next/link";

const NoteCard = ({ note }) => {

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {note.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {note.content}
                    </p>
                </div>
                <div className="flex justify-end mt-4 space-x-3">
                    <Link href={`/dashboard/${note._id}/edit`} className="text-indigo-500 hover:text-indigo-700 text-sm font-medium">
                        Edit
                    </Link>
                    <Link href={`/dashboard/${note._id}`} className="text-indigo-500 hover:text-indigo-700 text-sm font-medium">
                        View
                    </Link>
                </div>
            </div>
        </>
    );
}

export default NoteCard;
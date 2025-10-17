import DeleteNoteButton from "@/app/components/DeleteNoteButton"

const Note = async ({ params }) => {
    const { id } = params
    const res = await fetch(`http://localhost:3000/api/notes/${id}`)
    const data = await res.json()
    const note = data.note
    console.log(note);

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
}

export default Note;
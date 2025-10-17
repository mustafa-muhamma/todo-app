"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { DeleteNote } from "@/app/actions";

export default function DeleteNoteButton({ id }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this note?");
        if (!confirmDelete) return;

        startTransition(async () => {
            const res = await DeleteNote(id);

            if (res?.success) {
                router.push("/dashboard");
                router.refresh();
            } else {
                alert(res?.message || "Failed to delete note");
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-50 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
        >
            {isPending ? "Deleting..." : "Delete"}
        </button>
    );
}

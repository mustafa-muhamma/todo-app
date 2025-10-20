"use client"
import { useState } from 'react'

import Link from 'next/link'
import supabase from '../../lib/supabase'

export default function Home() {
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async () => {
        if (!file) return alert('Choose an image first')
        setLoading(true)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${crypto.randomUUID()}.${fileExt}`

            const { data, error } = await supabase.storage
                .from('todo-app')
                .upload(fileName, file)

            if (error) throw error

            const { data: publicData } = supabase.storage
                .from('todo-app')
                .getPublicUrl(fileName)

            setImageUrl(publicData.publicUrl)
        } catch (error) {
            alert('Error uploading image: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full space-y-6">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Welcome to <span className="text-indigo-600">NoteSpace</span>
                </h1>
                <p className="text-gray-600">
                    Organize your thoughts, keep track of tasks, and access your notes anywhere.
                </p>

                {/* Upload Section */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100
                            "
                        />
                        <button
                            onClick={uploadImage}
                            disabled={loading}
                            className="w-full sm:w-auto bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
                        >
                            {loading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>

                    {imageUrl && (
                        <div className="mt-4">
                            <p className="text-gray-700 mb-2 font-medium">Uploaded Image Preview:</p>
                            <img
                                src={imageUrl}
                                alt="Uploaded Image"
                                className="max-w-xs rounded-lg shadow-lg mx-auto"
                            />
                        </div>
                    )}
                </div>

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
    )
}

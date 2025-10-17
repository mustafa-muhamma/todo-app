'use server';

import { connectDB } from "../../lib/mongodb";
import Note from "../../models/noteModel";
import User from "../../models/userMode";
import bcrypt from "bcrypt";

export async function userRegister(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
        return { success: false, message: "All fields are required." };
    }

    try {
        await connectDB();
        const lowerCaseEmail = email.toLowerCase();

        const existingUser = await User.findOne({ email: lowerCaseEmail });
        if (existingUser) {
            return { success: false, message: "User already exists." };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email: lowerCaseEmail,
            password: hashedPassword,
        });

        if (newUser) {
            console.log(newUser);
            return { success: true, message: "User registered successfully." };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

export async function userLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return { success: false, message: "All fields are required." };
    }

    try {
        await connectDB();
        const lowerCaseEmail = email.toLowerCase();
        const user = await User.findOne({ email: lowerCaseEmail });
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                return { success: true, message: "Login successful." };
            } else {
                return { success: false, message: "Invalid password." };
            }
        } else {
            return { success: false, message: "User not found." };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}


export async function AddNote(formData) {
    const title = formData.get('title')
    const content = formData.get('content')
    if (!title || !content) {
        return { success: false, message: 'All fields are required.' }
    }
    try {
        await connectDB()
        const newNote = await Note.create({ title, content })

        if (!newNote) {
            return { success: false, message: 'Failed to create note.' }
        }
        return { success: true, message: 'Note added successfully.', status: 201 }
    } catch (error) {
        console.error('Error adding note:', error)
        return { success: false, message: error.message }
    }
}


export async function EditNote(formData) {
    const id = formData.get('id')
    const title = formData.get('title')
    const content = formData.get('content')

    if (!id) {
        return { success: false, message: 'Note ID is required.' }
    }

    const updateData = {}
    if (title) updateData.title = title
    if (content) updateData.content = content

    if (Object.keys(updateData).length === 0) {
        return { success: false, message: 'No fields to update.' }
    }

    try {
        await connectDB()

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        )

        if (!updatedNote) {
            return { success: false, message: 'Note not found or failed to update.' }
        }

        return { success: true, message: 'Note updated successfully.', status: 200 }
    } catch (error) {
        console.error('Error updating note:', error)
        return { success: false, message: error.message }
    }
}
export async function DeleteNote(noteId) {
    try {
        await connectDB();
        const deleted = await Note.findByIdAndDelete(noteId);

        if (!deleted) {
            return { success: false, message: "Note not found" };
        }
        return { success: true, message: "Note deleted successfully" };
    } catch (error) {
        console.error("Error deleting note:", error);
        return { success: false, message: error.message };
    }
}

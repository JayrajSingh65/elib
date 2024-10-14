import mongoose from "mongoose";
import {Book} from "./bookTypes"

const bookSchema = new mongoose.Schema<Book>({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        unique: true,
        required: true,

    },

    author: {
        type: mongoose.Schema.ObjectId,
        required: true,

    },
    gener: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    filelink: {
        type: String,
        required: true
    }

}, {timestamps: true})

export default mongoose.model<Book>("Book", bookSchema);
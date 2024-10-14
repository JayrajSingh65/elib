import { User } from "../user/userTypes";

export interface Book {
    _id: string;
    author: User;
    title: string;
    gener: string;
    description: string;
    coverImage: string;
    filelink: string;
}
"use server";

import { EndpointApi } from "@/lib/Route/EndPoint";

export type notesType = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export async function getNotes() {
    try {
        const response = await fetch(EndpointApi.GETALLNOTES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
}

"use server";

import { EndpointApi } from "@/lib/Route/EndPoint";
import { revalidateTag } from "next/cache";

export async function createNote(data: {
    title: string;
    content: string;
}) {
    try {
        const response = await fetch(EndpointApi.CREATE_NOTES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to create note");
        }

        const result = await response.json();

        // Revalidate the notes query
        revalidateTag("notes", "default");

        return result;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
}

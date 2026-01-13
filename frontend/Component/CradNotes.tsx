"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquarePen, Trash } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotes, notesType } from "./Action/GetNotes";

function CradNotes() {
  const queryClient = useQueryClient();

  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const result = await getNotes();
      return result;
    },
  });

  if (isLoading) {
    return (
      <div className="py-6 px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"
          >
            <div className="p-4 space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              </div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-6 px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes?.data?.map((note: notesType) => (
        <Card key={note._id}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardAction className="flex items-center gap-3">
              <SquarePen />
              <Trash color="red" />
            </CardAction>
          </CardHeader>
          <CardContent className="font-sm text-sm">
            <p>{note.content}</p>
          </CardContent>
          <CardFooter className="font-light text-sm">
            <p>{new Date(note.createdAt).toLocaleDateString()}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default CradNotes;

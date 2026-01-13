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
import { useQuery } from "@tanstack/react-query";
import { getNotes, notesType } from "./Action/GetNotes";
import Resusabledialog from "./reusable/resusable-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { EndpointApi } from "@/lib/Route/EndPoint";
import Loader from "./reusable/Loders";

function CradNotes() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const {
    data: notes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const result = await getNotes();
      return result;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full mt-80">
        <Loader />
      </div>
    );
  }

  async function handleDelete(noteId: string) {
    console.log("Delete note with ID:", noteId);
    try {
      const response = await axios.delete(EndpointApi.DELETE_NOTES(noteId));
      toast.success(`${response?.data?.message}`);
      refetch();
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error(
        `${(error as any)?.response?.data?.message || "Failed to delete note."}`
      );
    }
  }

  return (
    <div className="py-6 px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes?.data?.map((note: notesType) => (
        <Card key={note._id}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardAction className="flex items-center gap-3">
              <SquarePen className="cursor-pointer" />
              <Resusabledialog
                open={selectedNoteId === note._id}
                onOpenChange={(open) =>
                  setSelectedNoteId(open ? note._id : null)
                }
                icon={<Trash className="cursor-pointer" color="red" />}
                title="Delete Note"
                Description="Are you sure you can delete it?"
              >
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setSelectedNoteId(null)}
                >
                  Cancel
                </Button>
              </Resusabledialog>
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

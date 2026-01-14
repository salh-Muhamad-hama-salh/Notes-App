"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit2, SquarePen, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getNotes, notesType } from "./Action/GetNotes";
import Resusabledialog from "./reusable/resusable-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { EndpointApi } from "@/lib/Route/EndPoint";
import Loader from "./reusable/Loders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import formSchemaNotes from "./FormSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function CradNotes() {
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchemaNotes>>({
    resolver: zodResolver(formSchemaNotes),
    defaultValues: {
      title: "",
      content: "",
    },
  });

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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaNotes>) {
    console.log(values);
    try {
      const response = axios.put(
        EndpointApi.UPDATE_NOTES(editNoteId as string),
        values
      );
      toast.success("Note updated successfully!");
      refetch();
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error(
        `${(error as any)?.response?.data?.message || "Failed to update note."}`
      );
    }
  }

  return (
    <div className="py-6 px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes?.data?.map((note: notesType) => (
        <Card
          key={note._id}
          onClick={() => console.log("Card clicked:", note._id)}
        >
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <div className="flex items-center gap-3">
              <CardAction className="">
                <Resusabledialog
                  open={deleteNoteId === note._id}
                  onOpenChange={(open) => {
                    setDeleteNoteId(open ? note._id : null);
                  }}
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
                    onClick={() => setDeleteNoteId(null)}
                  >
                    Cancel
                  </Button>
                </Resusabledialog>
              </CardAction>
              <CardAction>
                <Resusabledialog
                  open={editNoteId === note._id}
                  onOpenChange={(open) => {
                    setEditNoteId(open ? note._id : null);
                  }}
                  icon={<SquarePen className="cursor-pointer" />}
                  title="Edit Note"
                  Description="Are you sure you can edit it?"
                >
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Input placeholder="Content" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <Button
                        type="submit"
                        variant="default"
                        onClick={form.handleSubmit(async (values) => {
                          await onSubmit(values);
                          // Do not close modal here
                        })}
                      >
                        Save Note
                      </Button>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setEditNoteId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </Resusabledialog>
              </CardAction>
            </div>
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

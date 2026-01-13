"use client";
import Logo from "@/public/assets/Image/PF4H6402.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./Mode";
import { Plus } from "lucide-react";
import Resusabledialog from "./reusable/resusable-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchemaNotes from "./FormSchema";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createNote } from "./Action/PostNote";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchemaNotes>>({
    resolver: zodResolver(formSchemaNotes),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaNotes>) {
    try {
      setIsLoading(true);
      const result = await createNote(values);
      toast.success(`${result?.message || "Note created successfully"} ✅`);
      form.reset();
      setShowModal(false);
      // Refresh notes data
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (error: any) {
      toast.error(`Error: ${error.message || "Failed to create note"} ❌`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="flex justify-between items-center py-6 px-6 md:px-12 lg:px-24 border-b">
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <h1 className="text-sm font-medium font-sans md:text-lg  lg:text-2xl">
            Notes App By Salh
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Resusabledialog
            button_text="Create Note"
            icon={<Plus size={20} />}
            className="hidden md:flex"
            className_parent="flex items-center gap-2 border text-white px-3 py-2 rounded-md"
            open={showModal}
            onOpenChange={setShowModal}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Add Note"}
                </Button>
              </form>
            </Form>
          </Resusabledialog>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}

export default Navbar;

"use client";

import { z } from "zod";

const formSchemaNotes = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export default formSchemaNotes;

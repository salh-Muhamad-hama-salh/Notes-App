import express from "express";
import {
  createNotes,
  deleteNotes,
  getNotes,
  getNotesById,
  updateNotes,
} from "../Controller/notes.controller.js";

const route = express.Router();

route.get("/", getNotes);
route.get("/:id", getNotesById);
route.post("/", createNotes);
route.put("/:id", updateNotes);
route.delete("/:id", deleteNotes);

export default route;

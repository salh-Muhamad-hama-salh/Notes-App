import { Notes } from "../models/Notes.model.js";

export async function getNotes(_, res) {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      success: false,
      message: "هەڵەیەک ڕویدا لە کاتی وەرگرتنی تێبینیەکان",
      error: error.message,
    });
  }
}

export async function getNotesById(req, res) {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "تێبینیەک نەدۆزرایەوە",
      });
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({
      success: false,
      message: "هەڵەیەک ڕویدا لە کاتی وەرگرتنی تێبینیەک بە ID",
      error: error.message,
    });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Notes({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json({
      success: true,
      message: "تێبینیەک بە سەرکەوتوویی دروستکرا",
      data: savedNote,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      success: false,
      message: "هەڵەیەک ڕویدا لە کاتی دروستکردنی تێبینیەک",
      error: error.message,
    });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updateNotes = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updateNotes) {
      return res.status(404).json({
        success: false,
        message: "تێبینیەک نەدۆزرایەوە",
      });
    }
    res.status(201).json({
      success: true,
      message: "تێبینیەک بە سەرکەوتوویی نوێکرایەوە",
      data: updateNotes,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({
      success: false,
      message: "هەڵەیەک ڕویدا لە کاتی نوێکردنەوەی تێبینیەک",
      error: error.message,
    });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deleteNotes = await Notes.findByIdAndDelete(req.params.id);
    if (!deleteNotes) {
      return res.status(404).json({
        success: false,
        message: "تێبینیەک نەدۆزرایەوە بۆ سڕینەوە",
      });
    }
    res.status(200).json({
      success: true,
      message: "تێبینیەک بە سەرکەوتوویی سڕایەوە",
      data: deleteNotes,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "هەڵەیەک ڕویدا لە کاتی سڕینەوەی تێبینیەک",
      error: error.message,
    });
  }
}

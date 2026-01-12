import express from "express";
import notesRoute from "./Route/notes.route.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { rateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoute);
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

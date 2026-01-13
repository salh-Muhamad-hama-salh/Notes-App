import express from "express";
import notesRoute from "./Route/notes.route.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { rateLimiter } from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); // ✅ allow all origins
app.use(rateLimiter);
app.use("/api/notes", notesRoute);
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

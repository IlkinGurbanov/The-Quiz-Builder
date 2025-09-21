import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/quizzes", quizRoutes);

module.exports = app

"use strict";
const express = require("express");
const { createQuiz, getQuizzes, getQuizById, deleteQuiz } = require("../controllers/quiz.controller");
const router = express.Router();
router.post("/", createQuiz);
router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.delete("/:id", deleteQuiz);
module.exports = router;
//# sourceMappingURL=quiz.routes.js.map
"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const quiz = await prisma.quiz.create({
            data: {
                title,
                questions: { create: questions } // expects [{ type, question, options, answer }]
            },
            include: { questions: true }
        });
        res.status(201).json(quiz);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create quiz" });
    }
};
const getQuizzes = async (_req, res) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            include: { questions: true }
        });
        const formatted = quizzes.map(q => ({
            id: q.id,
            title: q.title,
            numberOfQuestions: q.questions.length
        }));
        res.json(formatted);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
};
const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await prisma.quiz.findUnique({
            where: { id: Number(id) },
            include: { questions: true }
        });
        if (!quiz)
            return res.status(404).json({ error: "Quiz not found" });
        res.json(quiz);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch quiz" });
    }
};
const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.quiz.delete({ where: { id: Number(id) } });
        res.json({ message: "Quiz deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete quiz" });
    }
};
module.exports = { createQuiz, getQuizzes, getQuizById, deleteQuiz };
//# sourceMappingURL=quiz.controller.js.map
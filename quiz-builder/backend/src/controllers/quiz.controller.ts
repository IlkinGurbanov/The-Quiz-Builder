import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE QUIZ
// CREATE QUIZ
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body;

    // if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    //   return res.status(400).json({ error: "Title and questions are required" });
    // }

    // Backend-də stringify etməyə ehtiyac yoxdur, frontend artıq göndərir
    const preparedQuestions = questions.map((q: any) => ({
      type: q.type,
      question: q.question,
      options: q.options ?? null, // frontend artıq JSON.stringify edib
      answer: q.answer ?? null,    // frontend artıq JSON.stringify edib
    }));

    const quiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: preparedQuestions,
        },
      },
      include: { questions: true },
    });

    // Frontend üçün options və answer-i parse et
    const formattedQuiz = {
      ...quiz,
      questions: quiz.questions.map(q => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : undefined,
        answer: (() => {
          try {
            return JSON.parse(q.answer);
          } catch {
            return q.answer;
          }
        })(),
      })),
    };

    res.status(201).json(formattedQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create quiz" });
  }
};



// GET ALL QUIZZES
export const getQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
    });

    const formatted = quizzes.map(q => ({
      id: q.id,
      title: q.title,
      createdAt: q.createdAt,
      questions: q.questions.map(ques => ({
        id: ques.id,
        type: ques.type,
        question: ques.question,
        options: ques.options ? JSON.parse(ques.options) : undefined,
        answer: (() => {
          try {
            return JSON.parse(ques.answer);
          } catch {
            return ques.answer;
          }
        })(),
      })),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};



// GET QUIZ BY ID
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: { questions: true },
    });

    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const formattedQuiz = {
      ...quiz,
      questions: quiz.questions.map(q => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : undefined,
        answer: (() => {
          try {
            return JSON.parse(q.answer);
          } catch {
            return q.answer;
          }
        })(),
      })),
    };

    res.json(formattedQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};

// DELETE QUIZ
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.quiz.delete({ where: { id: Number(id) } });
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};

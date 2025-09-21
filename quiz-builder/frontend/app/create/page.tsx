"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Question } from "@/types/quiz"

interface QuestionForm extends Omit<Question, "id"> {
  tempId: string
}

export default function CreateQuizPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<QuestionForm[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: QuestionForm = {
      tempId: Date.now().toString(),
      type,
      question: "",
      options: type === "checkbox" ? ["", ""] : undefined,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (tempId: string, updates: Partial<QuestionForm>) => {
    setQuestions(questions.map((q) => (q.tempId === tempId ? { ...q, ...updates } : q)))
  }

  const removeQuestion = (tempId: string) => {
    setQuestions(questions.filter((q) => q.tempId !== tempId))
  }

  const addOption = (tempId: string) => {
    const question = questions.find((q) => q.tempId === tempId)
    if (question && question.options) {
      updateQuestion(tempId, {
        options: [...question.options, ""],
      })
    }
  }

  const updateOption = (tempId: string, optionIndex: number, value: string) => {
    const question = questions.find((q) => q.tempId === tempId)
    if (question && question.options) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(tempId, { options: newOptions })
    }
  }

  const removeOption = (tempId: string, optionIndex: number) => {
    const question = questions.find((q) => q.tempId === tempId)
    if (question && question.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex)
      updateQuestion(tempId, { options: newOptions })
    }
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim() || questions.length === 0) return;

  setIsSubmitting(true);
  try {
    const quizData = {
      title: title.trim(),
      questions: questions.map(q => ({
        type: q.type,
        question: q.question,
        options: q.options ? JSON.stringify(q.options) : null,
        answer: Array.isArray(q.correctAnswer) ? JSON.stringify(q.correctAnswer) : String(q.correctAnswer),
      })),
    };
  console.log(quizData)
    const response = await fetch("http://localhost:5000/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    });

    if (!response.ok) throw new Error("Failed to create quiz");

    router.push("/quizzes");
  } catch (error) {
    console.error("Error creating quiz:", error);
  } finally {
    setIsSubmitting(false);
  }
};






  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create New Quiz</h1>
          <p className="text-muted-foreground">Build a custom quiz with multiple question types</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
              <CardDescription>Give your quiz a title and description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Quiz Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter quiz title..."
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Questions ({questions.length})</h2>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => addQuestion("boolean")}>
                  <Plus className="w-4 h-4 mr-2" />
                  True/False
                </Button>
                <Button type="button" variant="outline" onClick={() => addQuestion("input")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Short Answer
                </Button>
                <Button type="button" variant="outline" onClick={() => addQuestion("checkbox")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Multiple Choice
                </Button>
              </div>
            </div>

            {questions.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">No questions added yet</p>
                    <p className="text-sm text-muted-foreground">
                      Click one of the buttons above to add your first question
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {questions.map((question, index) => (
              <Card key={question.tempId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Question {index + 1} -{" "}
                      {question.type === "boolean"
                        ? "True/False"
                        : question.type === "input"
                          ? "Short Answer"
                          : "Multiple Choice"}
                    </CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.tempId)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`question-${question.tempId}`}>Question Text *</Label>
                    <Textarea
                      id={`question-${question.tempId}`}
                      value={question.question}
                      onChange={(e) => updateQuestion(question.tempId, { question: e.target.value })}
                      placeholder="Enter your question..."
                      required
                    />
                  </div>

                  {question.type === "boolean" && (
                    <div>
                      <Label>Correct Answer</Label>
                      <RadioGroup
                        value={question.correctAnswer?.toString() || ""}
                        onValueChange={(value) => updateQuestion(question.tempId, { correctAnswer: value === "true" })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id={`true-${question.tempId}`} />
                          <Label htmlFor={`true-${question.tempId}`}>True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id={`false-${question.tempId}`} />
                          <Label htmlFor={`false-${question.tempId}`}>False</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {question.type === "input" && (
                    <div>
                      <Label htmlFor={`answer-${question.tempId}`}>Correct Answer</Label>
                      <Input
                        id={`answer-${question.tempId}`}
                        value={question.correctAnswer?.toString() || ""}
                        onChange={(e) => updateQuestion(question.tempId, { correctAnswer: e.target.value })}
                        placeholder="Enter the correct answer..."
                      />
                    </div>
                  )}

                  {question.type === "checkbox" && question.options && (
                    <div className="space-y-4">
                      <Label>Answer Options</Label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <Checkbox
                            checked={Array.isArray(question.correctAnswer) && question.correctAnswer.includes(option)}
                            onCheckedChange={(checked) => {
                              const currentAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : []
                              if (checked) {
                                updateQuestion(question.tempId, {
                                  correctAnswer: [...currentAnswers, option],
                                })
                              } else {
                                updateQuestion(question.tempId, {
                                  correctAnswer: currentAnswers.filter((a) => a !== option),
                                })
                              }
                            }}
                          />
                          <Input
                            value={option}
                            onChange={(e) => updateOption(question.tempId, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}...`}
                            className="flex-1"
                          />
                          {question.options && question.options.length > 2 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(question.tempId, optionIndex)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={() => addOption(question.tempId)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit" disabled={!title.trim() || questions.length === 0 || isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Quiz"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

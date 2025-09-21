"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import type { Quiz } from "@/types/quiz"

// Mock data for development - will be replaced with API calls
const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    questions: [
      { id: "1", type: "boolean", question: "JavaScript is a compiled language", correctAnswer: false },
      { id: "2", type: "input", question: "What does 'DOM' stand for?", correctAnswer: "Document Object Model" },
      {
        id: "3",
        type: "checkbox",
        question: "Which are JavaScript data types?",
        options: ["String", "Number", "Boolean", "Array"],
        correctAnswer: ["String", "Number", "Boolean"],
      },
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "React Basics",
    questions: [
      { id: "1", type: "boolean", question: "React components must return JSX", correctAnswer: true },
      { id: "2", type: "input", question: "What hook is used for state management?", correctAnswer: "useState" },
    ],
    createdAt: "2024-01-14T15:30:00Z",
    updatedAt: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    title: "CSS Grid Layout",
    questions: [
      { id: "1", type: "boolean", question: "CSS Grid is one-dimensional", correctAnswer: false },
      {
        id: "2",
        type: "checkbox",
        question: "Which properties are used in CSS Grid?",
        options: ["grid-template-columns", "grid-gap", "flex-direction", "grid-area"],
        correctAnswer: ["grid-template-columns", "grid-gap", "grid-area"],
      },
      {
        id: "3",
        type: "input",
        question: "What property defines the size of grid columns?",
        correctAnswer: "grid-template-columns",
      },
      { id: "4", type: "boolean", question: "Grid items can span multiple cells", correctAnswer: true },
    ],
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
]

export default function QuizDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadQuiz = async () => {
      setIsLoading(true)
      try {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        const foundQuiz = mockQuizzes.find((q) => q.id === params.id)
        if (foundQuiz) {
          setQuiz(foundQuiz)
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error("Error loading quiz:", error)
        setNotFound(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      loadQuiz()
    }
  }, [params.id])

  const handleDeleteQuiz = async () => {
    if (!quiz || !confirm("Are you sure you want to delete this quiz?")) return

    try {
      // TODO: Replace with actual API call
      console.log("Deleting quiz:", quiz.id)
      router.push("/quizzes")
    } catch (error) {
      console.error("Error deleting quiz:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "boolean":
        return "True/False"
      case "input":
        return "Short Answer"
      case "checkbox":
        return "Multiple Choice"
      default:
        return type
    }
  }

  const getQuestionTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "boolean":
        return "default"
      case "input":
        return "secondary"
      case "checkbox":
        return "outline"
      default:
        return "default"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !quiz) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/quizzes">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quizzes
            </Link>
          </Button>
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">Quiz Not Found</h1>
                <p className="text-muted-foreground mb-4">The quiz you're looking for doesn't exist.</p>
                <Button asChild>
                  <Link href="/quizzes">View All Quizzes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/quizzes">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quizzes
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">{quiz.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created {formatDate(quiz.createdAt)}
                </div>
                {quiz.updatedAt !== quiz.createdAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Updated {formatDate(quiz.updatedAt)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Quiz
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteQuiz}
                className="text-destructive hover:text-destructive bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{quiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {quiz.questions.filter((q) => q.type === "boolean").length}
                  </div>
                  <div className="text-sm text-muted-foreground">True/False</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {quiz.questions.filter((q) => q.type === "input").length +
                      quiz.questions.filter((q) => q.type === "checkbox").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Other Types</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions ({quiz.questions.length})</CardTitle>
              <CardDescription>Review all questions and their correct answers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quiz.questions.map((question, index) => (
                <div key={question.id}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-medium text-foreground text-pretty">{question.question}</h3>
                        <Badge variant={getQuestionTypeBadgeVariant(question.type)}>
                          {getQuestionTypeLabel(question.type)}
                        </Badge>
                      </div>

                      {question.type === "boolean" && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Correct Answer:</span>
                          <div className="flex items-center gap-2">
                            {question.correctAnswer ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span className="font-medium">{question.correctAnswer ? "True" : "False"}</span>
                          </div>
                        </div>
                      )}

                      {question.type === "input" && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Correct Answer:</span>
                          <span className="font-medium bg-muted px-2 py-1 rounded text-sm">
                            {question.correctAnswer}
                          </span>
                        </div>
                      )}

                      {question.type === "checkbox" && question.options && (
                        <div className="space-y-2">
                          <span className="text-sm text-muted-foreground">Options:</span>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {question.options.map((option, optionIndex) => {
                              const isCorrect =
                                Array.isArray(question.correctAnswer) && question.correctAnswer.includes(option)
                              return (
                                <div
                                  key={optionIndex}
                                  className={`flex items-center gap-2 p-2 rounded border ${
                                    isCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-muted border-border"
                                  }`}
                                >
                                  {isCorrect ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <div className="w-4 h-4 border border-muted-foreground rounded"></div>
                                  )}
                                  <span className="text-sm">{option}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {index < quiz.questions.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

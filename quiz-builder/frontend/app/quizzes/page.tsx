"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Search, Trash2, Eye, Calendar } from "lucide-react"
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

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const loadQuizzes = async () => {
      setIsLoading(true)
      try {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setQuizzes(mockQuizzes)
      } catch (error) {
        console.error("Error loading quizzes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadQuizzes()
  }, [])

  const filteredQuizzes = quizzes.filter((quiz) => quiz.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return

    try {
      // TODO: Replace with actual API call
      console.log("Deleting quiz:", quizId)
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId))
    } catch (error) {
      console.error("Error deleting quiz:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getQuestionTypeCount = (quiz: Quiz) => {
    const counts = { boolean: 0, input: 0, checkbox: 0 }
    quiz.questions.forEach((q) => counts[q.type]++)
    return counts
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">All Quizzes</h1>
              <p className="text-muted-foreground">
                {quizzes.length} quiz{quizzes.length !== 1 ? "es" : ""} available
              </p>
            </div>
            <Button asChild>
              <Link href="/create">
                <Plus className="w-4 h-4 mr-2" />
                Create New Quiz
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredQuizzes.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "No quizzes match your search" : "No quizzes created yet"}
                </p>
                {!searchTerm && (
                  <Button asChild>
                    <Link href="/create">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Quiz
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => {
              const typeCounts = getQuestionTypeCount(quiz)
              return (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 text-balance">{quiz.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4" />
                          Created {formatDate(quiz.createdAt)}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {typeCounts.boolean > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {typeCounts.boolean} True/False
                          </Badge>
                        )}
                        {typeCounts.input > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {typeCounts.input} Short Answer
                          </Badge>
                        )}
                        {typeCounts.checkbox > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {typeCounts.checkbox} Multiple Choice
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/quizzes/${quiz.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export interface Question {
  id: string
  type: "boolean" | "input" | "checkbox"
  question: string
  options?: string[] // For checkbox questions
  correctAnswer?: string | string[] | boolean // Depends on question type
}

export interface Quiz {
  id: string
  title: string
  questions: Question[]
  createdAt: string
  updatedAt: string
}

export interface CreateQuizRequest {
  title: string
  questions: Omit<Question, "id">[]
}

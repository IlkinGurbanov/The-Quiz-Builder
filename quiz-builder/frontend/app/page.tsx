import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, List, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Quiz Builder</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Create, manage, and share custom quizzes with multiple question types. Perfect for educators, trainers, and
            anyone who wants to build engaging assessments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <PlusCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Create Quiz</CardTitle>
              <CardDescription>Build new quizzes with boolean, input, and checkbox questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/create">Start Creating</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <List className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>View All Quizzes</CardTitle>
              <CardDescription>Browse and manage your existing quiz collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/quizzes">Browse Quizzes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Question Types</CardTitle>
              <CardDescription>Support for True/False, short answers, and multiple choice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>✓ Boolean (True/False)</div>
                <div>✓ Input (Short Text)</div>
                <div>✓ Checkbox (Multiple Choice)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

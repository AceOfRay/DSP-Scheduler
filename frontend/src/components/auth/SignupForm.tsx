// components/auth/SignupForm.tsx


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router"

export function SignupForm() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Create your account
        </CardTitle>

        <CardDescription>
          Get started with DSP Scheduler
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">
            OR
          </span>
          <Separator className="flex-1" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">
            Name
          </Label>

          <Input
            id="name"
            placeholder="John Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            type="password"
          />

          <p className="text-xs text-muted-foreground">
            Use at least 8 characters.
          </p>
        </div>

        <Button className="w-full">
          Create account
        </Button>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
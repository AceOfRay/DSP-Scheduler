import { Moon, Sun } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"

function ColorSwatch({
  name,
  className,
  foregroundClassName = "text-foreground",
}: {
  name: string
  className: string
  foregroundClassName?: string
}) {
  return (
    <div
      className={`flex h-28 items-end rounded-xl border p-4 shadow-sm ${className} ${foregroundClassName}`}
    >
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-xs opacity-70">{className}</div>
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" />
        }
      >
        <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function ThemePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl space-y-10 p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Theme Playground
            </h1>

            <p className="mt-1 text-muted-foreground">
              Your shadcn semantic color palette
            </p>
          </div>

          <ThemeToggle />
        </div>

        <Separator />

        {/* Palette */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Colors</h2>
            <p className="text-sm text-muted-foreground">
              These automatically change between light and dark mode.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ColorSwatch
              name="Primary"
              className="bg-primary"
              foregroundClassName="text-primary-foreground"
            />

            <ColorSwatch
              name="Secondary"
              className="bg-secondary"
              foregroundClassName="text-secondary-foreground"
            />

            <ColorSwatch
              name="Background"
              className="bg-background"
              foregroundClassName="text-foreground"
            />

            <ColorSwatch
              name="Surface / Card"
              className="bg-card"
              foregroundClassName="text-card-foreground"
            />

            <ColorSwatch
              name="Muted"
              className="bg-muted"
              foregroundClassName="text-muted-foreground"
            />

            <ColorSwatch
              name="Accent"
              className="bg-accent"
              foregroundClassName="text-accent-foreground"
            />

            <ColorSwatch
              name="Danger"
              className="bg-destructive"
              foregroundClassName="text-destructive-foreground"
            />

            <ColorSwatch
              name="Border"
              className="bg-background border-4 border-border"
            />
          </div>
        </section>

        <Separator />

        {/* Buttons */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Buttons</h2>
            <p className="text-sm text-muted-foreground">
              shadcn components automatically consume your theme variables.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="outline">
              Outline
            </Button>

            <Button variant="ghost">
              Ghost
            </Button>

            <Button variant="destructive">
              Delete
            </Button>
          </div>
        </section>

        <Separator />

        {/* Card example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Card</h2>

          <Card className="max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create Project</CardTitle>
                <Badge>New</Badge>
              </div>

              <CardDescription>
                This card uses your surface, border, foreground, and muted
                colors.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="project-name"
                  className="text-sm font-medium"
                >
                  Project name
                </label>

                <Input
                  id="project-name"
                  placeholder="My awesome project"
                />
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  Muted surfaces work well for secondary information,
                  explanations, and inactive content.
                </p>
              </div>

              <div className="rounded-lg bg-accent p-4 text-accent-foreground">
                <p className="text-sm font-medium">
                  Accent colors can highlight useful information.
                </p>
              </div>
            </CardContent>

            <CardFooter className="justify-between">
              <Button variant="ghost">
                Cancel
              </Button>

              <Button>
                Create Project
              </Button>
            </CardFooter>
          </Card>
        </section>

        <Separator />

        {/* Status examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Status / Content</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Normal</CardTitle>
                <CardDescription>
                  Standard card surface.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Badge>Active</Badge>
              </CardContent>
            </Card>

            <Card className="border-accent">
              <CardHeader>
                <CardTitle>Highlighted</CardTitle>
                <CardDescription>
                  Uses the accent color for emphasis.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="rounded-md bg-accent p-3 text-sm text-accent-foreground">
                  Featured content
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle>Danger</CardTitle>
                <CardDescription>
                  Destructive actions should be visually obvious.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button variant="destructive">
                  Delete Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
// src/pages/HomePage.tsx

import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import TestButton from "@/components/test-button"



export default function HomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold">
                    DSP Scheduler
                </h1>

                <p className="text-muted-foreground">
                    Welcome to the app.
                </p>

                <TestButton></TestButton>

                <Link to="/theme">
                    <Button>
                        View Theme
                    </Button>
                </Link>
            </div>
        </main>
    )
}
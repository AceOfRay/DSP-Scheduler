import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router"

export default function LandingPage() {

    const navigate = useNavigate()

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />

          <div>
            <h1 className="font-semibold">Dashboard</h1>
          </div>
          <Button
            className="ml-auto"
            onClick={() => navigate("/build-schedule")}
          >
            <Plus className="h-4 w-4" />
            Build Schedule
          </Button>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome to DSP Scheduler
            </h2>

            <p className="text-muted-foreground">
              Manage your operation and build schedules from one place.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm font-medium text-muted-foreground">
                Employees
              </p>

              <p className="mt-2 text-3xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm font-medium text-muted-foreground">
                Active Schedules
              </p>

              <p className="mt-2 text-3xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm font-medium text-muted-foreground">
                Upcoming Shifts
              </p>

              <p className="mt-2 text-3xl font-bold">
                0
              </p>
            </div>
          </div>

          <div className="min-h-[400px] flex-1 rounded-xl border bg-card p-6">
            <h3 className="font-semibold">
              Schedule Overview
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Your scheduling dashboard will go here.
            </p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
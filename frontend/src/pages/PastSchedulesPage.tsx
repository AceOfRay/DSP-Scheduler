// pages/PastSchedulesPage.tsx

import { PastScheduleCard } from "@/components/past-schedule-card"
import { AppSidebar } from "@/components/app-sidebar"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const schedules = [
  {
    id: 1,
    title: "Week 32 Schedule",
    timespan: "August 3 - August 9, 2026",
    dateCreated: "August 1, 2026",
    downloadUrl: "/schedules/week-32.ics",
  },
  {
    id: 2,
    title: "Week 31 Schedule",
    timespan: "July 27 - August 2, 2026",
    dateCreated: "July 25, 2026",
    downloadUrl: "/schedules/week-31.ics",
  },
  {
    id: 3,
    title: "Week 30 Schedule",
    timespan: "July 20 - July 26, 2026",
    dateCreated: "July 18, 2026",
    downloadUrl: "/schedules/week-30.ics",
  },
  {
    id: 4,
    title: "Week 31 Schedule",
    timespan: "July 27 - August 2, 2026",
    dateCreated: "July 25, 2026",
    downloadUrl: "/schedules/week-31.ics",
  },
  {
    id: 5,
    title: "Week 30 Schedule",
    timespan: "July 20 - July 26, 2026",
    dateCreated: "July 18, 2026",
    downloadUrl: "/schedules/week-30.ics",
  },
]

export default function PastSchedulesPage() {
  function handleDelete(id: number) {
    console.log("Delete schedule:", id)
  }

  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2"
          />

          <h1 className="font-semibold">
            Past Schedules
          </h1>

          <Button
            className="ml-auto"
            onClick={() => navigate("/build-schedule")}
          >
            <Plus className="h-4 w-4" />
            Build Schedule
          </Button>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Past Schedules
            </h2>

            <p className="text-muted-foreground">
              View, download, or delete previously generated schedules.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {schedules.map((schedule) => (
              <PastScheduleCard
                key={schedule.id}
                title={schedule.title}
                timespan={schedule.timespan}
                dateCreated={schedule.dateCreated}
                downloadUrl={schedule.downloadUrl}
                onDelete={() => handleDelete(schedule.id)}
              />
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
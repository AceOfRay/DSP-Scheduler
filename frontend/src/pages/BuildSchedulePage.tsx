import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { SchedulingRange } from "@/components/build-schedule/schedule-range"
import { PersonalAppointments } from "@/components/build-schedule/personal-appointments"
import { ChooseClients } from "@/components/build-schedule/choose-clients"
import { VisitRequirements } from "@/components/build-schedule/visit-requirements"
import { ClientAvailability } from "@/components/build-schedule/client-availability"
import { VisitRules } from "@/components/build-schedule/visit-rules"
import { SchedulingPreferences } from "@/components/build-schedule/scheduling-preferences"
import { ScheduleReview } from "@/components/build-schedule/schedule-review"

export default function BuildSchedulePage() {
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
            Build Schedule
          </h1>
        </header>

        <main className="flex flex-1 flex-col gap-8 p-4 md:p-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Build Schedule
            </h2>

            <p className="text-muted-foreground">
              Configure the time range, appointments, clients, and preferences
              for your schedule.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            <SchedulingRange />
            <PersonalAppointments/>
            <ChooseClients/>
            <VisitRequirements/>
            <ClientAvailability/>
            <VisitRules/>
            <SchedulingPreferences/>
            <ScheduleReview/>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
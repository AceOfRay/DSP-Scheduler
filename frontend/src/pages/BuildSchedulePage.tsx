import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import * as React from "react"


import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { SchedulingRange } from "@/components/build-schedule/schedule-range"
import { PersonalAppointments } from "@/components/build-schedule/personal-appointments"
import { ChooseClients } from "@/components/build-schedule/choose-clients"
import { VisitRules } from "@/components/build-schedule/visit-rules"
import { SchedulingPreferences } from "@/components/build-schedule/scheduling-preferences"
import { ScheduleReview } from "@/components/build-schedule/schedule-review"
import { ScheduleConstraintBlock } from "@/models/schedule-constraint-block"
import type { ScheduleConstraintBlockData } from "@/models/schedule-constraint-block"

export default function BuildSchedulePage() {
  const scheduleBlock = React.useMemo(
    () => new ScheduleConstraintBlock(),
    []
  )

  const [scheduleData, setScheduleData] =
    React.useState<ScheduleConstraintBlockData>(
      scheduleBlock.getData()
    )

  const summary =
    scheduleBlock.getReviewSummary()

  const warnings =
    scheduleBlock.getWarnings()

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

            <SchedulingRange
              data={scheduleData}
              onDateRangeChange={(startDate, endDate) => {
                setScheduleData(
                  scheduleBlock.setScheduleDateRange(
                    startDate,
                    endDate
                  )
                )
              }}
              onStartTimeChange={(startTime) => {
                setScheduleData(
                  scheduleBlock.setScheduleStartTime(startTime)
                )
              }}
              onEndTimeChange={(endTime) => {
                setScheduleData(
                  scheduleBlock.setScheduleEndTime(endTime)
                )
              }}
            />

            <PersonalAppointments
              data={scheduleData}
              onAddAppointment={(appointment) => {
                setScheduleData(
                  scheduleBlock.addPersonalAppointment(
                    appointment
                  )
                )
              }}
              onRemoveAppointment={(id) => {
                setScheduleData(
                  scheduleBlock.removePersonalAppointment(id)
                )
              }}
            />
            <ChooseClients
              data={scheduleData}
              onAddClient={(clientId) => {
                setScheduleData(
                  scheduleBlock.addClient(clientId)
                )
              }}
              onRemoveClient={(clientId) => {
                setScheduleData(
                  scheduleBlock.removeClient(clientId)
                )
              }}
              onSetSelectedClients={(clientIds) => {
                setScheduleData(
                  scheduleBlock.setSelectedClients(
                    clientIds
                  )
                )
              }}
            />


            <VisitRules
              data={scheduleData}
              onTravelBufferChange={(minutes) => {
                setScheduleData(
                  scheduleBlock.setTravelBuffer(minutes)
                )
              }}
              onDocumentationBufferChange={(minutes) => {
                setScheduleData(
                  scheduleBlock.setDocumentationBuffer(
                    minutes
                  )
                )
              }}
              onAllowBackToBackChange={(allow) => {
                setScheduleData(
                  scheduleBlock.setAllowBackToBack(allow)
                )
              }}
              onAllowSameClientSameDayChange={(allow) => {
                setScheduleData(
                  scheduleBlock.setAllowSameClientSameDay(
                    allow
                  )
                )
              }}
              onAllowSplitVisitsChange={(allow) => {
                setScheduleData(
                  scheduleBlock.setAllowSplitVisits(allow)
                )
              }}
              onMaxVisitsPerDayChange={(maxVisits) => {
                setScheduleData(
                  scheduleBlock.setMaxVisitsPerDay(
                    maxVisits
                  )
                )
              }}
            />

            <SchedulingPreferences
              data={scheduleData}
              onMinimizeDrivingChange={(enabled) => {
                setScheduleData(
                  scheduleBlock.setMinimizeDriving(enabled)
                )
              }}
              onGroupNearbyClientsChange={(enabled) => {
                setScheduleData(
                  scheduleBlock.setGroupNearbyClients(enabled)
                )
              }}
              onAvoidLargeGapsChange={(enabled) => {
                setScheduleData(
                  scheduleBlock.setAvoidLargeGaps(enabled)
                )
              }}
              onBalanceWorkloadChange={(enabled) => {
                setScheduleData(
                  scheduleBlock.setBalanceWorkload(enabled)
                )
              }}
              onPreferMorningsChange={(enabled) => {
                setScheduleData(
                  scheduleBlock.setPreferMornings(enabled)
                )
              }}
              onPreferAfternoonsChange={(enabled) => {
                setScheduleData(
                  scheduleBlock.setPreferAfternoons(enabled)
                )
              }}
              onScheduleStyleChange={(style) => {
                setScheduleData(
                  scheduleBlock.setScheduleStyle(style)
                )
              }}
            />
            <ScheduleReview
              data={scheduleData}
              summary={summary}
              warnings={warnings}
              onBuildSchedule={() => {
                console.log(
                  "Schedule block:",
                  scheduleBlock.getData()
                )
              }}
            />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
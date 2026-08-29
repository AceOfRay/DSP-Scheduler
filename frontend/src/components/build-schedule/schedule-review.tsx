import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import type {
  ScheduleConstraintBlockData,
} from "@/models/schedule-constraint-block"

type ScheduleReviewProps = {
  data: ScheduleConstraintBlockData

  summary: {
    scheduleStartDate: string | null
    scheduleEndDate: string | null
    selectedClients: number
    totalVisits: number
    totalClientMinutes: number
    personalAppointments: number
    travelBuffer: number
    documentationBuffer: number
  }

  warnings: string[]

  onBuildSchedule: () => void
}

const dayLabels = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
}

function formatTime(time: string) {
  if (!time) return "—"

  const [hours, minutes] = time.split(":")

  const date = new Date()

  date.setHours(
    Number(hours),
    Number(minutes),
    0,
    0
  )

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })
}

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes} min`
  }

  if (remainingMinutes === 0) {
    return `${hours} hr${hours === 1 ? "" : "s"}`
  }

  return `${hours} hr ${remainingMinutes} min`
}

function formatDateRange(
  startDate: string | null,
  endDate: string | null
) {
  if (!startDate || !endDate) {
    return "Not configured"
  }

  const start = new Date(
    `${startDate}T00:00:00`
  )

  const end = new Date(
    `${endDate}T00:00:00`
  )

  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
}

function formatAppointmentDate(date: string) {
  const appointmentDate = new Date(
    `${date}T00:00:00`
  )

  return appointmentDate.toLocaleDateString(
    undefined,
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  )
}

export function ScheduleReview({
  data,
  summary,
  warnings,
  onBuildSchedule,
}: ScheduleReviewProps) {
  const readyToBuild =
    warnings.length === 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          5. Review & Build
        </CardTitle>

        <CardDescription>
          Review your scheduling setup before
          generating the schedule.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Scheduling Range
                </p>

                <p className="mt-1 font-medium">
                  {formatDateRange(
                    summary.scheduleStartDate,
                    summary.scheduleEndDate
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Clients
                </p>

                <p className="mt-1 font-medium">
                  {summary.selectedClients} selected
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {summary.totalVisits} total{" "}
                  {summary.totalVisits === 1
                    ? "visit"
                    : "visits"}{" "}
                  per week
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Client Time
                </p>

                <p className="mt-1 font-medium">
                  {formatMinutes(
                    summary.totalClientMinutes
                  )}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Required across all selected
                  client visits
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Personal Appointments
                </p>

                <p className="mt-1 font-medium">
                  {summary.personalAppointments}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Blocked commitments
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium">
            Weekly Schedule
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Your regular working availability as defined in the Me Page
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {Object.entries(
              data.weeklySchedule
            ).map(
              ([day, schedule]) => (
                <div
                  key={day}
                  className="rounded-md bg-muted/50 p-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium">
                      {
                        dayLabels[
                          day as keyof typeof dayLabels
                        ]
                      }
                    </p>

                    {!schedule.enabled && (
                      <span className="text-sm text-muted-foreground">
                        Unavailable
                      </span>
                    )}
                  </div>

                  {schedule.enabled && (
                    <div className="mt-2 space-y-1">
                      {schedule.timeSpans.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No times configured
                        </p>
                      ) : (
                        schedule.timeSpans.map(
                          (span) => (
                            <p
                              key={span.id}
                              className="text-sm text-muted-foreground"
                            >
                              {formatTime(
                                span.startTime
                              )}
                              {" - "}
                              {formatTime(
                                span.endTime
                              )}
                            </p>
                          )
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium">
            Personal Appointments
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Commitments the scheduler needs to
            work around.
          </p>

          {data.personalAppointments.length ===
          0 ? (
            <div className="mt-3 rounded-md bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">
                No personal appointments.
              </p>
            </div>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {data.personalAppointments.map(
                (appointment) => (
                  <div
                    key={appointment.id}
                    className="rounded-md bg-muted/50 p-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">
                          {appointment.title}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatAppointmentDate(
                            appointment.date
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1">
                      {appointment.timeSpans.map(
                        (span) => (
                          <p
                            key={span.id}
                            className="text-sm text-muted-foreground"
                          >
                            {formatTime(
                              span.startTime
                            )}
                            {" - "}
                            {formatTime(
                              span.endTime
                            )}
                          </p>
                        )
                      )}
                    </div>

                    {appointment.location && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {appointment.location}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="font-medium">
            Scheduling Rules
          </h3>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">
                Travel Buffer
              </p>

              <p className="font-medium">
                {formatMinutes(
                  summary.travelBuffer
                )}
              </p>
            </div>

            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">
                Documentation Buffer
              </p>

              <p className="font-medium">
                {formatMinutes(
                  summary.documentationBuffer
                )}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium">
            Schedule Check
          </h3>

          {warnings.length === 0 ? (
            <div className="mt-3 flex items-start gap-3 rounded-lg border p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-muted-foreground" />

              <div>
                <p className="font-medium">
                  Ready to build
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  No obvious conflicts were found
                  in the current configuration.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {warnings.map((warning) => (
                <div
                  key={warning}
                  className="flex items-start gap-3 rounded-lg border p-4"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <p className="font-medium">
                      Possible scheduling issue
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {warning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">
              Ready to generate your schedule?
            </p>

            <p className="text-sm text-muted-foreground">
              The scheduler will use the constraints
              and preferences above to build the best
              available schedule.
            </p>
          </div>

          <Button
            size="lg"
            disabled={!readyToBuild}
            onClick={onBuildSchedule}
          >
            Build Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
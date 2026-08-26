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
  personalAppointments: number
  travelBuffer: number
  documentationBuffer: number
}

  warnings: string[]

  onBuildSchedule: () => void
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

  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)

  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
}

export function ScheduleReview({
  data,
  summary,
  warnings,
  onBuildSchedule,
}: ScheduleReviewProps) {
  const readyToBuild = warnings.length === 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          6. Review & Build
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

                <p className="mt-1 text-sm text-muted-foreground">
                  {data.scheduleStartTime}
                  {" - "}
                  {data.scheduleEndTime}
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
                  clients
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

                <p className="mt-1 text-sm text-muted-foreground">
                  Required across all visits
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
                  Blocked periods
                </p>
              </div>
            </div>
          </div>
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
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

export function ScheduleReview() {
  const summary = {
    dateRange: "Aug 31, 2026 - Sep 6, 2026",
    workingDays: 5,
    selectedClients: 3,
    totalVisits: 5,
    totalClientTime: "7 hrs",
    personalAppointments: 2,
    travelBuffer: "30 min",
    documentationBuffer: "15 min",
  }

  const warnings = [
    "Maria Garcia only has one available window for a 2 hour visit.",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          8. Review & Build
        </CardTitle>

        <CardDescription>
          Review your scheduling setup before generating the schedule.
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
                  {summary.dateRange}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {summary.workingDays} working days
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
                  {summary.selectedClients} selected clients
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {summary.totalVisits} total visits
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
                  {summary.totalClientTime}
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
                {summary.travelBuffer}
              </p>
            </div>

            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">
                Documentation Buffer
              </p>

              <p className="font-medium">
                {summary.documentationBuffer}
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
                  No obvious conflicts were found in the current configuration.
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
              The scheduler will use the constraints and preferences above
              to build the best available schedule.
            </p>
          </div>

          <Button size="lg">
            Build Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
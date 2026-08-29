
import * as React from "react"

import { format } from "date-fns"

import {
  CalendarIcon,
  Clock,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react"

import type {
  PersonalAppointment,
  TimeSpan,
} from "@/models/schedule-constraint-block"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type PersonalAppointmentsProps = {
  appointments: PersonalAppointment[]

  onAddAppointment: (
    appointment: PersonalAppointment
  ) => void

  onRemoveAppointment: (id: string) => void
}

export function PersonalAppointments({
  appointments,
  onAddAppointment,
  onRemoveAppointment,
}: PersonalAppointmentsProps) {
  const [open, setOpen] = React.useState(false)

  const [title, setTitle] = React.useState("")

  const [date, setDate] =
    React.useState<Date | undefined>()

  const [timeSpans, setTimeSpans] =
    React.useState<TimeSpan[]>([
      {
        id: crypto.randomUUID(),
        startTime: "",
        endTime: "",
      },
    ])

  const [location, setLocation] =
    React.useState("")

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const invalidTimeSpans = timeSpans.some(
    (span) =>
      !span.startTime ||
      !span.endTime ||
      span.startTime >= span.endTime
  )

  const overlappingTimeSpans = timeSpans.some(
    (span, index) =>
      timeSpans.some(
        (otherSpan, otherIndex) =>
          index !== otherIndex &&
          span.startTime &&
          span.endTime &&
          otherSpan.startTime &&
          otherSpan.endTime &&
          span.startTime < otherSpan.endTime &&
          span.endTime > otherSpan.startTime
      )
  )

  function resetForm() {
    setTitle("")
    setDate(undefined)
    setTimeSpans([
      {
        id: crypto.randomUUID(),
        startTime: "",
        endTime: "",
      },
    ])
    setLocation("")
  }

  function addTimeSpan() {
    setTimeSpans((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        startTime: "",
        endTime: "",
      },
    ])
  }

  function removeTimeSpan(id: string) {
    setTimeSpans((current) =>
      current.filter((span) => span.id !== id)
    )
  }

  function updateTimeSpan(
    id: string,
    field: "startTime" | "endTime",
    value: string
  ) {
    setTimeSpans((current) =>
      current.map((span) =>
        span.id === id
          ? {
              ...span,
              [field]: value,
            }
          : span
      )
    )
  }

  function addAppointment() {
    if (
      !title ||
      !date ||
      invalidTimeSpans ||
      overlappingTimeSpans
    ) {
      return
    }

    const appointment: PersonalAppointment = {
      id: crypto.randomUUID(),
      title,
      date: format(date, "yyyy-MM-dd"),
      timeSpans,
      location: location || undefined,
    }

    onAddAppointment(appointment)

    resetForm()
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              Personal Appointments
            </CardTitle>

            <CardDescription className="mt-1">
              Add personal commitments that the
              scheduler should work around.
            </CardDescription>
          </div>

          <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen)

              if (!nextOpen) {
                resetForm()
              }
            }}
          >
            <DialogTrigger>
              <Button>
                <Plus className="h-4 w-4" />
                Add Appointment
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  Add Personal Appointment
                </DialogTitle>

                <DialogDescription>
                  Block off one or more time ranges
                  that should not be used for client
                  visits.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-5 py-2">
                <div className="space-y-2">
                  <Label htmlFor="appointment-title">
                    Appointment
                  </Label>

                  <Input
                    id="appointment-title"
                    placeholder="Dentist appointment"
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>

                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date &&
                            "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>
                            Select a date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={{
                          before: today,
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <Label>
                      Blocked Times
                    </Label>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addTimeSpan}
                    >
                      <Plus className="h-4 w-4" />
                      Add Time
                    </Button>
                  </div>

                  {timeSpans.map((span) => (
                    <div
                      key={span.id}
                      className="flex items-end gap-3"
                    >
                      <div className="grid flex-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>
                            Start Time
                          </Label>

                          <Input
                            type="time"
                            value={span.startTime}
                            onChange={(event) =>
                              updateTimeSpan(
                                span.id,
                                "startTime",
                                event.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>
                            End Time
                          </Label>

                          <Input
                            type="time"
                            value={span.endTime}
                            onChange={(event) =>
                              updateTimeSpan(
                                span.id,
                                "endTime",
                                event.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      {timeSpans.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeTimeSpan(span.id)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {invalidTimeSpans && (
                    <p className="text-sm text-destructive">
                      Each start time must be before
                      its end time.
                    </p>
                  )}

                  {!invalidTimeSpans &&
                    overlappingTimeSpans && (
                      <p className="text-sm text-destructive">
                        Blocked time ranges cannot
                        overlap.
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment-location">
                    Location
                    <span className="ml-1 text-muted-foreground">
                      (optional)
                    </span>
                  </Label>

                  <Input
                    id="appointment-location"
                    placeholder="123 Main St"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  onClick={addAppointment}
                  disabled={
                    !title ||
                    !date ||
                    invalidTimeSpans ||
                    overlappingTimeSpans
                  }
                >
                  Add Appointment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {appointments.length === 0 ? (
          <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
            <CalendarIcon className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">
              No personal appointments
            </p>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Add appointments, errands, or other
              commitments that should be blocked off
              while building your schedule.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-start justify-between gap-4 rounded-lg border p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium">
                    {appointment.title}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="h-4 w-4" />

                      {format(
                        new Date(
                          `${appointment.date}T00:00:00`
                        ),
                        "EEE, MMM d"
                      )}
                    </div>

                    {appointment.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />

                        {appointment.location}
                      </div>
                    )}
                  </div>

                  <div className="mt-3 space-y-1.5">
                    {appointment.timeSpans.map(
                      (span) => (
                        <div
                          key={span.id}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground"
                        >
                          <Clock className="h-4 w-4" />

                          {span.startTime}
                          {" - "}
                          {span.endTime}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onRemoveAppointment(
                      appointment.id
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


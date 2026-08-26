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
  ScheduleConstraintBlockData,
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
  data: ScheduleConstraintBlockData

  onAddAppointment: (
    appointment: PersonalAppointment
  ) => void

  onRemoveAppointment: (id: string) => void
}

export function PersonalAppointments({
  data,
  onAddAppointment,
  onRemoveAppointment,
}: PersonalAppointmentsProps) {
  const [open, setOpen] = React.useState(false)

  const [title, setTitle] = React.useState("")
  const [date, setDate] =
    React.useState<Date | undefined>()
  const [startTime, setStartTime] =
    React.useState("")
  const [endTime, setEndTime] =
    React.useState("")
  const [location, setLocation] =
    React.useState("")

  function resetForm() {
    setTitle("")
    setDate(undefined)
    setStartTime("")
    setEndTime("")
    setLocation("")
  }

  function addAppointment() {
    if (
      !title ||
      !date ||
      !startTime ||
      !endTime
    ) {
      return
    }

    const appointment: PersonalAppointment = {
      id: crypto.randomUUID(),
      title,
      date: format(date, "yyyy-MM-dd"),
      startTime,
      endTime,
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
              2. Personal Appointments
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
                  Block off time that should not be
                  used for client visits.
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
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-start">
                      Start Time
                    </Label>

                    <Input
                      id="appointment-start"
                      type="time"
                      value={startTime}
                      onChange={(event) =>
                        setStartTime(
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointment-end">
                      End Time
                    </Label>

                    <Input
                      id="appointment-end"
                      type="time"
                      value={endTime}
                      onChange={(event) =>
                        setEndTime(
                          event.target.value
                        )
                      }
                    />
                  </div>
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
                    !startTime ||
                    !endTime
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
        {data.personalAppointments.length === 0 ? (
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
            {data.personalAppointments.map(
              (appointment) => (
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

                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />

                        {appointment.startTime}
                        {" - "}
                        {appointment.endTime}
                      </div>

                      {appointment.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />

                          {appointment.location}
                        </div>
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
              )
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
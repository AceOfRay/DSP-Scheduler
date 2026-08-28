import { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export type DayAvailability = {
  enabled: boolean
  startTime: string
  endTime: string
}

export type WeeklyAvailability = {
  monday: DayAvailability
  tuesday: DayAvailability
  wednesday: DayAvailability
  thursday: DayAvailability
  friday: DayAvailability
  saturday: DayAvailability
  sunday: DayAvailability
}

export type VisitRequirements = {
  visitsPerWeek: number
  visitDurationMinutes: number
}

export type ClientAppointment = {
  id: number
  title: string
  date: string
  startTime: string
  durationMinutes: number
}

export type Client = {
  id: number
  name: string
  location: string
  serviceHours: string
  active: boolean

  visitRequirements: VisitRequirements
  availability: WeeklyAvailability
  appointments: ClientAppointment[]
}

interface ClientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: Client | null
  onSave: (client: Omit<Client, "id">) => void
}

const emptyAvailability: WeeklyAvailability = {
  monday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  tuesday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  wednesday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  thursday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  friday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  saturday: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
  sunday: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
}

const emptyClient: Omit<Client, "id"> = {
  name: "",
  location: "",
  serviceHours: "",
  active: true,

  visitRequirements: {
    visitsPerWeek: 1,
    visitDurationMinutes: 60,
  },

  availability: emptyAvailability,

  appointments: [],
}

const days: {
  key: keyof WeeklyAvailability
  label: string
}[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
]

export function ClientModal({
  open,
  onOpenChange,
  client,
  onSave,
}: ClientModalProps) {
  const [formData, setFormData] =
    useState<Omit<Client, "id">>(emptyClient)

  useEffect(() => {
    if (!open) {
      return
    }

    if (client) {
      const { id, ...clientData } = client
      setFormData(clientData)
    } else {
      setFormData(emptyClient)
    }
  }, [client, open])

  function handleSave() {
    onSave(formData)
    onOpenChange(false)
  }

  function updateAvailability(
    day: keyof WeeklyAvailability,
    updates: Partial<DayAvailability>
  ) {
    setFormData((current) => ({
      ...current,
      availability: {
        ...current.availability,
        [day]: {
          ...current.availability[day],
          ...updates,
        },
      },
    }))
  }

  function addAppointment() {
    const appointment: ClientAppointment = {
      id: Date.now(),
      title: "",
      date: "",
      startTime: "",
      durationMinutes: 60,
    }

    setFormData((current) => ({
      ...current,
      appointments: [
        ...current.appointments,
        appointment,
      ],
    }))
  }

  function updateAppointment(
    id: number,
    updates: Partial<ClientAppointment>
  ) {
    setFormData((current) => ({
      ...current,
      appointments: current.appointments.map(
        (appointment) =>
          appointment.id === id
            ? {
                ...appointment,
                ...updates,
              }
            : appointment
      ),
    }))
  }

  function removeAppointment(id: number) {
    setFormData((current) => ({
      ...current,
      appointments: current.appointments.filter(
        (appointment) => appointment.id !== id
      ),
    }))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {client ? "Edit Client" : "Add Client"}
          </DialogTitle>

          <DialogDescription>
            Manage client information and scheduling
            requirements.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="details"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">
              Details
            </TabsTrigger>

            <TabsTrigger value="requirements">
              Requirements
            </TabsTrigger>

            <TabsTrigger value="availability">
              Availability
            </TabsTrigger>

            <TabsTrigger value="appointments">
              Appointments
            </TabsTrigger>
          </TabsList>

          {/* DETAILS */}

          <TabsContent
            value="details"
            className="space-y-6 pt-4"
          >
            <div className="space-y-2">
              <Label htmlFor="client-name">
                Client Name
              </Label>

              <Input
                id="client-name"
                value={formData.name}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-location">
                Location
              </Label>

              <Input
                id="client-location"
                value={formData.location}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
                placeholder="Seattle, WA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-hours">
                Service Hours
              </Label>

              <Input
                id="service-hours"
                value={formData.serviceHours}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    serviceHours: event.target.value,
                  }))
                }
                placeholder="40 hours / month"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <Label htmlFor="client-active">
                  Active Client
                </Label>

                <p className="text-sm text-muted-foreground">
                  Active clients can be included when
                  building schedules.
                </p>
              </div>

              <Switch
                id="client-active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData((current) => ({
                    ...current,
                    active: checked,
                  }))
                }
              />
            </div>
          </TabsContent>

          {/* VISIT REQUIREMENTS */}

          <TabsContent
            value="requirements"
            className="space-y-6 pt-4"
          >
            <div>
              <h3 className="font-medium">
                Visit Requirements
              </h3>

              <p className="text-sm text-muted-foreground">
                Define how frequently this client needs
                service and how long each visit lasts.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="visits-per-week">
                  Visits Per Week
                </Label>

                <Input
                  id="visits-per-week"
                  type="number"
                  min={1}
                  value={
                    formData.visitRequirements
                      .visitsPerWeek
                  }
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      visitRequirements: {
                        ...current.visitRequirements,
                        visitsPerWeek: Number(
                          event.target.value
                        ),
                      },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visit-duration">
                  Visit Duration
                </Label>

                <div className="flex items-center gap-2">
                  <Input
                    id="visit-duration"
                    type="number"
                    min={1}
                    value={
                      formData.visitRequirements
                        .visitDurationMinutes
                    }
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        visitRequirements: {
                          ...current.visitRequirements,
                          visitDurationMinutes: Number(
                            event.target.value
                          ),
                        },
                      }))
                    }
                  />

                  <span className="shrink-0 text-sm text-muted-foreground">
                    minutes
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-medium">
                Weekly Service Requirement
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {
                  formData.visitRequirements
                    .visitsPerWeek
                }{" "}
                visits ×{" "}
                {
                  formData.visitRequirements
                    .visitDurationMinutes
                }{" "}
                minutes ={" "}
                {formData.visitRequirements
                  .visitsPerWeek *
                  formData.visitRequirements
                    .visitDurationMinutes}{" "}
                minutes per week
              </p>
            </div>
          </TabsContent>

          {/* AVAILABILITY */}

          <TabsContent
            value="availability"
            className="space-y-6 pt-4"
          >
            <div>
              <h3 className="font-medium">
                Weekly Availability
              </h3>

              <p className="text-sm text-muted-foreground">
                Define when visits may be scheduled for
                this client.
              </p>
            </div>

            <div className="space-y-3">
              {days.map(({ key, label }) => {
                const availability =
                  formData.availability[key]

                return (
                  <div
                    key={key}
                    className="grid items-center gap-4 rounded-lg border p-4 sm:grid-cols-[130px_1fr]"
                  >
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={availability.enabled}
                        onCheckedChange={(checked) =>
                          updateAvailability(key, {
                            enabled: checked,
                          })
                        }
                      />

                      <span className="font-medium">
                        {label}
                      </span>
                    </div>

                    {availability.enabled ? (
                      <div className="flex items-center gap-3">
                        <Input
                          type="time"
                          value={
                            availability.startTime
                          }
                          onChange={(event) =>
                            updateAvailability(key, {
                              startTime:
                                event.target.value,
                            })
                          }
                        />

                        <span className="text-sm text-muted-foreground">
                          to
                        </span>

                        <Input
                          type="time"
                          value={
                            availability.endTime
                          }
                          onChange={(event) =>
                            updateAvailability(key, {
                              endTime:
                                event.target.value,
                            })
                          }
                        />
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Unavailable
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {/* APPOINTMENTS */}

          <TabsContent
            value="appointments"
            className="space-y-6 pt-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">
                  Fixed Appointments
                </h3>

                <p className="text-sm text-muted-foreground">
                  Add existing appointments that the
                  scheduler must work around.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addAppointment}
              >
                <Plus className="h-4 w-4" />
                Add Appointment
              </Button>
            </div>

            {formData.appointments.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-sm font-medium">
                  No appointments
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  This client currently has no fixed
                  appointments.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.appointments.map(
                  (appointment) => (
                    <div
                      key={appointment.id}
                      className="space-y-4 rounded-lg border p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">
                            Appointment
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Time that should be blocked
                            from scheduling.
                          </p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeAppointment(
                              appointment.id
                            )
                          }
                          aria-label="Remove appointment"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Appointment Name
                        </Label>

                        <Input
                          value={appointment.title}
                          placeholder="Doctor appointment"
                          onChange={(event) =>
                            updateAppointment(
                              appointment.id,
                              {
                                title:
                                  event.target.value,
                              }
                            )
                          }
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <Label>Date</Label>

                          <Input
                            type="date"
                            value={appointment.date}
                            onChange={(event) =>
                              updateAppointment(
                                appointment.id,
                                {
                                  date:
                                    event.target.value,
                                }
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>
                            Start Time
                          </Label>

                          <Input
                            type="time"
                            value={
                              appointment.startTime
                            }
                            onChange={(event) =>
                              updateAppointment(
                                appointment.id,
                                {
                                  startTime:
                                    event.target.value,
                                }
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>
                            Duration
                          </Label>

                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min={1}
                              value={
                                appointment.durationMinutes
                              }
                              onChange={(event) =>
                                updateAppointment(
                                  appointment.id,
                                  {
                                    durationMinutes:
                                      Number(
                                        event.target
                                          .value
                                      ),
                                  }
                                )
                              }
                            />

                            <span className="text-sm text-muted-foreground">
                              min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSave}
          >
            {client ? "Save Changes" : "Add Client"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
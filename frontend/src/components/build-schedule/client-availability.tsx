import * as React from "react"

import { CalendarDays, Plus, Trash2, Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TimeWindow = {
  id: number
  startTime: string
  endTime: string
}

type DayAvailability = {
  day: string
  enabled: boolean
  windows: TimeWindow[]
}

type ClientAvailability = {
  id: number
  name: string
  availability: DayAvailability[]
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

function createDefaultAvailability(): DayAvailability[] {
  return days.map((day) => ({
    day,
    enabled: false,
    windows: [
      {
        id: Date.now() + Math.random(),
        startTime: "09:00",
        endTime: "17:00",
      },
    ],
  }))
}

const initialClients: ClientAvailability[] = [
  {
    id: 1,
    name: "John Smith",
    availability: createDefaultAvailability(),
  },
  {
    id: 2,
    name: "Maria Garcia",
    availability: createDefaultAvailability(),
  },
  {
    id: 3,
    name: "David Johnson",
    availability: createDefaultAvailability(),
  },
]

export function ClientAvailability() {
  const [clients, setClients] =
    React.useState<ClientAvailability[]>(
      initialClients
    )

  function toggleDay(
    clientId: number,
    day: string
  ) {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              availability:
                client.availability.map(
                  (availability) =>
                    availability.day === day
                      ? {
                          ...availability,
                          enabled:
                            !availability.enabled,
                        }
                      : availability
                ),
            }
          : client
      )
    )
  }

  function updateTime(
    clientId: number,
    day: string,
    windowId: number,
    field: "startTime" | "endTime",
    value: string
  ) {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              availability:
                client.availability.map(
                  (availability) =>
                    availability.day === day
                      ? {
                          ...availability,
                          windows:
                            availability.windows.map(
                              (window) =>
                                window.id ===
                                windowId
                                  ? {
                                      ...window,
                                      [field]:
                                        value,
                                    }
                                  : window
                            ),
                        }
                      : availability
                ),
            }
          : client
      )
    )
  }

  function addWindow(
    clientId: number,
    day: string
  ) {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              availability:
                client.availability.map(
                  (availability) =>
                    availability.day === day
                      ? {
                          ...availability,
                          windows: [
                            ...availability.windows,
                            {
                              id: Date.now(),
                              startTime: "09:00",
                              endTime: "17:00",
                            },
                          ],
                        }
                      : availability
                ),
            }
          : client
      )
    )
  }

  function removeWindow(
    clientId: number,
    day: string,
    windowId: number
  ) {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              availability:
                client.availability.map(
                  (availability) =>
                    availability.day === day
                      ? {
                          ...availability,
                          windows:
                            availability.windows.filter(
                              (window) =>
                                window.id !==
                                windowId
                            ),
                        }
                      : availability
                ),
            }
          : client
      )
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          5. Client Availability
        </CardTitle>

        <CardDescription>
          Define when each selected client is
          available to be visited.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {clients.length === 0 ? (
          <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
            <Users className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">
              No clients selected
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Select clients before configuring
              their availability.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="rounded-lg border p-4"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />

                    <p className="font-medium">
                      {client.name}
                    </p>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Select the days and time
                    windows this client can be seen.
                  </p>
                </div>

                <div className="space-y-4">
                  {client.availability.map(
                    (dayAvailability) => (
                      <div
                        key={dayAvailability.day}
                        className="rounded-md border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={`${client.id}-${dayAvailability.day}`}
                            checked={
                              dayAvailability.enabled
                            }
                            onCheckedChange={() =>
                              toggleDay(
                                client.id,
                                dayAvailability.day
                              )
                            }
                          />

                          <Label
                            htmlFor={`${client.id}-${dayAvailability.day}`}
                            className="font-medium"
                          >
                            {
                              dayAvailability.day
                            }
                          </Label>
                        </div>

                        {dayAvailability.enabled && (
                          <div className="mt-3 space-y-3 pl-7">
                            {dayAvailability.windows.map(
                              (
                                window,
                                index
                              ) => (
                                <div
                                  key={
                                    window.id
                                  }
                                  className="flex flex-col gap-2 sm:flex-row sm:items-end"
                                >
                                  <div className="flex-1 space-y-2">
                                    <Label>
                                      {index ===
                                      0
                                        ? "Start Time"
                                        : "Start"}
                                    </Label>

                                    <Input
                                      type="time"
                                      value={
                                        window.startTime
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateTime(
                                          client.id,
                                          dayAvailability.day,
                                          window.id,
                                          "startTime",
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                    />
                                  </div>

                                  <div className="flex-1 space-y-2">
                                    <Label>
                                      {index ===
                                      0
                                        ? "End Time"
                                        : "End"}
                                    </Label>

                                    <Input
                                      type="time"
                                      value={
                                        window.endTime
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        updateTime(
                                          client.id,
                                          dayAvailability.day,
                                          window.id,
                                          "endTime",
                                          event
                                            .target
                                            .value
                                        )
                                      }
                                    />
                                  </div>

                                  {dayAvailability
                                    .windows
                                    .length >
                                    1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        removeWindow(
                                          client.id,
                                          dayAvailability.day,
                                          window.id
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              )
                            )}

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                addWindow(
                                  client.id,
                                  dayAvailability.day
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                              Add Time Window
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
import {
  CalendarDays,
  Plus,
  Trash2,
  Users,
} from "lucide-react"

import type {
  ScheduleConstraintBlockData,
} from "@/models/schedule-constraint-block"

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

const activeClients = [
  {
    id: 1,
    name: "John Smith",
  },
  {
    id: 2,
    name: "Maria Garcia",
  },
  {
    id: 3,
    name: "David Johnson",
  },
  {
    id: 4,
    name: "Sarah Williams",
  },
]

type ClientAvailabilityProps = {
  data: ScheduleConstraintBlockData

  onToggleDay: (
    clientId: number,
    day: string
  ) => void

  onUpdateTime: (
    clientId: number,
    day: string,
    windowId: string,
    field: "startTime" | "endTime",
    value: string
  ) => void

  onAddWindow: (
    clientId: number,
    day: string
  ) => void

  onRemoveWindow: (
    clientId: number,
    day: string,
    windowId: string
  ) => void
}

export function ClientAvailability({
  data,
  onToggleDay,
  onUpdateTime,
  onAddWindow,
  onRemoveWindow,
}: ClientAvailabilityProps) {
  const clients =
    data.clientAvailability.map(
      (clientAvailability) => {
        const client = activeClients.find(
          (client) =>
            client.id ===
            clientAvailability.clientId
        )

        return {
          ...clientAvailability,
          name:
            client?.name ??
            `Client ${clientAvailability.clientId}`,
        }
      }
    )

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
                key={client.clientId}
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
                        key={
                          dayAvailability.day
                        }
                        className="rounded-md border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={`${client.clientId}-${dayAvailability.day}`}
                            checked={
                              dayAvailability.enabled
                            }
                            onCheckedChange={() =>
                              onToggleDay(
                                client.clientId,
                                dayAvailability.day
                              )
                            }
                          />

                          <Label
                            htmlFor={`${client.clientId}-${dayAvailability.day}`}
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
                                        onUpdateTime(
                                          client.clientId,
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
                                        onUpdateTime(
                                          client.clientId,
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
                                        onRemoveWindow(
                                          client.clientId,
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
                                onAddWindow(
                                  client.clientId,
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
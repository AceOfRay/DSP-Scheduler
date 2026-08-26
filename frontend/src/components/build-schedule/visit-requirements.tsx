import { Clock, Users } from "lucide-react"

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

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

const visitLengthOptions = [
  {
    label: "30 minutes",
    value: 30,
  },
  {
    label: "45 minutes",
    value: 45,
  },
  {
    label: "1 hour",
    value: 60,
  },
  {
    label: "1 hour 30 minutes",
    value: 90,
  },
  {
    label: "2 hours",
    value: 120,
  },
  {
    label: "2 hours 30 minutes",
    value: 150,
  },
  {
    label: "3 hours",
    value: 180,
  },
]

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes} min`
  }

  if (remainingMinutes === 0) {
    return `${hours} hr${
      hours === 1 ? "" : "s"
    }`
  }

  return `${hours} hr ${remainingMinutes} min`
}

type VisitRequirementsProps = {
  data: ScheduleConstraintBlockData

  onVisitCountChange: (
    clientId: number,
    visitCount: number
  ) => void

  onVisitLengthChange: (
    clientId: number,
    visitLength: number
  ) => void
}

export function VisitRequirements({
  data,
  onVisitCountChange,
  onVisitLengthChange,
}: VisitRequirementsProps) {
  const clients =
    data.visitRequirements.map(
      (requirement) => {
        const client = activeClients.find(
          (client) =>
            client.id ===
            requirement.clientId
        )

        return {
          ...requirement,
          name:
            client?.name ??
            `Client ${requirement.clientId}`,
        }
      }
    )

  const totalVisits = clients.reduce(
    (total, client) =>
      total + client.visitCount,
    0
  )

  const totalMinutes = clients.reduce(
    (total, client) =>
      total +
      client.visitCount *
        client.visitLength,
    0
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              4. Visit Requirements
            </CardTitle>

            <CardDescription className="mt-1">
              Define how often each client should
              be visited and how long each visit
              should last.
            </CardDescription>
          </div>

          <div className="hidden text-right text-sm text-muted-foreground sm:block">
            <p>
              {totalVisits} total visits
            </p>

            <p>
              {formatMinutes(totalMinutes)} total
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {clients.length === 0 ? (
          <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
            <Users className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">
              No clients selected
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Select clients before configuring
              visit requirements.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {clients.map((client) => {
              const totalClientMinutes =
                client.visitCount *
                client.visitLength

              return (
                <div
                  key={client.clientId}
                  className="rounded-lg border p-4"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">
                        {client.name}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />

                        {formatMinutes(
                          totalClientMinutes
                        )}{" "}
                        total scheduled time
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`visit-count-${client.clientId}`}
                      >
                        Visits Needed
                      </Label>

                      <Input
                        id={`visit-count-${client.clientId}`}
                        type="number"
                        min={1}
                        value={
                          client.visitCount
                        }
                        onChange={(event) =>
                          onVisitCountChange(
                            client.clientId,
                            Math.max(
                              1,
                              Number(
                                event.target
                                  .value
                              )
                            )
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Visit Length
                      </Label>

                      <Select
                        value={String(
                          client.visitLength
                        )}
                        onValueChange={(value) =>
                          onVisitLengthChange(
                            client.clientId,
                            Number(value)
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {visitLengthOptions.map(
                            (option) => (
                              <SelectItem
                                key={
                                  option.value
                                }
                                value={String(
                                  option.value
                                )}
                              >
                                {
                                  option.label
                                }
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
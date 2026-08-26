import * as React from "react"

import { Clock, Users } from "lucide-react"

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

type ClientVisitRequirement = {
  id: number
  name: string
  visitCount: number
  visitLength: number
}

const initialClients: ClientVisitRequirement[] = [
  {
    id: 1,
    name: "John Smith",
    visitCount: 2,
    visitLength: 90,
  },
  {
    id: 2,
    name: "Maria Garcia",
    visitCount: 1,
    visitLength: 120,
  },
  {
    id: 3,
    name: "David Johnson",
    visitCount: 2,
    visitLength: 60,
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

// eventually add in functionality such that days that the user doesn't work 
// are greyed out with highlight text that explain that the user doesn't work those days

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

export function VisitRequirements() {
  const [clients, setClients] =
    React.useState<ClientVisitRequirement[]>(
      initialClients
    )

  function updateVisitCount(
    clientId: number,
    value: number
  ) {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              visitCount: value,
            }
          : client
      )
    )
  }

  function updateVisitLength(
    clientId: number,
    value: number
  ) {
    setClients((current) =>
      current.map((client) =>
        client.id === clientId
          ? {
              ...client,
              visitLength: value,
            }
          : client
      )
    )
  }

  const totalVisits = clients.reduce(
    (total, client) =>
      total + client.visitCount,
    0
  )

  const totalMinutes = clients.reduce(
    (total, client) =>
      total +
      client.visitCount * client.visitLength,
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
              Define how often each client should be
              visited and how long each visit should
              last.
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
              Select clients before configuring visit
              requirements.
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
                  key={client.id}
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
                        htmlFor={`visit-count-${client.id}`}
                      >
                        Visits Needed
                      </Label>

                      <Input
                        id={`visit-count-${client.id}`}
                        type="number"
                        min={1}
                        value={client.visitCount}
                        onChange={(event) =>
                          updateVisitCount(
                            client.id,
                            Math.max(
                              1,
                              Number(
                                event.target.value
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
                          updateVisitLength(
                            client.id,
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
                                key={option.value}
                                value={String(
                                  option.value
                                )}
                              >
                                {option.label}
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
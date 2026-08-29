import { Check, Users } from "lucide-react"

import type {
  ScheduleConstraintBlockData,
} from "@/models/schedule-constraint-block"

import type { Client } from "@/components/client-modal"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


type ChooseClientsProps = {
  data: ScheduleConstraintBlockData
  clients: Client[]
  loading: boolean

  onAddClient: (clientId: number) => void
  onRemoveClient: (clientId: number) => void

  onSetSelectedClients: (
    clientIds: number[]
  ) => void
}


export function ChooseClients({
  data,
  clients,
  loading,
  onAddClient,
  onRemoveClient,
  onSetSelectedClients,
}: ChooseClientsProps) {
  const selectedClientIds =
    data.selectedClientIds

  function toggleClient(clientId: number) {
    const selected =
      selectedClientIds.includes(clientId)

    if (selected) {
      onRemoveClient(clientId)
    } else {
      onAddClient(clientId)
    }
  }

  function toggleAllClients() {
    if (
      selectedClientIds.length ===
      clients.length
    ) {
      onSetSelectedClients([])
      return
    }

    onSetSelectedClients(
      clients.map((client) => client.id)
    )
  }

  const allSelected =
    clients.length > 0 &&
    selectedClientIds.length === clients.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>
              2. Choose Clients
            </CardTitle>

            <CardDescription className="mt-1">
              Select the active clients you want
              included in this schedule.
            </CardDescription>
          </div>

          <div className="text-sm text-muted-foreground">
            {selectedClientIds.length} selected
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed p-6">
            <p className="text-sm text-muted-foreground">
              Loading clients...
            </p>
          </div>
        ) : clients.length === 0 ? (
          <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
            <Users className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">
              No active clients
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Activate or add a client before
              building a schedule.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAllClients}
              >
                {allSelected
                  ? "Clear All"
                  : "Select All"}
              </Button>
            </div>

            <div className="space-y-2">
              {clients.map((client) => {
                const selected =
                  selectedClientIds.includes(
                    client.id
                  )

                return (
                  <div
                    key={client.id}
                    className="flex items-start gap-3 rounded-lg border p-4"
                  >
                    <Checkbox
                      id={`client-${client.id}`}
                      checked={selected}
                      onCheckedChange={() =>
                        toggleClient(client.id)
                      }
                    />

                    <Label
                      htmlFor={`client-${client.id}`}
                      className="flex flex-1 cursor-pointer flex-col gap-1"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">
                          {client.name}
                        </span>

                        {selected && (
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Check className="h-4 w-4" />
                            Selected
                          </span>
                        )}
                      </div>

                      <span className="text-sm font-normal text-muted-foreground">
                        {client.location}
                      </span>

                      <span className="text-sm font-normal text-muted-foreground">
                        {
                          client.visitRequirements
                            .visitsPerWeek
                        }{" "}
                        visits/week ·{" "}
                        {
                          client.visitRequirements
                            .visitDurationMinutes
                        }{" "}
                        min each
                      </span>

                      <span className="text-sm font-normal text-muted-foreground">
                        {client.serviceHours}
                      </span>
                    </Label>
                  </div>
                )
              })}
            </div>
          </>
        )}

        <div className="border-t pt-4">
          <Button
            variant="outline"
            disabled
          >
            Add New Client
          </Button>

          <p className="mt-2 text-sm text-muted-foreground">
            This can later save the current
            schedule as a draft before taking you
            to the Add Client page.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
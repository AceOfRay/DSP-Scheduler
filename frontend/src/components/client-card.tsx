import {
  CalendarDays,
  Clock,
  MapPin,
  Pencil,
  Repeat2,
} from "lucide-react"

import type { Client } from "@/components/client-modal"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

interface ClientCardProps {
  client: Client
  onEdit: () => void
}

export function ClientCard({
  client,
  onEdit,
}: ClientCardProps) {
  const availableDays = Object.values(
    client.availability
  ).filter((day) => day.enabled).length

  return (
    <Card
      className={`transition-shadow hover:shadow-md ${
        !client.active ? "opacity-70" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">
            {client.name}
          </CardTitle>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onEdit}
            aria-label={`Edit ${client.name}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />

          <span>{client.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />

          <span>{client.serviceHours}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Repeat2 className="h-4 w-4 shrink-0" />

          <span>
            {
              client.visitRequirements
                .visitsPerWeek
            }{" "}
            visits/week ·{" "}
            {
              client.visitRequirements
                .visitDurationMinutes
            }{" "}
            min
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0" />

          <span>
            Available {availableDays}{" "}
            {availableDays === 1 ? "day" : "days"}{" "}
            / week
          </span>
        </div>

        {client.appointments.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {client.appointments.length} fixed{" "}
            {client.appointments.length === 1
              ? "appointment"
              : "appointments"}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
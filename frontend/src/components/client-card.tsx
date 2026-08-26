import {
  Clock,
  MapPin,
  Pencil,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

interface ClientCardProps {
  name: string
  location: string
  serviceHours: string
  active: boolean
  onEdit: () => void
}

export function ClientCard({
  name,
  location,
  serviceHours,
  active,
  onEdit,
}: ClientCardProps) {
  return (
    <Card
      className={`transition-shadow hover:shadow-md ${
        !active ? "opacity-70" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">
            {name}
          </CardTitle>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onEdit}
            aria-label={`Edit ${name}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />

          <span>
            {location}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />

          <span>
            {serviceHours}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
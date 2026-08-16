// components/client-card.tsx

import { MapPin, Clock } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ClientCardProps {
  name: string
  location: string
  serviceHours: string
}

export function ClientCard({
  name,
  location,
  serviceHours,
}: ClientCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          {name}
        </CardTitle>
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
// components/past-schedule-card.tsx

import { Download, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PastScheduleCardProps {
  title: string
  timespan: string
  dateCreated: string
  downloadUrl: string
  onDelete: () => void
}

export function PastScheduleCard({
  title,
  timespan,
  dateCreated,
  downloadUrl,
  onDelete,
}: PastScheduleCardProps) {
  function handleDownload() {
    const link = document.createElement("a")

    link.href = downloadUrl
    link.download = `${title}.ics`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardContent
        className="
          flex flex-col gap-3 px-4 py-3
          md:grid
          md:grid-cols-[200px_90px_220px_70px_1fr_auto]
          md:items-center
          md:gap-4
          md:px-5
        "
      >
        <h3 className="font-semibold">
          {title}
        </h3>

        <span className="hidden font-medium md:block">
          Timespan:
        </span>

        <div className="text-sm">
          <span className="font-medium md:hidden">
            Timespan:{" "}
          </span>

          <span className="text-muted-foreground">
            {timespan}
          </span>
        </div>

        <span className="hidden font-medium md:block">
          Created:
        </span>

        <div className="text-sm">
          <span className="font-medium md:hidden">
            Created:{" "}
          </span>

          <span className="text-muted-foreground">
            {dateCreated}
          </span>
        </div>

        <div className="flex items-center gap-2 md:justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            aria-label={`Download ${title}`}
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="destructive"
            size="icon"
            onClick={onDelete}
            aria-label={`Delete ${title}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
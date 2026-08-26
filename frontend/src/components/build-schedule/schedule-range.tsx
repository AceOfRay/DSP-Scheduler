import * as React from "react"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SchedulingRange() {
  const [dateRange, setDateRange] =
    React.useState<DateRange | undefined>()

  const [startTime, setStartTime] =
    React.useState("08:00")

  const [endTime, setEndTime] =
    React.useState("17:00")

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          1. Scheduling Range
        </CardTitle>

        <CardDescription>
          Choose the period of time you want to build a schedule for.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>
            Date Range
          </Label>

          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM d, yyyy")}
                      {" - "}
                      {format(dateRange.to, "MMM d, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM d, yyyy")
                  )
                ) : (
                  <span>Select a date range</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-0"
              align="start"
            >
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">
              Default Work Hours
            </h3>

            <p className="text-sm text-muted-foreground">
              Set the default time window that client visits can
              be scheduled within.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="schedule-start-time">
                Start Time
              </Label>

              <Input
                id="schedule-start-time"
                type="time"
                value={startTime}
                onChange={(event) =>
                  setStartTime(event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-end-time">
                End Time
              </Label>

              <Input
                id="schedule-end-time"
                type="time"
                value={endTime}
                onChange={(event) =>
                  setEndTime(event.target.value)
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

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

import type {
  ScheduleConstraintBlockData,
} from "@/models/schedule-constraint-block"



type SchedulingRangeProps = {
  data: ScheduleConstraintBlockData

  onDateRangeChange: (
    startDate: string | null,
    endDate: string | null
  ) => void

  onStartTimeChange: (time: string) => void

  onEndTimeChange: (time: string) => void
}

export function SchedulingRange({
  data,
  onDateRangeChange,
  onStartTimeChange,
  onEndTimeChange,
}: SchedulingRangeProps) {

  const dateRange: DateRange | undefined =
    data.scheduleStartDate
      ? {
        from: new Date(
          `${data.scheduleStartDate}T00:00:00`
        ),
        to: data.scheduleEndDate
          ? new Date(
            `${data.scheduleEndDate}T00:00:00`
          )
          : undefined,
      }
      : undefined

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
                onSelect={(range) => {
                  onDateRangeChange(
                    range?.from
                      ? format(range.from, "yyyy-MM-dd")
                      : null,
                    range?.to
                      ? format(range.to, "yyyy-MM-dd")
                      : null
                  )
                }} numberOfMonths={2}
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
                value={data.scheduleStartTime}
                onChange={(event) =>
                  onStartTimeChange(event.target.value)
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
                value={data.scheduleEndTime}
                onChange={(event) =>
                  onEndTimeChange(event.target.value)
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
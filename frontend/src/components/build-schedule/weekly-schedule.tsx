import { Plus, Trash2 } from "lucide-react"

import type {
  TimeSpan,
  WeeklySchedule as WeeklyScheduleType,
  WeeklyScheduleDay,
} from "@/models/schedule-constraint-block"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

type DayKey = keyof WeeklyScheduleType

type WeeklyScheduleProps = {
  schedule: WeeklyScheduleType
  onChange: (schedule: WeeklyScheduleType) => void
}

const days: {
  key: DayKey
  label: string
}[] = [
  {
    key: "monday",
    label: "Monday",
  },
  {
    key: "tuesday",
    label: "Tuesday",
  },
  {
    key: "wednesday",
    label: "Wednesday",
  },
  {
    key: "thursday",
    label: "Thursday",
  },
  {
    key: "friday",
    label: "Friday",
  },
  {
    key: "saturday",
    label: "Saturday",
  },
  {
    key: "sunday",
    label: "Sunday",
  },
]

function createTimeSpan(): TimeSpan {
  return {
    id: crypto.randomUUID(),
    startTime: "",
    endTime: "",
  }
}

export function WeeklySchedule({
  schedule,
  onChange,
}: WeeklyScheduleProps) {
  function updateDay(
    day: DayKey,
    updatedDay: WeeklyScheduleDay
  ) {
    onChange({
      ...schedule,
      [day]: updatedDay,
    })
  }

  function toggleDay(
    day: DayKey,
    enabled: boolean
  ) {
    const currentDay = schedule[day]

    updateDay(day, {
      ...currentDay,
      enabled,
      timeSpans:
        enabled &&
        currentDay.timeSpans.length === 0
          ? [createTimeSpan()]
          : currentDay.timeSpans,
    })
  }

  function addTimeSpan(day: DayKey) {
    const currentDay = schedule[day]

    updateDay(day, {
      ...currentDay,
      timeSpans: [
        ...currentDay.timeSpans,
        createTimeSpan(),
      ],
    })
  }

  function removeTimeSpan(
    day: DayKey,
    id: string
  ) {
    const currentDay = schedule[day]

    updateDay(day, {
      ...currentDay,
      timeSpans:
        currentDay.timeSpans.filter(
          (span) => span.id !== id
        ),
    })
  }

  function updateTimeSpan(
    day: DayKey,
    id: string,
    field: "startTime" | "endTime",
    value: string
  ) {
    const currentDay = schedule[day]

    updateDay(day, {
      ...currentDay,
      timeSpans:
        currentDay.timeSpans.map((span) =>
          span.id === id
            ? {
                ...span,
                [field]: value,
              }
            : span
        ),
    })
  }

  function hasInvalidTimeSpan(
    day: DayKey
  ) {
    return schedule[day].timeSpans.some(
      (span) =>
        !span.startTime ||
        !span.endTime ||
        span.startTime >= span.endTime
    )
  }

  function hasOverlappingTimeSpans(
    day: DayKey
  ) {
    const timeSpans =
      schedule[day].timeSpans

    return timeSpans.some(
      (span, index) =>
        timeSpans.some(
          (
            otherSpan,
            otherIndex
          ) =>
            index !== otherIndex &&
            span.startTime &&
            span.endTime &&
            otherSpan.startTime &&
            otherSpan.endTime &&
            span.startTime <
              otherSpan.endTime &&
            span.endTime >
              otherSpan.startTime
        )
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Weekly Schedule
        </CardTitle>

        <CardDescription>
          Choose when you are available to
          work. Each day can contain
          multiple time ranges.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {days.map(
          (day, index) => {
            const daySchedule =
              schedule[day.key]

            const invalid =
              daySchedule.enabled &&
              hasInvalidTimeSpan(
                day.key
              )

            const overlapping =
              daySchedule.enabled &&
              hasOverlappingTimeSpans(
                day.key
              )

            return (
              <div key={day.key}>
                {index > 0 && (
                  <Separator className="my-5" />
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Label className="text-base font-medium">
                        {day.label}
                      </Label>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {daySchedule.enabled
                          ? "Available"
                          : "Unavailable"}
                      </p>
                    </div>

                    <Switch
                      checked={
                        daySchedule.enabled
                      }
                      onCheckedChange={(
                        checked
                      ) =>
                        toggleDay(
                          day.key,
                          checked
                        )
                      }
                    />
                  </div>

                  {daySchedule.enabled && (
                    <div className="space-y-3">
                      {daySchedule.timeSpans.map(
                        (span) => (
                          <div
                            key={
                              span.id
                            }
                            className="flex items-end gap-3"
                          >
                            <div className="grid flex-1 gap-3 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label>
                                  Start
                                  Time
                                </Label>

                                <Input
                                  type="time"
                                  value={
                                    span.startTime
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateTimeSpan(
                                      day.key,
                                      span.id,
                                      "startTime",
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>
                                  End
                                  Time
                                </Label>

                                <Input
                                  type="time"
                                  value={
                                    span.endTime
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateTimeSpan(
                                      day.key,
                                      span.id,
                                      "endTime",
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeTimeSpan(
                                  day.key,
                                  span.id
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      )}

                      {invalid && (
                        <p className="text-sm text-destructive">
                          Each start
                          time must be
                          before its
                          end time.
                        </p>
                      )}

                      {!invalid &&
                        overlapping && (
                          <p className="text-sm text-destructive">
                            Time ranges
                            cannot
                            overlap.
                          </p>
                        )}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          addTimeSpan(
                            day.key
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                        Add Time
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )
          }
        )}
      </CardContent>
    </Card>
  )
}
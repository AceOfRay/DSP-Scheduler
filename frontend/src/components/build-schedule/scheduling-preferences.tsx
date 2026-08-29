import {
  CalendarRange,
  Clock3,
  Route,
  Sparkles,
} from "lucide-react"

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

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SchedulingPreferencesProps = {
  data: ScheduleConstraintBlockData

  onMinimizeDrivingChange: (
    enabled: boolean
  ) => void

  onGroupNearbyClientsChange: (
    enabled: boolean
  ) => void

  onAvoidLargeGapsChange: (
    enabled: boolean
  ) => void

  onBalanceWorkloadChange: (
    enabled: boolean
  ) => void

  onPreferMorningsChange: (
    enabled: boolean
  ) => void

  onPreferAfternoonsChange: (
    enabled: boolean
  ) => void

  onScheduleStyleChange: (
    style: "compact" | "balanced" | "relaxed"
  ) => void
}

export function SchedulingPreferences({
  data,
  onMinimizeDrivingChange,
  onGroupNearbyClientsChange,
  onAvoidLargeGapsChange,
  onBalanceWorkloadChange,
  onPreferMorningsChange,
  onPreferAfternoonsChange,
  onScheduleStyleChange,
}: SchedulingPreferencesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          4. Scheduling Preferences
        </CardTitle>

        <CardDescription>
          Tell the scheduler how you would prefer
          your client visits to be arranged when
          multiple schedules are possible.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Route className="mt-0.5 h-5 w-5 text-muted-foreground" />

            <div>
              <h3 className="font-medium">
                Travel Preferences
              </h3>

              <p className="text-sm text-muted-foreground">
                Reduce unnecessary travel between
                client visits.
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-8">
            <div className="flex items-start gap-3">
              <Checkbox
                id="minimize-driving"
                checked={data.minimizeDriving}
                onCheckedChange={(checked) =>
                  onMinimizeDrivingChange(
                    checked === true
                  )
                }
              />

              <div className="space-y-1">
                <Label
                  htmlFor="minimize-driving"
                  className="cursor-pointer"
                >
                  Minimize driving
                </Label>

                <p className="text-sm text-muted-foreground">
                  Prefer schedules that reduce total
                  travel time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="group-nearby-clients"
                checked={
                  data.groupNearbyClients
                }
                onCheckedChange={(checked) =>
                  onGroupNearbyClientsChange(
                    checked === true
                  )
                }
              />

              <div className="space-y-1">
                <Label
                  htmlFor="group-nearby-clients"
                  className="cursor-pointer"
                >
                  Group nearby clients together
                </Label>

                <p className="text-sm text-muted-foreground">
                  Prefer visiting clients in similar
                  areas on the same day.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="mb-4 flex items-start gap-3">
            <CalendarRange className="mt-0.5 h-5 w-5 text-muted-foreground" />

            <div>
              <h3 className="font-medium">
                Daily Schedule
              </h3>

              <p className="text-sm text-muted-foreground">
                Control how work is distributed
                throughout the week.
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-8">
            <div className="flex items-start gap-3">
              <Checkbox
                id="avoid-large-gaps"
                checked={data.avoidLargeGaps}
                onCheckedChange={(checked) =>
                  onAvoidLargeGapsChange(
                    checked === true
                  )
                }
              />

              <div className="space-y-1">
                <Label
                  htmlFor="avoid-large-gaps"
                  className="cursor-pointer"
                >
                  Avoid large gaps between visits
                </Label>

                <p className="text-sm text-muted-foreground">
                  Prefer compact workdays instead
                  of long periods of unused time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="balance-workload"
                checked={data.balanceWorkload}
                onCheckedChange={(checked) =>
                  onBalanceWorkloadChange(
                    checked === true
                  )
                }
              />

              <div className="space-y-1">
                <Label
                  htmlFor="balance-workload"
                  className="cursor-pointer"
                >
                  Balance workload across days
                </Label>

                <p className="text-sm text-muted-foreground">
                  Avoid heavily loading one day when
                  visits could be spread more evenly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="mb-4 flex items-start gap-3">
            <Clock3 className="mt-0.5 h-5 w-5 text-muted-foreground" />

            <div>
              <h3 className="font-medium">
                Time of Day
              </h3>

              <p className="text-sm text-muted-foreground">
                Optionally favor certain parts of
                the day.
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-8">
            <div className="flex items-start gap-3">
              <Checkbox
                id="prefer-mornings"
                checked={data.preferMornings}
                onCheckedChange={(checked) =>
                  onPreferMorningsChange(
                    checked === true
                  )
                }
              />

              <div className="space-y-1">
                <Label
                  htmlFor="prefer-mornings"
                  className="cursor-pointer"
                >
                  Prefer mornings
                </Label>

                <p className="text-sm text-muted-foreground">
                  Schedule client visits earlier in
                  the day when possible.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="prefer-afternoons"
                checked={data.preferAfternoons}
                onCheckedChange={(checked) =>
                  onPreferAfternoonsChange(
                    checked === true
                  )
                }
              />

              <div className="space-y-1">
                <Label
                  htmlFor="prefer-afternoons"
                  className="cursor-pointer"
                >
                  Prefer afternoons
                </Label>

                <p className="text-sm text-muted-foreground">
                  Schedule client visits later in
                  the day when possible.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="mb-4 flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 text-muted-foreground" />

            <div>
              <h3 className="font-medium">
                Schedule Style
              </h3>

              <p className="text-sm text-muted-foreground">
                Choose the overall style you want
                the scheduler to favor.
              </p>
            </div>
          </div>

          <div className="max-w-sm space-y-2">
            <Label>
              Preferred Schedule Style
            </Label>

            <Select
              value={data.scheduleStyle}
              onValueChange={(value) =>
                onScheduleStyleChange(
                  value as
                    | "compact"
                    | "balanced"
                    | "relaxed"
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="compact">
                  Compact
                </SelectItem>

                <SelectItem value="balanced">
                  Balanced
                </SelectItem>

                <SelectItem value="relaxed">
                  More breathing room
                </SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground">
              Compact schedules reduce downtime,
              while relaxed schedules leave more
              space between commitments.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
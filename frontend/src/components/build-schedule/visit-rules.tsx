import * as React from "react"

import { Clock3, Route } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const bufferOptions = [
    {
        label: "No buffer",
        value: "0",
    },
    {
        label: "15 minutes",
        value: "15",
    },
    {
        label: "30 minutes",
        value: "30",
    },
    {
        label: "45 minutes",
        value: "45",
    },
    {
        label: "1 hour",
        value: "60",
    },
]

export function VisitRules() {
    const [travelBuffer, setTravelBuffer] =
        React.useState("30")

    const [documentationBuffer, setDocumentationBuffer] =
        React.useState("15")

    const [allowBackToBack, setAllowBackToBack] =
        React.useState(false)

    const [allowSameClientSameDay, setAllowSameClientSameDay] =
        React.useState(false)

    const [allowSplitVisits, setAllowSplitVisits] =
        React.useState(false)

    const [maxVisitsPerDay, setMaxVisitsPerDay] =
        React.useState("")

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    6. Visit Rules & Travel Buffer
                </CardTitle>

                <CardDescription>
                    Set general rules for how client visits should be arranged
                    throughout the schedule.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <Route className="mt-0.5 h-5 w-5 text-muted-foreground" />

                        <div>
                            <h3 className="font-medium">
                                Travel Buffer
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Leave time between client visits for travel.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-sm space-y-2">
                        <Label>
                            Default Travel Time
                        </Label>

                        <Select
                            value={travelBuffer}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {bufferOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <div className="mb-4 flex items-start gap-3">
                        <Clock3 className="mt-0.5 h-5 w-5 text-muted-foreground" />

                        <div>
                            <h3 className="font-medium">
                                Visit Spacing
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Control how tightly client visits can be scheduled.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="allow-back-to-back"
                                checked={allowBackToBack}
                                onCheckedChange={(checked) =>
                                    setAllowBackToBack(checked === true)
                                }
                            />

                            <div className="space-y-1">
                                <Label
                                    htmlFor="allow-back-to-back"
                                    className="cursor-pointer"
                                >
                                    Allow back-to-back visits
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    Client visits may be scheduled immediately next to
                                    each other if travel time allows.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="same-client-same-day"
                                checked={allowSameClientSameDay}
                                onCheckedChange={(checked) =>
                                    setAllowSameClientSameDay(
                                        checked === true
                                    )
                                }
                            />

                            <div className="space-y-1">
                                <Label
                                    htmlFor="same-client-same-day"
                                    className="cursor-pointer"
                                >
                                    Allow multiple visits with the same client in one day
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    The scheduler may schedule more than one visit with the
                                    same client on the same date.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="split-visits"
                                checked={allowSplitVisits}
                                onCheckedChange={(checked) =>
                                    setAllowSplitVisits(checked === true)
                                }
                            />

                            <div className="space-y-1">
                                <Label
                                    htmlFor="split-visits"
                                    className="cursor-pointer"
                                >
                                    Allow visits to be split
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    A required visit may be divided into smaller blocks
                                    when necessary.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="font-medium">
                        Additional Time
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Reserve time around client visits for administrative work.
                    </p>

                    <div className="mt-4 max-w-sm space-y-2">
                        <Label>
                            Documentation Buffer
                        </Label>

                        <Select
                            value={documentationBuffer}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {bufferOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="font-medium">
                        Daily Visit Limit
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Optionally limit how many client visits can be scheduled
                        in one day.
                    </p>

                    <div className="mt-4 max-w-sm space-y-2">
                        <Label htmlFor="max-visits-per-day">
                            Maximum Visits Per Day
                        </Label>

                        <Input
                            id="max-visits-per-day"
                            type="number"
                            min={1}
                            placeholder="No limit"
                            value={maxVisitsPerDay}
                            onChange={(event) =>
                                setMaxVisitsPerDay(event.target.value)
                            }
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
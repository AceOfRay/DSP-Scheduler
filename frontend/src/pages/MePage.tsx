import { useEffect, useState } from "react"

import { Loader2, Save } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

import { PersonalAppointments } from "@/components/build-schedule/personal-appointments"

import { WeeklySchedule } from "@/components/build-schedule/weekly-schedule"

import type {
  PersonalAppointment,
  WeeklySchedule as WeeklyScheduleType,
} from "@/models/schedule-constraint-block"

import {
  getSchedulingPreferences,
  saveSchedulingPreferences,
} from "@/api/me"

function createDefaultWeeklySchedule(): WeeklyScheduleType {
  const createWorkDay = () => ({
    enabled: true,
    timeSpans: [
      {
        id: crypto.randomUUID(),
        startTime: "08:00",
        endTime: "17:00",
      },
    ],
  })

  return {
    monday: createWorkDay(),
    tuesday: createWorkDay(),
    wednesday: createWorkDay(),
    thursday: createWorkDay(),
    friday: createWorkDay(),

    saturday: {
      enabled: false,
      timeSpans: [],
    },

    sunday: {
      enabled: false,
      timeSpans: [],
    },
  }
}

export default function MePage() {
  const [
    personalAppointments,
    setPersonalAppointments,
  ] = useState<PersonalAppointment[]>([])

  const [
    weeklySchedule,
    setWeeklySchedule,
  ] = useState<WeeklyScheduleType>(
    createDefaultWeeklySchedule
  )

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSaving, setIsSaving] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const [savedMessage, setSavedMessage] =
    useState<string | null>(null)

  useEffect(() => {
    async function loadPreferences() {
      try {
        setIsLoading(true)
        setError(null)

        const preferences =
          await getSchedulingPreferences()

        if (preferences) {
          setWeeklySchedule(
            preferences.weeklySchedule
          )

          setPersonalAppointments(
            preferences.personalAppointments
          )
        }
      } catch (error) {
        console.error(error)

        setError(
          "Unable to load your scheduling preferences."
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPreferences()
  }, [])

  function addAppointment(
    appointment: PersonalAppointment
  ) {
    setPersonalAppointments((current) => [
      ...current,
      appointment,
    ])

    setSavedMessage(null)
  }

  function removeAppointment(id: string) {
    setPersonalAppointments((current) =>
      current.filter(
        (appointment) =>
          appointment.id !== id
      )
    )

    setSavedMessage(null)
  }

  function updateWeeklySchedule(
    schedule: WeeklyScheduleType
  ) {
    setWeeklySchedule(schedule)
    setSavedMessage(null)
  }

  async function handleSave() {
    try {
      setIsSaving(true)
      setError(null)
      setSavedMessage(null)

      await saveSchedulingPreferences({
        weeklySchedule,
        personalAppointments,
      })

      const refreshedPreferences =
        await getSchedulingPreferences()

      if (!refreshedPreferences) {
        throw new Error(
          "Preferences were saved but could not be reloaded."
        )
      }

      setWeeklySchedule(
        refreshedPreferences.weeklySchedule
      )

      setPersonalAppointments(
        refreshedPreferences.personalAppointments
      )

      setSavedMessage(
        "Scheduling preferences saved."
      )
    } catch (error) {
      console.error(error)

      setError(
        "Unable to save your scheduling preferences."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2"
          />

          <h1 className="font-semibold">
            Me
          </h1>
        </header>

        <main className="flex flex-1 flex-col gap-8 p-4 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Me
              </h2>

              <p className="text-muted-foreground">
                Manage your availability and personal
                scheduling information.
              </p>
            </div>

            <Button
              onClick={handleSave}
              disabled={isLoading || isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}

              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>

          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {savedMessage && (
            <div className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
              {savedMessage}
            </div>
          )}

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />

                Loading scheduling preferences...
              </div>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
              <WeeklySchedule
                schedule={weeklySchedule}
                onChange={updateWeeklySchedule}
              />

              <PersonalAppointments
                appointments={
                  personalAppointments
                }
                onAddAppointment={
                  addAppointment
                }
                onRemoveAppointment={
                  removeAppointment
                }
              />
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
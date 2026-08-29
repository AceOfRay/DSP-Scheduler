import type {
  PersonalAppointment,
  WeeklySchedule,
} from "@/models/schedule-constraint-block"

export type UserSchedulingPreferences = {
  weeklySchedule: WeeklySchedule
  personalAppointments: PersonalAppointment[]
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:8000"

export async function getSchedulingPreferences():
  Promise<UserSchedulingPreferences | null> {
  const response = await fetch(
    `${API_BASE_URL}/api/me/schedule`
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      "Failed to load scheduling preferences."
    )
  }

  return response.json()
}

export async function saveSchedulingPreferences(
  preferences: UserSchedulingPreferences
): Promise<UserSchedulingPreferences> {
  const response = await fetch(
    `${API_BASE_URL}/api/me/schedule`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    }
  )

  if (!response.ok) {
    throw new Error(
      "Failed to save scheduling preferences."
    )
  }

  return response.json()
}
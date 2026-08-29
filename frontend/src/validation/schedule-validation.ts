import type {
  ScheduleConstraintBlockData,
} from "@/models/schedule-constraint-block"

export type ValidationError = {
  field: string
  message: string
}

export type ValidationResult = {
  isValid: boolean
  errors: ValidationError[]
}

export function validateBasicScheduleInput(
  data: ScheduleConstraintBlockData
): ValidationResult {
  const errors: ValidationError[] = []

  // Required scheduling range
  if (!data.scheduleStartDate) {
    errors.push({
      field: "scheduleStartDate",
      message: "A schedule start date is required.",
    })
  }

  if (!data.scheduleEndDate) {
    errors.push({
      field: "scheduleEndDate",
      message: "A schedule end date is required.",
    })
  }

  // Start date cannot be in the past
  if (data.scheduleStartDate) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const scheduleStart = new Date(
      `${data.scheduleStartDate}T00:00:00`
    )

    if (scheduleStart < today) {
      errors.push({
        field: "scheduleStartDate",
        message: "The schedule cannot start in the past.",
      })
    }
  }

  // Schedule start time must be before end time
  if (
    data.scheduleStartTime &&
    data.scheduleEndTime &&
    data.scheduleStartTime >= data.scheduleEndTime
  ) {
    errors.push({
      field: "scheduleStartTime",
      message:
        "Schedule start time must be before the end time.",
    })
  }

  // At least one client
  if (data.selectedClientIds.length === 0) {
    errors.push({
      field: "selectedClientIds",
      message: "At least one client must be selected.",
    })
  }

  // Buffers
  if (data.travelBuffer < 0) {
    errors.push({
      field: "travelBuffer",
      message: "Travel buffer cannot be negative.",
    })
  }

  if (data.documentationBuffer < 0) {
    errors.push({
      field: "documentationBuffer",
      message:
        "Documentation buffer cannot be negative.",
    })
  }

  // Optional max
  if (
    data.maxVisitsPerDay !== null &&
    data.maxVisitsPerDay <= 0
  ) {
    errors.push({
      field: "maxVisitsPerDay",
      message:
        "Max visits per day must be greater than zero.",
    })
  }

  // Personal appointments
  for (const appointment of data.personalAppointments) {
    const appointmentDate = new Date(
      `${appointment.date}T00:00:00`
    )

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Appointment cannot be in the past
    if (appointmentDate < today) {
      errors.push({
        field: `personalAppointment.${appointment.id}`,
        message: `${appointment.title}: appointment date cannot be in the past.`,
      })
    }

    // Validate each time span
    for (const timeSpan of appointment.timeSpans) {
      if (timeSpan.startTime >= timeSpan.endTime) {
        errors.push({
          field: `personalAppointment.${appointment.id}.timeSpan.${timeSpan.id}`,
          message: `${appointment.title}: start time must be before end time.`,
        })
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
export type TimeSpan = {
  id: string
  startTime: string
  endTime: string
}

export type PersonalAppointment = {
  id: string
  title: string
  date: string
  timeSpans: TimeSpan[]
  location?: string
}

export type WeeklyScheduleDay = {
  enabled: boolean
  timeSpans: TimeSpan[]
}

export type WeeklySchedule = {
  monday: WeeklyScheduleDay
  tuesday: WeeklyScheduleDay
  wednesday: WeeklyScheduleDay
  thursday: WeeklyScheduleDay
  friday: WeeklyScheduleDay
  saturday: WeeklyScheduleDay
  sunday: WeeklyScheduleDay
}


export type ScheduleConstraintBlockData = {
  scheduleStartDate: string | null
  scheduleEndDate: string | null
  scheduleStartTime: string
  scheduleEndTime: string

  personalAppointments: PersonalAppointment[]

  selectedClientIds: number[]

  travelBuffer: number
  documentationBuffer: number

  allowBackToBack: boolean
  allowSameClientSameDay: boolean
  allowSplitVisits: boolean

  maxVisitsPerDay: number | null

  minimizeDriving: boolean
  groupNearbyClients: boolean
  avoidLargeGaps: boolean
  balanceWorkload: boolean

  preferMornings: boolean
  preferAfternoons: boolean

  scheduleStyle:
  | "compact"
  | "balanced"
  | "relaxed"

  weeklySchedule: WeeklySchedule

}

export class ScheduleConstraintBlock {
  private data: ScheduleConstraintBlockData

  constructor(
    data?: Partial<ScheduleConstraintBlockData>
  ) {
    const createWorkDay = (): WeeklyScheduleDay => ({
      enabled: true,
      timeSpans: [
        {
          id: crypto.randomUUID(),
          startTime: "08:00",
          endTime: "17:00",
        },
      ],
    })

    this.data = {
      scheduleStartDate: null,
      scheduleEndDate: null,
      scheduleStartTime: "08:00",
      scheduleEndTime: "17:00",

      weeklySchedule: {
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
      },

      personalAppointments: [],
      selectedClientIds: [],

      travelBuffer: 30,
      documentationBuffer: 15,

      allowBackToBack: false,
      allowSameClientSameDay: false,
      allowSplitVisits: false,

      maxVisitsPerDay: null,

      minimizeDriving: true,
      groupNearbyClients: true,
      avoidLargeGaps: true,
      balanceWorkload: true,

      preferMornings: false,
      preferAfternoons: false,

      scheduleStyle: "balanced",

      ...data,
    }
  }

  getData(): ScheduleConstraintBlockData {
    return {
      ...this.data,

      weeklySchedule: {
        monday: {
          ...this.data.weeklySchedule.monday,
          timeSpans: [
            ...this.data.weeklySchedule.monday.timeSpans,
          ],
        },
        tuesday: {
          ...this.data.weeklySchedule.tuesday,
          timeSpans: [
            ...this.data.weeklySchedule.tuesday.timeSpans,
          ],
        },
        wednesday: {
          ...this.data.weeklySchedule.wednesday,
          timeSpans: [
            ...this.data.weeklySchedule.wednesday.timeSpans,
          ],
        },
        thursday: {
          ...this.data.weeklySchedule.thursday,
          timeSpans: [
            ...this.data.weeklySchedule.thursday.timeSpans,
          ],
        },
        friday: {
          ...this.data.weeklySchedule.friday,
          timeSpans: [
            ...this.data.weeklySchedule.friday.timeSpans,
          ],
        },
        saturday: {
          ...this.data.weeklySchedule.saturday,
          timeSpans: [
            ...this.data.weeklySchedule.saturday.timeSpans,
          ],
        },
        sunday: {
          ...this.data.weeklySchedule.sunday,
          timeSpans: [
            ...this.data.weeklySchedule.sunday.timeSpans,
          ],
        },
      },

      personalAppointments:
        this.data.personalAppointments.map(
          (appointment) => ({
            ...appointment,
            timeSpans: [
              ...appointment.timeSpans,
            ],
          })
        ),

      selectedClientIds: [
        ...this.data.selectedClientIds,
      ],
    }
  }

  setWeeklySchedule(
    weeklySchedule: WeeklySchedule
  ) {
    this.data = {
      ...this.data,
      weeklySchedule,
    }

    return this.getData()
  }

  // Scheduling Range

  setScheduleDateRange(
    startDate: string | null,
    endDate: string | null
  ) {
    this.data = {
      ...this.data,
      scheduleStartDate: startDate,
      scheduleEndDate: endDate,
    }

    return this.getData()
  }

  setScheduleStartTime(startTime: string) {
    this.data = {
      ...this.data,
      scheduleStartTime: startTime,
    }

    return this.getData()
  }

  setScheduleEndTime(endTime: string) {
    this.data = {
      ...this.data,
      scheduleEndTime: endTime,
    }

    return this.getData()
  }

  // Personal Appointments

  addPersonalAppointment(
    appointment: PersonalAppointment
  ) {
    this.data = {
      ...this.data,

      personalAppointments: [
        ...this.data.personalAppointments,
        appointment,
      ],
    }

    return this.getData()
  }

  removePersonalAppointment(id: string) {
    this.data = {
      ...this.data,

      personalAppointments:
        this.data.personalAppointments.filter(
          (appointment) =>
            appointment.id !== id
        ),
    }

    return this.getData()
  }

  // Clients

  addClient(clientId: number) {
    if (
      this.data.selectedClientIds.includes(
        clientId
      )
    ) {
      return this.getData()
    }

    this.data = {
      ...this.data,

      selectedClientIds: [
        ...this.data.selectedClientIds,
        clientId,
      ],
    }

    return this.getData()
  }

  removeClient(clientId: number) {
    this.data = {
      ...this.data,

      selectedClientIds:
        this.data.selectedClientIds.filter(
          (id) => id !== clientId
        ),
    }

    return this.getData()
  }

  setSelectedClients(clientIds: number[]) {
    this.data = {
      ...this.data,
      selectedClientIds: [...clientIds],
    }

    return this.getData()
  }

  // Visit Rules

  setTravelBuffer(minutes: number) {
    this.data = {
      ...this.data,
      travelBuffer: minutes,
    }

    return this.getData()
  }

  setDocumentationBuffer(minutes: number) {
    this.data = {
      ...this.data,
      documentationBuffer: minutes,
    }

    return this.getData()
  }

  setAllowBackToBack(allow: boolean) {
    this.data = {
      ...this.data,
      allowBackToBack: allow,
    }

    return this.getData()
  }

  setAllowSameClientSameDay(
    allow: boolean
  ) {
    this.data = {
      ...this.data,
      allowSameClientSameDay: allow,
    }

    return this.getData()
  }

  setAllowSplitVisits(allow: boolean) {
    this.data = {
      ...this.data,
      allowSplitVisits: allow,
    }

    return this.getData()
  }

  setMaxVisitsPerDay(
    maxVisits: number | null
  ) {
    this.data = {
      ...this.data,
      maxVisitsPerDay: maxVisits,
    }

    return this.getData()
  }

  // Scheduling Preferences

  setMinimizeDriving(enabled: boolean) {
    this.data = {
      ...this.data,
      minimizeDriving: enabled,
    }

    return this.getData()
  }

  setGroupNearbyClients(enabled: boolean) {
    this.data = {
      ...this.data,
      groupNearbyClients: enabled,
    }

    return this.getData()
  }

  setAvoidLargeGaps(enabled: boolean) {
    this.data = {
      ...this.data,
      avoidLargeGaps: enabled,
    }

    return this.getData()
  }

  setBalanceWorkload(enabled: boolean) {
    this.data = {
      ...this.data,
      balanceWorkload: enabled,
    }

    return this.getData()
  }

  setPreferMornings(enabled: boolean) {
    this.data = {
      ...this.data,

      preferMornings: enabled,

      preferAfternoons: enabled
        ? false
        : this.data.preferAfternoons,
    }

    return this.getData()
  }

  setPreferAfternoons(enabled: boolean) {
    this.data = {
      ...this.data,

      preferAfternoons: enabled,

      preferMornings: enabled
        ? false
        : this.data.preferMornings,
    }

    return this.getData()
  }

  setScheduleStyle(
    style:
      | "compact"
      | "balanced"
      | "relaxed"
  ) {
    this.data = {
      ...this.data,
      scheduleStyle: style,
    }

    return this.getData()
  }

  // Review

  getSelectedClientCount() {
    return this.data.selectedClientIds.length
  }

  getPersonalAppointmentCount() {
    return this.data.personalAppointments.length
  }

  getReviewSummary() {
    return {
      scheduleStartDate:
        this.data.scheduleStartDate,

      scheduleEndDate:
        this.data.scheduleEndDate,

      selectedClients:
        this.getSelectedClientCount(),

      personalAppointments:
        this.getPersonalAppointmentCount(),

      travelBuffer:
        this.data.travelBuffer,

      documentationBuffer:
        this.data.documentationBuffer,
    }
  }

  getWarnings() {
    const warnings: string[] = []

    if (
      !this.data.scheduleStartDate ||
      !this.data.scheduleEndDate
    ) {
      warnings.push(
        "A scheduling date range has not been selected."
      )
    }

    if (
      this.data.selectedClientIds.length === 0
    ) {
      warnings.push(
        "No clients have been selected."
      )
    }

    return warnings
  }

  isReadyToBuild() {
    return this.getWarnings().length === 0
  }



  setPersonalAppointments(
    personalAppointments: PersonalAppointment[]
  ) {
    this.data = {
      ...this.data,
      personalAppointments,
    }

    return this.getData()
  }
}
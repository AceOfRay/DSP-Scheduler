// components/auth/AuthLayout.tsx

import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Branding side */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground">
        <div className="text-xl font-bold">
          DSP Scheduler
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            Smarter scheduling.
          </h1>

          <p className="mt-4 max-w-md text-primary-foreground/80">
            Build, manage, and optimize your workforce schedules from one place.
          </p>
        </div>

        <div className="text-sm text-primary-foreground/60">
          DSP Scheduler
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
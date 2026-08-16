// pages/ClientsPage.tsx

import { AppSidebar } from "@/components/app-sidebar"
import { useNavigate } from "react-router"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientCard } from "@/components/client-card"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const clients = [
  {
    id: 1,
    name: "John Smith",
    location: "Seattle, WA",
    serviceHours: "40 hours / month",
  },
  {
    id: 2,
    name: "Maria Garcia",
    location: "Bellevue, WA",
    serviceHours: "32 hours / month",
  },
  {
    id: 3,
    name: "David Johnson",
    location: "Renton, WA",
    serviceHours: "24 hours / month",
  },
  {
    id: 4,
    name: "Sarah Williams",
    location: "Kent, WA",
    serviceHours: "36 hours / month",
  },
]
export default function ClientsPage() {
  const navigate = useNavigate()

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
            Clients
          </h1>

          <Button
            className="ml-auto"
            onClick={() => navigate("/add-client")}
          >
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Clients
            </h2>

            <p className="text-muted-foreground">
              View and manage the clients receiving scheduled services.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                name={client.name}
                location={client.location}
                serviceHours={client.serviceHours}
              />
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
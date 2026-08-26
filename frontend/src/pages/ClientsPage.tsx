import { useState } from "react"

import {
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { ClientCard } from "@/components/client-card"

import {
  ClientDialog,
  type Client,
} from "@/components/client-dialog"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const initialClients: Client[] = [
  {
    id: 1,
    name: "John Smith",
    location: "Seattle, WA",
    serviceHours: "40 hours / month",
    active: true,
  },
  {
    id: 2,
    name: "Maria Garcia",
    location: "Bellevue, WA",
    serviceHours: "32 hours / month",
    active: true,
  },
  {
    id: 3,
    name: "David Johnson",
    location: "Renton, WA",
    serviceHours: "24 hours / month",
    active: true,
  },
  {
    id: 4,
    name: "Sarah Williams",
    location: "Kent, WA",
    serviceHours: "36 hours / month",
    active: false,
  },
]

export default function ClientsPage() {
  const [clients, setClients] =
    useState<Client[]>(initialClients)

  const [dialogOpen, setDialogOpen] =
    useState(false)

  const [selectedClient, setSelectedClient] =
    useState<Client | null>(null)

  const [inactiveOpen, setInactiveOpen] =
    useState(false)

  const activeClients = clients.filter(
    (client) => client.active
  )

  const inactiveClients = clients.filter(
    (client) => !client.active
  )

  function handleAddClient() {
    setSelectedClient(null)
    setDialogOpen(true)
  }

  function handleEditClient(client: Client) {
    setSelectedClient(client)
    setDialogOpen(true)
  }

  function handleSaveClient(
    clientData: Omit<Client, "id">
  ) {
    if (selectedClient) {
      setClients((currentClients) =>
        currentClients.map((client) =>
          client.id === selectedClient.id
            ? {
                ...client,
                ...clientData,
              }
            : client
        )
      )

      return
    }

    const newClient: Client = {
      id: Date.now(),
      ...clientData,
    }

    setClients((currentClients) => [
      ...currentClients,
      newClient,
    ])
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
            Clients
          </h1>

          <Button
            className="ml-auto"
            onClick={handleAddClient}
          >
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </header>

        <main className="flex flex-1 flex-col gap-8 p-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Clients
            </h2>

            <p className="text-muted-foreground">
              View and manage the clients receiving
              scheduled services.
            </p>
          </div>

          {/* Active clients */}
          <section className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                Active Clients
              </h3>

              <p className="text-sm text-muted-foreground">
                {activeClients.length}{" "}
                {activeClients.length === 1
                  ? "active client"
                  : "active clients"}
              </p>
            </div>

            {activeClients.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {activeClients.map((client) => (
                  <ClientCard
                    key={client.id}
                    name={client.name}
                    location={client.location}
                    serviceHours={
                      client.serviceHours
                    }
                    active={client.active}
                    onEdit={() =>
                      handleEditClient(client)
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  There are currently no active
                  clients.
                </p>
              </div>
            )}
          </section>

          <Separator />

          {/* Inactive clients */}
          <section className="space-y-4">
            <Button
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start px-0 hover:bg-transparent"
              onClick={() =>
                setInactiveOpen((current) => !current)
              }
            >
              {inactiveOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}

              <div className="text-left">
                <div className="font-semibold">
                  Inactive Clients
                </div>

                <div className="text-sm font-normal text-muted-foreground">
                  {inactiveClients.length}{" "}
                  {inactiveClients.length === 1
                    ? "inactive client"
                    : "inactive clients"}
                </div>
              </div>
            </Button>

            {inactiveOpen && (
              <div>
                {inactiveClients.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {inactiveClients.map(
                      (client) => (
                        <ClientCard
                          key={client.id}
                          name={client.name}
                          location={
                            client.location
                          }
                          serviceHours={
                            client.serviceHours
                          }
                          active={
                            client.active
                          }
                          onEdit={() =>
                            handleEditClient(
                              client
                            )
                          }
                        />
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    There are currently no
                    inactive clients.
                  </p>
                )}
              </div>
            )}
          </section>
        </main>

        <ClientDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          client={selectedClient}
          onSave={handleSaveClient}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
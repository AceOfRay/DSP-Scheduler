import {
  useEffect,
  useState,
} from "react"

import {
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { ClientCard } from "@/components/client-card"

import {
  ClientModal,
  type Client,
} from "@/components/client-modal"

import {
  createClient,
  getClients,
  updateClient,
} from "@/api/clients"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export default function ClientsPage() {

  const [clients, setClients] = useState<Client[]>([])

  const [modalOpen, setModalOpen] =
    useState(false)

  const [selectedClient, setSelectedClient] =
    useState<Client | null>(null)

  const [inactiveOpen, setInactiveOpen] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const activeClients = clients.filter(
    (client) => client.active
  )

  const inactiveClients = clients.filter(
    (client) => !client.active
  )


  async function loadClients() {
    try {
      const clientData = await getClients()

      setClients(clientData)
    } catch (error) {
      console.error(
        "Failed to load clients:",
        error
      )
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    loadClients()
  }, [])


  function handleAddClient() {
    setSelectedClient(null)
    setModalOpen(true)
  }


  function handleEditClient(client: Client) {
    setSelectedClient(client)
    setModalOpen(true)
  }


  async function handleSaveClient(
    clientData: Omit<Client, "id">
  ) {
    try {
      if (selectedClient) {
        await updateClient(
          selectedClient.id,
          clientData
        )
      } else {
        await createClient(clientData)
      }

      // Backend remains the source of truth.
      // Do not manually modify the frontend list.
      await loadClients()

      setModalOpen(false)
      setSelectedClient(null)
    } catch (error) {
      console.error(
        "Failed to save client:",
        error
      )
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

          {loading ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Loading clients...
              </p>
            </div>
          ) : (
            <>
              {/* Active Clients */}

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
                    {activeClients.map(
                      (client) => (
                        <ClientCard
                          key={client.id}
                          client={client}
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
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      There are currently no active
                      clients.
                    </p>
                  </div>
                )}
              </section>

              <Separator />

              {/* Inactive Clients */}

              <section className="space-y-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto w-full justify-start px-0 hover:bg-transparent"
                  onClick={() =>
                    setInactiveOpen(
                      (current) => !current
                    )
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
                              client={client}
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
                        There are currently no inactive
                        clients.
                      </p>
                    )}
                  </div>
                )}
              </section>
            </>
          )}
        </main>

        <ClientModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          client={selectedClient}
          onSave={handleSaveClient}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
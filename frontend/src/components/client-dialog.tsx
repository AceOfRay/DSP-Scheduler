import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export interface Client {
  id: number
  name: string
  location: string
  serviceHours: string
  active: boolean
}

interface ClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: Client | null
  onSave: (client: Omit<Client, "id">) => void
}

export function ClientDialog({
  open,
  onOpenChange,
  client,
  onSave,
}: ClientDialogProps) {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [serviceHours, setServiceHours] = useState("")
  const [active, setActive] = useState(true)

  const isEditing = Boolean(client)

  useEffect(() => {
    if (!open) return

    if (client) {
      setName(client.name)
      setLocation(client.location)
      setServiceHours(client.serviceHours)
      setActive(client.active)
    } else {
      setName("")
      setLocation("")
      setServiceHours("")
      setActive(true)
    }
  }, [client, open])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSave({
      name: name.trim(),
      location: location.trim(),
      serviceHours: serviceHours.trim(),
      active,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Client" : "Add Client"}
            </DialogTitle>

            <DialogDescription>
              {isEditing
                ? "Update this client's information and status."
                : "Enter the information for the new client."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="grid gap-2">
              <Label htmlFor="client-name">
                Client name
              </Label>

              <Input
                id="client-name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="John Smith"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client-location">
                Location
              </Label>

              <Input
                id="client-location"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="Seattle, WA"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service-hours">
                Service hours
              </Label>

              <Input
                id="service-hours"
                value={serviceHours}
                onChange={(event) =>
                  setServiceHours(event.target.value)
                }
                placeholder="40 hours / month"
                required
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="client-active">
                  Active client
                </Label>

                <p className="text-sm text-muted-foreground">
                  Inactive clients are hidden from the main client list.
                </p>
              </div>

              <Switch
                id="client-active"
                checked={active}
                onCheckedChange={setActive}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
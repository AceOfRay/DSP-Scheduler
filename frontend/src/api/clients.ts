import type { Client } from "@/components/client-modal"

const API_BASE_URL = "http://localhost:8000"


export async function getClients(): Promise<Client[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/clients`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch clients")
  }

  return response.json()
}


export async function createClient(
  clientData: Omit<Client, "id">
) {
  const response = await fetch(
    `${API_BASE_URL}/api/clients`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to create client")
  }

  return response.json()
}


export async function updateClient(
  clientId: number,
  clientData: Omit<Client, "id">
) {
  const response = await fetch(
    `${API_BASE_URL}/api/clients/${clientId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to update client")
  }

  return response.json()
}
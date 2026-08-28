from copy import deepcopy

from starlette.responses import JSONResponse
from starlette.routing import Route

from backend.data.seed_clients import seed_clients


clients = deepcopy(seed_clients)


async def get_clients(request):
    return JSONResponse(clients)


async def update_client(request):
    client_id = int(request.path_params["client_id"])
    updated_data = await request.json()

    for index, client in enumerate(clients):
        if client["id"] == client_id:
            clients[index] = {
                "id": client_id,
                **updated_data,
            }

            return JSONResponse(
                {
                    "message": "Client updated successfully",
                    "client": clients[index],
                }
            )

    return JSONResponse(
        {
            "message": "Client not found",
        },
        status_code=404,
    )

async def create_client(request):
    client_data = await request.json()

    next_id = (
        max(
            (client["id"] for client in clients),
            default=0,
        )
        + 1
    )

    new_client = {
        "id": next_id,
        **client_data,
    }

    clients.append(new_client)

    return JSONResponse(
        {
            "message": "Client created successfully",
            "client": new_client,
        },
        status_code=201,
    )


client_routes = [
    Route(
        "/api/clients",
        endpoint=get_clients,
        methods=["GET"],
    ),

    Route(
        "/api/clients",
        endpoint=create_client,
        methods=["POST"],
    ),

    Route(
        "/api/clients/{client_id:int}",
        endpoint=update_client,
        methods=["POST"],
    ),
]
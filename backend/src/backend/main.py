from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from backend.routes.clients import client_routes


async def button_clicked(request):
    print("Frontend button was clicked!")

    return JSONResponse({
        "message": "Backend received the click!"
    })


routes = [
    Route(
        "/api/button-click",
        button_clicked,
        methods=["POST"],
    ),
    *client_routes,
]


middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
]


app = Starlette(
    routes=routes,
    middleware=middleware,
)
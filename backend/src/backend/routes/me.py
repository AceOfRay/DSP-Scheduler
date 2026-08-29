from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import Route

# Temporary in-memory source of truth
_user_schedule = None


async def get_me_schedule(request: Request):
    if _user_schedule is None:
        return JSONResponse(
            {"detail": "No scheduling preferences saved."},
            status_code=404,
        )

    return JSONResponse(_user_schedule)


async def put_me_schedule(request: Request):
    global _user_schedule

    data = await request.json()

    # Minimal shape validation for now
    if "weeklySchedule" not in data:
        return JSONResponse(
            {"detail": "weeklySchedule is required."},
            status_code=400,
        )

    if "personalAppointments" not in data:
        return JSONResponse(
            {"detail": "personalAppointments is required."},
            status_code=400,
        )

    _user_schedule = {
        "weeklySchedule": data["weeklySchedule"],
        "personalAppointments": data["personalAppointments"],
    }

    return JSONResponse(
        _user_schedule,
        status_code=200,
    )


routes = [
    Route(
        "/api/me/schedule",
        get_me_schedule,
        methods=["GET"],
    ),
    Route(
        "/api/me/schedule",
        put_me_schedule,
        methods=["PUT"],
    ),
]
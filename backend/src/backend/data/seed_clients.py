seed_clients = [
    {
        "id": 1,
        "name": "John Smith",
        "location": "Seattle, WA",
        "serviceHours": "40 hours / month",
        "active": True,
        "visitRequirements": {
            "visitsPerWeek": 3,
            "visitDurationMinutes": 60,
        },
        "availability": {
            "monday": {
                "enabled": True,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "tuesday": {
                "enabled": True,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "wednesday": {
                "enabled": True,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "thursday": {
                "enabled": True,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "friday": {
                "enabled": True,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "saturday": {
                "enabled": False,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "sunday": {
                "enabled": False,
                "startTime": "09:00",
                "endTime": "17:00",
            },
        },
        "appointments": [],
    },

    {
        "id": 2,
        "name": "Maria Garcia",
        "location": "Bellevue, WA",
        "serviceHours": "32 hours / month",
        "active": True,
        "visitRequirements": {
            "visitsPerWeek": 2,
            "visitDurationMinutes": 90,
        },
        "availability": {
            "monday": {
                "enabled": True,
                "startTime": "10:00",
                "endTime": "16:00",
            },
            "tuesday": {
                "enabled": False,
                "startTime": "10:00",
                "endTime": "16:00",
            },
            "wednesday": {
                "enabled": True,
                "startTime": "10:00",
                "endTime": "16:00",
            },
            "thursday": {
                "enabled": True,
                "startTime": "12:00",
                "endTime": "18:00",
            },
            "friday": {
                "enabled": False,
                "startTime": "10:00",
                "endTime": "16:00",
            },
            "saturday": {
                "enabled": False,
                "startTime": "10:00",
                "endTime": "16:00",
            },
            "sunday": {
                "enabled": False,
                "startTime": "10:00",
                "endTime": "16:00",
            },
        },
        "appointments": [],
    },

    {
        "id": 3,
        "name": "David Johnson",
        "location": "Renton, WA",
        "serviceHours": "24 hours / month",
        "active": True,
        "visitRequirements": {
            "visitsPerWeek": 4,
            "visitDurationMinutes": 45,
        },
        "availability": {
            "monday": {
                "enabled": True,
                "startTime": "08:00",
                "endTime": "12:00",
            },
            "tuesday": {
                "enabled": True,
                "startTime": "08:00",
                "endTime": "12:00",
            },
            "wednesday": {
                "enabled": False,
                "startTime": "08:00",
                "endTime": "12:00",
            },
            "thursday": {
                "enabled": True,
                "startTime": "13:00",
                "endTime": "17:00",
            },
            "friday": {
                "enabled": True,
                "startTime": "13:00",
                "endTime": "17:00",
            },
            "saturday": {
                "enabled": False,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "sunday": {
                "enabled": False,
                "startTime": "09:00",
                "endTime": "17:00",
            },
        },
        "appointments": [],
    },

    {
        "id": 4,
        "name": "Sarah Williams",
        "location": "Kent, WA",
        "serviceHours": "36 hours / month",
        "active": False,
        "visitRequirements": {
            "visitsPerWeek": 3,
            "visitDurationMinutes": 60,
        },
        "availability": {
            "monday": {
                "enabled": False,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "tuesday": {
                "enabled": True,
                "startTime": "11:00",
                "endTime": "15:00",
            },
            "wednesday": {
                "enabled": True,
                "startTime": "11:00",
                "endTime": "15:00",
            },
            "thursday": {
                "enabled": False,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "friday": {
                "enabled": True,
                "startTime": "09:00",
                "endTime": "13:00",
            },
            "saturday": {
                "enabled": False,
                "startTime": "09:00",
                "endTime": "17:00",
            },
            "sunday": {
                "enabled": False,
                "startTime": "09:00",
                "endTime": "17:00",
            },
        },
        "appointments": [],
    },
]
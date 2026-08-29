import {
  CalendarDays,
  CalendarPlus2,
  Database,
  LayoutDashboard,
  Pointer,
  Settings,
  UserRound,
  Users,
} from "lucide-react"



import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useLocation, useNavigate } from "react-router"

const navigation = [
  {
    title: "Dashboard",
    url: "/landing",
    icon: LayoutDashboard,
  },
  {
    title: "Past Schedules",
    url: "/past-schedules",
    icon: CalendarDays,
  },
    {
    title: "Build Schedule",
    url: "/build-schedule",
    icon: CalendarPlus2,
  },
      {
    title: "Clients",
    url: "/clients",
    icon: UserRound,
  },
        {
    title: "Usage",
    url: "/usage",
    icon: Pointer,
  },
          {
    title: "Data",
    url: "/data",
    icon: Database,
  },
          {
    title: "Me",
    url: "/me",
    icon: UserRound,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            DS
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">
              DSP Scheduler
            </span>

            <span className="text-xs text-muted-foreground">
              Scheduling
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Application
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    onClick={() => navigate(item.url)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-medium">
                RR
              </div>

              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  Your Name
                </span>

                <span className="text-xs text-muted-foreground">
                  Account
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
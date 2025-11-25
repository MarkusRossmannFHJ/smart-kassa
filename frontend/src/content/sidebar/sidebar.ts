import { Home, BarChart, Wallet, BookOpen, Settings,
  Car, Receipt, Users, UserSquare, Truck, CalendarClock,
  BadgePercent, Download, Info
 } from "lucide-react";

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const sidebarSections: SidebarSection[] = [
  {
    title: "Navigation",
    items: [
      {
        label: "Dashboard",
        path: "/",
        icon: Home,
      },
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart,
      },
      {
        label: "Finances",
        path: "/finances",
        icon: Wallet,
      },
      {
        label: "Docs",
        path: "/documentation",
        icon: BookOpen,
      },
      
    ],
  },

  {
    title: "Taxi Management",
    items: [
      {
        label: "Fahrten",
        path: "/rides",
        icon: Car,
      },
      {
        label: "Rechnungen",
        path: "/invoices",
        icon: Receipt,
      },
      {
        label: "Kunden",
        path: "/customers",
        icon: Users,
      },
      {
        label: "Fahrer",
        path: "/drivers",
        icon: UserSquare,
      },
      {
        label: "Fahrzeuge",
        path: "/vehicles",
        icon: Truck,
      },
    ],
  },

  {
    title: "Administration",
    items: [
      {
        label: "Dienstplan",
        path: "/shift-plan",
        icon: CalendarClock,
      },
      {
        label: "Tarife",
        path: "/pricing",
        icon: BadgePercent,
      },

      {
        label: "Transfer",
        path: "/transfer",
        icon: Download,
      },
    ],
  },

   {
    title: "Utils",
    items: [
      {
        label: "Help",
        path: "/help",
        icon: Info,
      },
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];


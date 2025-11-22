import { Link, Outlet } from "react-router-dom";
import { CircleUser } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

import { Bell } from 'lucide-react';
import SearchInput from "@/components/SearchInput";


/**
 * @returns the Root layout
 */
export default function RootLayout() {
  // to know which path is active for the underline in the footer
  const [path, setPath] = useState("home");

  const user = useSelector((state: RootState) => state.user);

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row w-full min-h-screen">

        {/* Content in Sidebar */}
        <AppSidebar />

        <div className="flex flex-col w-full">
          <header
            className="
        sticky h-16
        backdrop-blur-md bg-white/60 dark:bg-black/40
        border-b border-zinc-300 dark:border-zinc-800
        flex items-center justify-between
        px-4 z-50"
          >

            <SidebarTrigger className="md:hidden" />

            <SearchInput></SearchInput>

            {/* Account icon and Bell on the right side */}

            <div className="flex flex-row gap-2 items-center text-lg flex-shrink">

              <Bell className="hidden md:block md:w-6 md:h-6"></Bell>
              <CircleUser className="w-6 h-6 md:w-10 md:h-10"></CircleUser>

            </div>

          </header>

          {/* The RootLayout will automatically inject the current Page */}
          <main className="flex self-start pt-4 px-4">
            <Outlet />
          </main>



          <footer
            className="
    h-16 w-full
    backdrop-blur-md bg-white/60 dark:bg-black/40
    border-t border-zinc-300 dark:border-zinc-800
    px-4
    fixed bottom-0 left-0 md:hidden
  "
          >
            <nav className="grid grid-cols-3 h-full place-items-center text-sm font-medium">
              {["Statistiken", "Home", "Account"].map((element, index) => {
                const lower = element.charAt(0).toLowerCase() + element.slice(1);

                return (
                  <Link
                    key={index}
                    className={`
            hover:text-violet-500 relative px-2 py-1
            ${
                      // underline color
                      path === lower
                        ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-violet-500 after:transition-all after:duration-300"
                        : "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-transparent after:transition-all after:duration-300"
                      }
          `}
                    to={""} //"/" + lower
                    onClick={() => setPath(lower)}
                  >
                    {element}
                  </Link>
                );
              })}
            </nav>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}

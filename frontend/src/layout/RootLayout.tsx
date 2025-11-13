import { Link, Outlet } from "react-router-dom";
import { MobileMenu } from "../components/MobileMenu";
import { navContent } from "../content/header/navContent";
import { CircleUser } from "lucide-react";
import { useState } from "react";

/**
 * @returns the Root layout
 */
export default function RootLayout() {
  // to know which path is active for the underline in the footer
  const [path, setPath] = useState("home");

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className="
        fixed top-0 left-0 w-full h-16
        backdrop-blur-md bg-white/60 dark:bg-black/40
        border-b border-zinc-300 dark:border-zinc-800
        flex items-center justify-between
        px-4 z-50
    "
      >
        <MobileMenu></MobileMenu>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navContent.map((element, index) => (
            <Link
              key={index}
              className="hover:text-violet-500"
              to={element.path}
            >
              {element.label}
            </Link>
          ))}
        </nav>

        <h1 className="font-bold text-xl md:hidden">Guten Tag User!</h1>

        {/* Account icon on the right side */}
        <div className="flex items-center gap-3">
          <CircleUser></CircleUser>
        </div>
      </header>

      {/* The RootLayout will automatically inject the current Page */}
      <main className="flex-1 flex items-start py-20 px-4">
        <Outlet />
      </main>

      <footer
        className="
    h-16 w-full
    backdrop-blur-md bg-white/60 dark:bg-black/40
    border-t border-zinc-300 dark:border-zinc-800
    px-4
    fixed bottom-0 left-0
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
  );
}

import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-20 px-4">
        <Outlet />
      </main>

      <footer
        className="h-16 p-4 border-t border-zinc-300
        dark:border-zinc-800"
      >
        <nav className="grid grid-cols-3 h-full place-items-center text-sm font-medium">
          {["Statistiken", "Home", "Neu"].map((element, index) => (
            <Link
              key={index}
              className="hover:text-violet-500"
              to={"/" + element}
            >
              {element}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}

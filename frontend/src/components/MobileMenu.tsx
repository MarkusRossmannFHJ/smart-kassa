import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Menu } from "lucide-react";
import { navContent } from "../content/header/navContent";
import { Link } from "react-router";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6" />
      </SheetTrigger>

      <SheetContent side="left" className="px-6 pt-16">
        <nav className="flex flex-col gap-8 text-lg">
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
      </SheetContent>
    </Sheet>
  );
}

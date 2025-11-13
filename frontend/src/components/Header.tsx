import { MobileMenu } from './MobileMenu'
import { Link } from 'react-router';
import { CircleUser } from 'lucide-react';
import { navContent } from '../content/header/navContent';


const Header = () => {
    return (
    <header className="
        fixed top-0 left-0 w-full h-16
        backdrop-blur-md bg-white/60 dark:bg-black/40
        border-b border-zinc-300 dark:border-zinc-800
        flex items-center justify-between
        px-4 z-50
    ">

      <MobileMenu></MobileMenu>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        {navContent.map((element, index) => (
           <Link key={index} className="hover:text-violet-500"
            to={element.path}>{element.label}</Link>
        ))}
      </nav>

      <h1 className='font-bold text-xl md:hidden'>Guten Tag User!</h1>

      {/* Account icon on the right side */}
      <div className="flex items-center gap-3">
        <CircleUser></CircleUser>
      </div>
      
    </header>
  );
}

export default Header

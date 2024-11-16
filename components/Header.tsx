"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchNews from '@/components/SearchNews';

const Header = () => {
  const pathname = usePathname();

  const NavItems = () => (
    <>
      <li><Link href="/" className={pathname === '/' ? 'font-bold' : ''}>Inicio</Link></li>
      <li><Link href="/about" className={pathname === '/about' ? 'font-bold' : ''}>Acerca de</Link></li>
      <li><Link href="/contact" className={pathname === '/contact' ? 'font-bold' : ''}>Contacto</Link></li>
      <li><Link href="/admin" className={pathname === '/admin' ? 'font-bold' : ''}>Administración</Link></li>
    </>
  );

  return (
    <header className="border-b bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">Cecati</Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <NavItems />
            </ul>
          </nav>

          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="mt-6">
                  <ul className="space-y-4">
                    <NavItems />
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex-grow">
            <SearchNews />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
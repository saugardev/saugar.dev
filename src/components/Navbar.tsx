'use client'

import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Toggle } from "@/components/ui/toggle"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: 'Articles', href: '/' },
  { label: 'About me', href: '/about' },
];

export function Navbar() {

  const { setTheme } = useTheme();

  const initialTheme = typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  const [theme, setLocalTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setLocalTheme(newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const classNameObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setLocalTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }
      });
    });
    classNameObserver.observe(document.documentElement, { attributes: true });

    return () => classNameObserver.disconnect();
  }, []);

  return (
    <div className="w-full absolute flex items-center justify-end p-4">
      <NavigationMenu>
        <NavigationMenuList>
          {navigationItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} cursor-pointer dark:hover:text-primary dark:focus:text-primary`}>
                  <span className="text-lg">{item.label}</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Toggle className="flex items-center h-10 ml-1 p-4 rounded-md hover:bg-accent dark:hover:text-primary focus:bg-accent focus:text-primary focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" aria-label="Toggle color theme" onClick={toggleTheme}>
        <Moon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Sun className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Toggle>
    </div>
  )
}

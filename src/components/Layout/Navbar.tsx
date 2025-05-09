"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { AuthButton } from "@/components/ui/AuthButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-4 px-6 md:px-8 lg:px-12 bg-white dark:bg-primary shadow-sm sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center h-10">
            <img
              src="/img/logo-runsync-dark-horizontal.png"
              alt="RunSync Logo Light"
              className="h-8 md:h-10 block dark:hidden"
            />
            <img
              src="/img/logo-runsync-medium-horizontal.png"
              alt="RunSync Logo Dark"
              className="h-8 md:h-10 hidden dark:block"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link href="/plan" className="nav-link">
              Plan
            </Link>
            <Link href="/activities" className="nav-link">
              Activities
            </Link>
            <Link href="/settings" className="nav-link">
              Settings
            </Link>

            <AuthButton />

            <ThemeToggle />
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-primary shadow-md py-4">
          <div className="flex flex-col space-y-4 px-6">
            <Link
              href="/dashboard"
              className="nav-link block py-2"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/plan"
              className="nav-link block py-2"
              onClick={toggleMenu}
            >
              Plan
            </Link>
            <Link
              href="/activities"
              className="nav-link block py-2"
              onClick={toggleMenu}
            >
              Activities
            </Link>
            <Link
              href="/settings"
              className="nav-link block py-2"
              onClick={toggleMenu}
            >
              Settings
            </Link>

            <div className="pt-2 flex flex-col space-y-4">
              <AuthButton />

              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

"use client"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
const menuOptions = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "History",
    path: "/dashboard/history",
  },
  {
    id: 3,
    name: "MediVoice Pro",
    path: "/dashboard/billing",
  },
  {
    id: 4,
    name: "Dashboard",
    path: "/dashboard",
  },
  
];

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-between shadow px-4 md:px-20 lg:px-40 py-4 bg-white w-full">
      {/* Logo on left */}
      <Link href="/">
        <Image src="/logo1.png" alt="logo" width={140} height={600} />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-12 items-center">
        {menuOptions.map((option) => (
          <Link key={option.id} href={option.path}>
            <h2 className="hover:font-bold cursor-pointer">{option.name}</h2>
          </Link>
        ))}
      </div>

      {/* Right Side (Menu + Avatar) */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* User Avatar */}
        <UserButton />
      </div>

      {/* Mobile Dropdown Menu below icon */}
      {mobileMenuOpen && (
        <div className="absolute right-4 top-[100%] mt-2 bg-white shadow-md z-10 md:hidden flex flex-col gap-4 px-6 py-4 rounded-md w-52">
          {menuOptions.map((option) => (
            <Link
              key={option.id}
              href={option.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              <h2 className="hover:font-bold cursor-pointer">{option.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppHeader;

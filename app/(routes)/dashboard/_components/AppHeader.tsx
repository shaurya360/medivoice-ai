import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  
];

const AppHeader = () => {
  return (
    <div className="flex items-center justify-between shadow px-10 md:px-20 lg:px-40 ">
      <Image src={"/logo1.png"} alt="logo" width={140} height={600} />
      <div className="hidden md:flex gap-12 items-center">
        {menuOptions.map((option, index) => (
          <Link key={index} href={option.path}>
            <h2 className="hover:font-bold cursor-pointer">{option.name}</h2>
          </Link>
        ))}
      </div>
      <UserButton />
    </div>
  );
};

export default AppHeader;

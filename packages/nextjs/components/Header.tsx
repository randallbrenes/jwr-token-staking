"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  BoltIcon,
  BugAntIcon,
  BuildingLibraryIcon,
  CircleStackIcon,
  HomeIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  submenu?: HeaderMenuLink[];
};
export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home/Staking",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "Owner Functions",
    href: "/owner",
    icon: <KeyIcon className="h-4 w-4" />,
  },
  {
    label: "Events",
    href: "",
    icon: <BoltIcon className="h-4 w-4" />,
    submenu: [
      {
        label: "Token",
        href: "/events/token",
        icon: <CircleStackIcon className="h-4 w-4" />,
      },
      {
        label: "Staking",
        href: "/events/staking",
        icon: <BuildingLibraryIcon className="h-4 w-4" />,
      },
    ],
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

const menuItem = (item: HeaderMenuLink, pathname: string) => {
  const { label, href, icon } = item;
  const isActive = pathname === href;
  return (
    <li key={href}>
      <Link
        href={href}
        passHref
        className={`${
          isActive ? "bg-secondary shadow-md" : ""
        } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

const submenuItem = (item: HeaderMenuLink, pathname: string) => {
  const { label, submenu, icon } = item;
  return (
    <li key={label}>
      <details>
        <summary>
          {icon} {label}
        </summary>
        <ul>{submenu && submenu.map(item => menuItem(item, pathname))}</ul>
      </details>
    </li>
  );
};

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(item => {
        const { submenu } = item;

        return submenu ? submenuItem(item, pathname) : menuItem(item, pathname);
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="JWR logo" className="cursor-pointer" fill src="/jwr.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">JWR</span>
            <span className="text-xs">Staking app</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};

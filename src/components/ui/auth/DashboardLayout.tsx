"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  BookAudioIcon,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

import { FaMoneyBill, FaPeopleCarry } from "react-icons/fa";
import { User } from "next-auth";
import { GLOBAL_DATA } from "../../../../global-data";
import { SignOut } from "./sign-out";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

type Props = {
  children: React.ReactNode;
  user: User | null;
};

const NAV_LINKS = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Shop",
    icon: FaMoneyBill,
    href: "/shop",
  },
  {
    name: "Your Purchases",
    icon: ShoppingCart,
    href: "/purchases",
  },
];

export function DashboardLayout({ children, user }: Props) {
  const pathName = usePathname();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // Initially set to true for server-side rendering

  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebarState");
    if (savedSidebarState) {
      setIsSidebarExpanded(JSON.parse(savedSidebarState));
    } else {
      setIsSidebarExpanded(false); // Collapse by default if no preference is saved
    }
  }, []);

  const handleToggleSidebar = () => {
    const newSidebarState = !isSidebarExpanded;
    setIsSidebarExpanded(newSidebarState);
    localStorage.setItem("sidebarState", JSON.stringify(newSidebarState));
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
      <div
        className={`hidden border-r bg-muted/40 md:block ${
          isSidebarExpanded ? "w-64" : "w-20"
        } relative`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2
                className={`h-6 w-6 transition-transform duration-300`}
              />
              {isSidebarExpanded && (
                <span className="transition-opacity duration-300">
                  {GLOBAL_DATA.siteNameDashboard}
                </span>
              )}
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathName == link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {isSidebarExpanded && link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4">
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4"
              onClick={handleToggleSidebar}
            >
              {isSidebarExpanded ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <BookAudioIcon className="h-6 w-6" />
                  <span className="sr-only">
                    {GLOBAL_DATA.siteNameDashboard}
                  </span>
                </Link>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form className="hidden">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={user?.image!} alt="@shadcn" />
                    <AvatarFallback>JK</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.name || user?.email}
                </DropdownMenuLabel>
                {/* <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

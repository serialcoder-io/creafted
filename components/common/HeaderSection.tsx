"use client";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/carteStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function HeaderSection() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="link flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary/80">Crafted</h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`link flex items-center gap-2 ${
                pathname === "/" ? "text-primary" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`link flex items-center gap-2 ${
                pathname === "/shop" ? "text-primary" : ""
              }`}
            >
              Shop
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-xl shadow-none border-foreground/5"
              >
                <DropdownMenuTrigger>
                  <User className="h-10 w-10" />
                </DropdownMenuTrigger>
              </Button>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Signout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative">
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2">{totalItems}</Badge>
              )}
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl shadow-none border-foreground/5"
              >
                <ShoppingCart className="" />
              </Button>
            </div>
            <Button
              className="hover:cursor-pointer md:hidden "
              variant="outline"
              size="icon"
            >
              <Menu />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

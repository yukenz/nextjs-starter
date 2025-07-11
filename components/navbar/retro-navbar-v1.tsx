"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {ConnectButton} from "@rainbow-me/rainbowkit";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
]

export function RetroNavbarV1() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="relative z-50 w-full border-b-4 border-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-2xl font-black tracking-wider text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                    <div className="rounded-lg border-2 border-black bg-yellow-400 px-2 py-1 text-black">RETRO</div>
                    <span>ZONE</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex gap-1">
                        <li>
                            <ConnectButton/>
                        </li>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-block rounded-md border-2 border-black bg-white px-4 py-2 font-bold text-black transition-transform hover:-translate-y-1 hover:bg-yellow-300 active:translate-y-0"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden border-2 border-black bg-white hover:bg-yellow-300"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="sr-only">Toggle menu</span>
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "absolute left-0 right-0 top-16 z-50 border-b-4 border-black bg-white px-4 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hidden",
                    mobileMenuOpen ? "block" : "hidden",
                )}
            >
                <nav>
                    <ul className="space-y-2 py-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="block rounded-md border-2 border-black bg-white px-4 py-2 font-bold text-center text-black transition-all hover:bg-yellow-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                    </ul>
                </nav>
            </div>
        </header>
    )
}

'use client'

import {Home, Info, Menu, Settings, Shield, Terminal, X, Zap} from "lucide-react";
import React, {useState} from "react";
import {RetroConnectButton} from "@/components/rainbowkit/retro-connect-button";

interface NavButtonProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active?: boolean;
}

function MobileNavButton({icon: Icon, label, active = false}: NavButtonProps) {
    return (
        <button
            className={`flex items-center space-x-3 w-full px-4 py-3 font-mono text-sm border-2 rounded transition-all duration-300 ${
                active
                    ? 'bg-green-400 text-black border-green-300'
                    : 'text-green-400 border-green-400 hover:bg-green-400/10 hover:border-green-300'
            }`}
        >
            <Icon className="w-5 h-5"/>
            <span>{label}</span>
        </button>
    );
}

function NavButton({icon: Icon, label, active = false}: NavButtonProps) {
    return (
        <button
            className={`flex items-center space-x-2 px-4 py-2 font-mono text-sm border-2 rounded transition-all duration-300 ${
                active
                    ? 'bg-green-400 text-black border-green-300 shadow-lg shadow-green-400/50'
                    : 'text-green-400 border-green-400 hover:bg-green-400/10 hover:border-green-300 hover:shadow-lg hover:shadow-green-400/30'
            }`}
        >
            <Icon className="w-4 h-4"/>
            <span>{label}</span>
        </button>
    );
}


export function RetroNavbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Main Navbar */}
            <nav
                className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-green-400 shadow-lg shadow-green-400/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-400 p-2 rounded border border-green-300">
                                <Terminal className="w-6 h-6 text-black"/>
                            </div>
                            <div className="font-mono">
                                <div className="text-green-400 font-bold text-lg leading-none">ETH-SIGNER</div>
                                <div className="text-green-500 text-xs">v2.0.1</div>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            <NavButton icon={Home} label="HOME" active/>
                            <NavButton icon={Shield} label="VERIFY"/>
                            <NavButton icon={Info} label="ABOUT"/>
                            <NavButton icon={Settings} label="CONFIG"/>
                        </div>

                        <RetroConnectButton/>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden bg-green-400 text-black p-2 rounded border border-green-300 hover:bg-green-300 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black border-t border-green-400">
                        <div className="px-4 py-4 space-y-3">
                            <MobileNavButton icon={Home} label="HOME" active/>
                            <MobileNavButton icon={Shield} label="VERIFY"/>
                            <MobileNavButton icon={Info} label="ABOUT"/>
                            <MobileNavButton icon={Settings} label="CONFIG"/>

                            {/* Mobile Status */}
                            <div className="pt-3 border-t border-green-400/30 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-green-400 font-mono text-sm">STATUS:</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-400 font-mono text-sm">ONLINE</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-400 font-mono text-sm">NETWORK:</span>
                                    <div className="flex items-center space-x-2">
                                        <Zap className="w-4 h-4 text-blue-400"/>
                                        <span className="text-blue-400 font-mono text-sm">MAINNET</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className="h-16"></div>
        </>
    );

}
'use client'

import ErudaProvider from "@/app/provider/ErudaProvider";
import React from "react";
import WagmiContextProvider from "@/app/provider/WagmiContextProvider";
import {RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import {ThemeContextProvider} from "@/app/provider/ThemeContextProvider";

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <ErudaProvider>
            <WagmiContextProvider>
                <RainbowKitProvider
                    modalSize='compact'
                    coolMode={true}
                    showRecentTransactions={true}
                    locale="en-US"
                >
                    <ThemeContextProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem={true}
                        disableTransitionOnChange={true}
                    >
                        {children}
                    </ThemeContextProvider>
                </RainbowKitProvider>
            </WagmiContextProvider>
        </ErudaProvider>
    )
};
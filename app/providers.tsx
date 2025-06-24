'use client'

import ErudaProvider from "@/app/provider/ErudaProvider";
import React from "react";
import WagmiContextProvider from "@/app/provider/WagmiContextProvider";
import {RainbowKitProvider,} from '@rainbow-me/rainbowkit';

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
                    {children}
                </RainbowKitProvider>
            </WagmiContextProvider>
        </ErudaProvider>
    )
};
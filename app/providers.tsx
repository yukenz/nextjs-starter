'use client'

import ErudaProvider from "@/app/provider/ErudaProvider";
import React from "react";
import WagmiContextProvider from "@/app/provider/WagmiContextProvider";

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <ErudaProvider>
            <WagmiContextProvider>
                {children}
            </WagmiContextProvider>
        </ErudaProvider>
    )
};
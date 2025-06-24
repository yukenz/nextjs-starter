'use client'

import {WagmiProvider} from 'wagmi'
import {QueryClientProvider} from '@tanstack/react-query'
import {config as wagmiConfig} from '@/app/config/WagmiConfig'
import {config as queryClientConfig} from '@/app/config/QueryClientConfig'

import React from "react";

type ErudaProviderProps = {
    children: React.ReactNode;
};

export default function WagmiContextProvider({children}: ErudaProviderProps) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClientConfig}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
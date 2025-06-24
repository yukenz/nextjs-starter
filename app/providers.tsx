'use client'

import ErudaProvider from "@/app/provider/ErudaProvider";

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <ErudaProvider>
            {children}
        </ErudaProvider>
    )
};
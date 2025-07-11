'use client'

import React, {useEffect} from "react";

type ErudaProviderProps = {
    children: React.ReactNode;
};

export default function ErudaProvider({children}: ErudaProviderProps) {

    useEffect(() => {

        import("eruda").then(({default: eruda}) => {
            eruda.init({
                tool: ['console', 'elements', 'network', 'resources', 'info'],
                useShadowDom: true, // This can help with hover issues
                autoScale: true,
            });
        });
    }, []);

    return children;
}
'use client'

import React, {useEffect} from "react";

type ErudaProviderProps = {
    children: React.ReactNode;
};

export default function ErudaProvider({children}: ErudaProviderProps) {

    useEffect(() => {
        import("eruda").then(value => {
            value.default.init({
            });
        });
    }, []);

    return children;
}
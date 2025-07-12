"use client"

import "chart.js/auto";

import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {buildUrlWithParams} from "@/lib/utils";


export default function Page() {

    const [buttonBoolean, setButtonBoolean] = useState(true)


    const {isPending, isError, isSuccess, data, error} = useQuery({
        queryKey: ['getweather', buttonBoolean],
        networkMode: 'always',
        queryFn: async ({queryKey}) => {

            console.log([...queryKey])
            const url = buildUrlWithParams("https://weather.googleapis.com/v1/currentConditions:lookup", {
                key: process.env.NEXT_PUBLIC_MAPS_PLATFORM_API_KEY,
                location: {
                    latitude: 37.4220,
                    longitude: -122.0841
                }
            });

            return fetch(url)
                .then((response) => response.text())
        }
    });

    useEffect(() => {
    }, [])

    console.log()

    return (<>
        {isPending && "Fetching"}
        {isError && error.message}
        {isSuccess && data}
        <br/>
        <button onClick={event => {
            event.preventDefault();
            setButtonBoolean(!buttonBoolean);
            console.log("Button clicked");
        }}>trigger {buttonBoolean}</button>

    </>)
}

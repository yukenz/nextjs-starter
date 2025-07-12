"use client"

import "chart.js/auto";

import React, {useEffect, useState} from 'react';

import {AdvancedMarker, APIProvider, Map, MapMouseEvent, Marker, Pin} from '@vis.gl/react-google-maps';
import {Poi} from "@/app/maps/PoiMarkers";


export default function Page() {

    const [location, setLocation] = useState<google.maps.LatLngLiteral | null>({
        lat: -7.490524227925612,
        lng: 108.98301429870264
    })

    const locations: Poi[] = [
        {key: 'operaHouse', location: {lat: -33.8567844, lng: 151.213108}},
        {key: 'tarongaZoo', location: {lat: -33.8472767, lng: 151.2188164}},
        {key: 'manlyBeach', location: {lat: -33.8209738, lng: 151.2563253}},
        {key: 'hyderPark', location: {lat: -33.8690081, lng: 151.2052393}},
        {key: 'theRocks', location: {lat: -33.8587568, lng: 151.2058246}},
        {key: 'circularQuay', location: {lat: -33.858761, lng: 151.2055688}},
        {key: 'harbourBridge', location: {lat: -33.852228, lng: 151.2038374}},
        {key: 'kingsCross', location: {lat: -33.8737375, lng: 151.222569}},
        {key: 'botanicGardens', location: {lat: -33.864167, lng: 151.216387}},
        {key: 'museumOfSydney', location: {lat: -33.8636005, lng: 151.2092542}},
        {key: 'maritimeMuseum', location: {lat: -33.869395, lng: 151.198648}},
        {key: 'kingStreetWharf', location: {lat: -33.8665445, lng: 151.1989808}},
        {key: 'aquarium', location: {lat: -33.869627, lng: 151.202146}},
        {key: 'darlingHarbour', location: {lat: -33.87488, lng: 151.1987113}},
        {key: 'barangaroo', location: {lat: -33.8605523, lng: 151.1972205}},
    ];


    useEffect(() => {
    }, [])

    console.log()

    return (<>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_PLATFORM_API_KEY!}
                     onLoad={() => console.log('Maps API has loaded.', process.env.NEXT_PUBLIC_MAPS_PLATFORM_API_KEY)}>
            <Map
                defaultZoom={3}
                className='w-screen h-screen'
                // className='flex flex-col w-[300px] h-[300px]'
                defaultCenter={{lat: -7.490524227925612, lng: 108.98301429870264}}
                gestureHandling='greedy'
                disableDefaultUI={true}
                mapId='77a92b4ce87ae01626d809e7 '
                onClick={(ev: MapMouseEvent) => {
                    console.log('clicked', ev.detail.latLng);
                    setLocation(ev.detail.latLng);
                }}
            >
                {/*<PoiMarkers pois={locations}/>*/}
                <Marker
                    key='current'
                    position={location}
                    clickable={true}
                />
            </Map>
        </APIProvider>
    </>);
}

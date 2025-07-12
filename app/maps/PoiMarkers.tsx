import React, {useCallback, useEffect, useRef, useState} from "react";
import {AdvancedMarker, Pin, useMap} from "@vis.gl/react-google-maps";
import {Marker, MarkerClusterer} from "@googlemaps/markerclusterer";

export type Poi = { key: string, location: google.maps.LatLngLiteral }

export default function PoiMarkers(props: { pois: Poi[] }) {
    {
        const map = useMap();
        const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
        const clusterer = useRef<MarkerClusterer | null>(null);

        const setMarkerRef = (marker: Marker | null, poiKey: string) => {

            if (marker && markers[poiKey]) return;
            if (!marker && !markers[poiKey]) return;

            setMarkers(prev => {
                if (marker) {
                    return {...prev, [poiKey]: marker};
                } else {
                    const newMarkers = {...prev};
                    delete newMarkers[poiKey];
                    return newMarkers;
                }
            });
        };

        const handleMakerClick = useCallback((ev: google.maps.MapMouseEvent) => {
            if(!map) return;
            if(!ev.latLng) return;
            console.log('marker clicked:', ev.latLng.toString());
            map.panTo(ev.latLng);
        },[]);

        // =========== Effect

        useEffect(() => {
            if (!map) return;
            if (!clusterer.current) {
                clusterer.current = new MarkerClusterer({map});
            }
        }, [map]);

        useEffect(() => {
            clusterer.current?.clearMarkers();
            clusterer.current?.addMarkers(Object.values(markers));
        }, [markers]);

        return (
            <>
                {props.pois.map((poi: Poi) => (
                    <AdvancedMarker
                        key={poi.key}
                        position={poi.location}
                        ref={marker => setMarkerRef(marker, poi.key)}
                        clickable={true}
                        onClick={handleMakerClick}
                    >
                        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'}/>
                    </AdvancedMarker>
                ))}
            </>
        );
    }
}

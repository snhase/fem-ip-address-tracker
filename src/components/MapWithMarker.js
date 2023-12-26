import {useEffect, useRef} from 'react'
import L from 'leaflet'
import markerIcon from '../assets/images/icon-location.svg'

export const MapWithMarker = ({marker}) => {

    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const customIcon = L.icon({
        iconUrl: markerIcon,
    });

    useEffect(() => {
        if(marker && marker.length === 2 && !marker.includes(null) && !marker.includes("")&& !marker.includes(undefined)) {
            mapRef.current = L.map(mapContainer.current, {
                center: marker,
                zoom: 18,
                layers: [
                    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution:
                            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    })
                ]
            })
        }
        return()=>{
            if(mapRef.current){
                mapRef.current.remove();
            }
        }
    },[marker]);
    
    useEffect(() => {
        if(marker && marker.length === 2 && !marker.includes(null) && !marker.includes("") && !marker.includes(undefined)) {
             markerRef.current = L.marker(marker, {icon:customIcon }).addTo(mapRef.current)
        }
    }, [marker, customIcon])

    return (
        <div id='map' ref={mapContainer}></div>
    )

}

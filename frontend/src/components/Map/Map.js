import React, {useState,useEffect} from 'react'
import ReactMapGp, {Marker, Popup} from 'react-map-gl'
import { Link } from 'react-router-dom'
import "./map.css"
import * as assets from "../../assets/storiaApiResponse.json"


export default function Map() {
    
    const [viewport, setViewport] = useState({
        latitude: 47.157792,
        longitude: 27.586658,
        width: "100vw",
        height: "91vh",
        zoom: 12
    }); 

    const [selectedAsset, setSelectedAsset] = useState(null);

    useEffect(() => {
        console.log(selectedAsset?.id)
    }, [selectedAsset])

    const closePopup = () => {
        setSelectedAsset(null)
    };

    return (
        <div style={{maxHeight: "max-height"}}>
            <ReactMapGp 
                style={{maxHeight: "max-height"}}
                mapStyle="mapbox://styles/stefanxd99/cknkflk4o21zv17l4twtmered"
                {...viewport} 
                onViewportChange={(newView) => setViewport(newView)}
                mapboxApiAccessToken='pk.eyJ1Ijoic3RlZmFueGQ5OSIsImEiOiJja25qOW1nejQwaG41MnBwOHBpaXBzZXVwIn0.RGQrkmMTrau5mQaPrj6FLQ'
            >
                {assets?.ads.map((add) =>(
                    <Marker 
                    latitude={Number.parseFloat(add?.map_lat)} 
                    longitude={Number.parseFloat(add?.map_lon)}
                    key={add?.id}
                    >
                        <div 
                            className="map-point" 
                            style={{width: `${viewport.zoom}px`, height:`${viewport.zoom}px` }} 
                            onClick={() => setSelectedAsset(add)}
                        />     
                    </Marker>
                ))}
                {selectedAsset ? (
                    <Popup 
                        latitude={Number.parseFloat(selectedAsset?.map_lat)} 
                        longitude={Number.parseFloat(selectedAsset?.map_lon)}
                        onClose={closePopup}
                        closeButton={true}
                        closeOnClick={false}
                    >
                        <Link to={`/posts/${selectedAsset?.id}`}>
                            {selectedAsset?.title}
                        </Link>
                    </Popup>
                ) : null }
            </ReactMapGp>
        </div>
    )
}

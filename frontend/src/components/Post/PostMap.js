import React, {useState} from 'react'
import ReactMapGp, {Marker, Source, Layer} from 'react-map-gl'
import * as turf from "@turf/turf";

export default function PostMap({post}) {

    const [viewport, setViewport] = useState({
        latitude: post?.latitude,
        longitude: post?.longitude,
        width: "1100px",
        height: "600px",
        zoom: 14
    }); 

    
    const center = [post?.longitude, post?.latitude];
    const radius = post?.mapRadius;
    const options = {steps: 80, units: 'kilometers'};
    const _circle = turf.circle(center, radius, options);

    return (
        <div className="post-map">
            <ReactMapGp 
                mapStyle="mapbox://styles/stefanxd99/cknkflk4o21zv17l4twtmered"
                {...viewport} 
                mapboxApiAccessToken='pk.eyJ1Ijoic3RlZmFueGQ5OSIsImEiOiJja25qOW1nejQwaG41MnBwOHBpaXBzZXVwIn0.RGQrkmMTrau5mQaPrj6FLQ'
                onViewportChange={(newView) => setViewport(newView)}
            >
                {
                    radius ? 
                    <Source 
                        id="circleData" 
                        type="geojson"
                        data={_circle}
                    >
                        <Layer 
                            id= "circle-fill"
                            type= "fill"
                            source= "circleData"
                            paint= {{
                            "fill-color": "#645efe",
                            "fill-opacity": 0.2,
                            }} />
                    </Source> :
                    <Marker 
                        latitude={Number.parseFloat(post?.latitude)} 
                        longitude={Number.parseFloat(post?.longitude)}
                    >
                        <div 
                            className="marker" 
                            style={{width: `${viewport.zoom}px`, height:`${viewport.zoom}px` }} 
                        ></div>     
                    </Marker>
                }
                

            </ReactMapGp>
        </div>
    )
}

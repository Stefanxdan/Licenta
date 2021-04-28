import React, {useState,useEffect} from 'react'
import ReactMapGp, {Popup, Source, Layer} from 'react-map-gl'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./map.css"


function getCursor({isHovering, isDragging}) {
    return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default';
  }

export default function Map() {

    const [viewport, setViewport] = useState({
        latitude: 47.157792,
        longitude: 27.586658,
        width: "100vw",
        height: "91vh",
        zoom: 12
    }); 

    const [selectedAsset, setSelectedAsset] = useState(null);
    //const [posts, setPosts] = useState(null);
    const [geoData, setGeoData] = useState(null)

    useEffect(() => {
        const fetchPosts = async () =>{
            //setLoading(true);
            const res = await axios.get('/Posts/compact');
            //setPosts(res.data);
            //setLoading(false);
            console.log("posts call")

            let obj = {
                type: 'FeatureCollection',
                features: []
            }
    
            res.data?.map((post) =>{
                obj.features.push({
                    type: 'Feature',
                    geometry: {type: 'Point', coordinates: [post.longitude,post.latitude]},
                    properties: {
                        id: post.id,
                        title: post.title,
                        latitude: post.latitude,
                        longitude: post.longitude
                    }
                })
                return 0
            })
            setGeoData(obj)
        }
        fetchPosts();
    }, [])

    const closePopup = () => {
        setSelectedAsset(null)
    };

    const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': viewport.zoom*0.4,
        'circle-color': '#493ffc',
        'circle-blur': 0.1,
        'circle-stroke-width': viewport.zoom*0.1,
        'circle-stroke-opacity': 0.5
    }
    };
    
    const onClickMap = (evt) =>{
        if(evt.features.length !== 0)
            setSelectedAsset(evt.features[0].properties)
      }

    return (
        <div style={{maxHeight: "max-height"}}>
            <ReactMapGp 
                style={{maxHeight: "max-height"}}
                mapStyle="mapbox://styles/stefanxd99/cknkflk4o21zv17l4twtmered"
                {...viewport} 
                onViewportChange={(newView) => setViewport(newView)}
                mapboxApiAccessToken='pk.eyJ1Ijoic3RlZmFueGQ5OSIsImEiOiJja25qOW1nejQwaG41MnBwOHBpaXBzZXVwIn0.RGQrkmMTrau5mQaPrj6FLQ'
                onClick={e => onClickMap(e)}
                getCursor={getCursor}

            >
                <Source id="adds" type="geojson" data={geoData}>
                    <Layer {...layerStyle} />
                </Source>
                {/*
                posts?.slice(0, 2).map((add) =>(
                    <Marker 
                    latitude={Number.parseFloat(add?.latitude)} 
                    longitude={Number.parseFloat(add?.longitude)}
                    key={add?.id}
                    >
                        <div 
                            className="map-point" 
                            style={{width: `${viewport.zoom}px`, height:`${viewport.zoom}px` }} 
                            onClick={() => setSelectedAsset(add)}
                        />     
                    </Marker>
                ))*/
                }
                
                {selectedAsset ? (
                    <Popup 
                        latitude={Number.parseFloat(selectedAsset?.latitude)} 
                        longitude={Number.parseFloat(selectedAsset?.longitude)}
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

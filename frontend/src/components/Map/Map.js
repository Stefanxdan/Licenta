import React, {useState, useEffect, useRef} from 'react'
import ReactMapGp, {Popup, Source, Layer} from 'react-map-gl'
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./map.css"


function getCursor({isHovering, isDragging}) {
    return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default';
  }

function PostToGeoJson(posts){
    let obj = {
        type: 'FeatureCollection',
        features: []
    }

    posts?.map((post) =>{
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

    return obj;
}

export default function Map() {

    const [viewport, setViewport] = useState({
        latitude: 47.157792,
        longitude: 27.586658,
        width: "100vw",
        height: "91vh",
        zoom: 12
    }); 

    const mapRef = useRef(null);

    const [loading, setLoading] = useState(true)
    const [selectedAsset, setSelectedAsset] = useState(null);
    //const [posts, setPosts] = useState(null);
    const [geoData, setGeoData] = useState(null)

    useEffect(() => {
        const fetchPosts = async () =>{
            console.log("posts call")
            
            const res = await axios.get('/Posts/compact');
            //setPosts(res.data);
            setGeoData(PostToGeoJson(res.data))
            setLoading(false);
        }
        setTimeout(() => {fetchPosts()},500);

    }, [])


    const closePopup = () => {
        setSelectedAsset(null)
    };

    /*
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
    */

    const onClickMap = (evt) =>{
        console.log(evt.features)
        if(evt.features.length === 0)
            return
        const feature = evt.features[0]
        if( feature?.layer?.id === "point"){
            setSelectedAsset(feature.properties)
            return
        }

        const clusterId = feature.properties?.cluster_id;

        const mapboxSource = mapRef.current.getMap().getSource('adds');

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
            return;
        }

        setViewport({
            ...viewport,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            zoom,
            transitionDuration: 500
        });
        });

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
                //interactiveLayerIds={[clusterLayer.id]}
                ref={mapRef}
            >
                <Source 
                    id="adds" 
                    type="geojson" 
                    data={geoData}
                    cluster={true}
                    clusterMaxZoom={15}
                    clusterRadius={41}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
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

                {loading ? (
                    <div className="loading-spiner-container">
                        <i className="loading-spiner fas fa-spinner fa-pulse"></i>
                    </div>
                    ) : null
                }

            </ReactMapGp>
        </div>
    )
}

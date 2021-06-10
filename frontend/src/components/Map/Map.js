import React, {useState, useEffect, useRef} from 'react'
import ReactMapGp, {Popup, Source, Layer} from 'react-map-gl'
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./map.css"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {geoDataZones, dataLayer, dataLayerLines, dataLayerSymbols, dataLayerHeatMap} from "./geoDataZones"


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

    const [err, setErr] = useState();
    const [loading, setLoading] = useState(true)
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    //const [posts, setPosts] = useState(null);
    const [geoData, setGeoData] = useState(null)
    const [switchState, setSwitchState] = useState({Posts: true, Zones: false, HeatMap: false})


    useEffect(() => {
        const fetchPosts = async () =>{            
            await axios.get('/Posts/map')
            .then(response => { 
                //setPosts(response.data);
                setGeoData(PostToGeoJson(response.data))
            })
            .catch(error => {
                if(error?.response?.status)
                    setErr(error?.response?.status + " " + error?.response?.statusText)
                else
                    setErr("ERR_CONNECTION_REFUSED")
            });            
            setLoading(false);
        }
        //setTimeout(() => {fetchPosts()},500);
        fetchPosts();
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
        console.log(evt)
        if(evt.features.length === 0)
            return
        const feature = evt.features[0]

        if( feature?.layer?.id === "zones" ||  feature?.layer?.id === "symbols"){
            setSelectedZone(feature.properties)
            return
        }

        if( feature?.layer?.id === "point"){
            setSelectedAsset(feature.properties)
            return
        }

        const clusterId = feature.properties?.cluster_id;

        if (switchState.Posts === false)
            return

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


    const handleChangeSwitch = (event) => {
        setSwitchState({ ...switchState, [event.target.name]: event.target.checked });
    };


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
                ref={mapRef}
            >
                {switchState.Posts &&
                <>
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
                </>
                }
                {switchState.Zones &&
                <>
                    <Source id="zones" type="geojson" data={geoDataZones}>
                        <Layer {...dataLayer} />
                    </Source>
                    <Source id="lines" type="geojson" data={geoDataZones}>
                        <Layer {...dataLayerLines} />
                    </Source>  
                    <Source id="symbols" type="geojson" data={geoDataZones}>
                        <Layer {...dataLayerSymbols} />
                    </Source>
                </>
                } 
                {
                switchState.HeatMap &&
                <>
                    <Source id="heatmap" type="geojson" data={geoData}>
                        <Layer {...dataLayerHeatMap} />
                    </Source>
                </>
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
                ) : err ? (
                    <div className="err-response">{err}</div>
                ) : null
                }

            </ReactMapGp>

            <div style={{position: "absolute", top: "100px", left: "20px"}}>
                <FormGroup column="true">
                    <FormControlLabel
                        control={<Switch checked={switchState.Posts} onChange={handleChangeSwitch} name="Posts" color="primary"/>}
                        label="Posts"
                    />
                    <FormControlLabel
                        control={<Switch checked={switchState.HeatMap} onChange={handleChangeSwitch} name="HeatMap" color="primary"/>}
                        label="HeatMap"
                    />
                    <FormControlLabel
                        control={<Switch checked={switchState.Zones} onChange={handleChangeSwitch} name="Zones" color="primary"/>}
                        label="Zones"
                    />
                </FormGroup>
            </div>
        </div>
    )
}

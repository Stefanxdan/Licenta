import React, {useState,useEffect} from 'react'
import ReactMapGp, {Marker, Popup} from 'react-map-gl'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./map.css"

export default function Map() {
    
    const [viewport, setViewport] = useState({
        latitude: 47.157792,
        longitude: 27.586658,
        width: "100vw",
        height: "91vh",
        zoom: 12
    }); 

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchPosts = async () =>{
            //setLoading(true);
            const res = await axios.get('/Posts/compact');
            setPosts(res.data);
            //setLoading(false);
            console.log("posts call")
        }

        fetchPosts();
    }, [])

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
                {posts?.slice(0, 1000).map((add) =>(
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
                ))}
                {selectedAsset ? (
                    <Popup 
                        latitude={Number.parseFloat(selectedAsset?.latitude)} 
                        longitude={Number.parseFloat(selectedAsset?.longitude)}
                        onClose={closePopup}
                        closeButton={true}
                        closeOnClick={false}
                    >
                        <Link to={`/posts/post/${selectedAsset?.title}`}>
                            {selectedAsset?.title}
                        </Link>
                    </Popup>
                ) : null }
            </ReactMapGp>
        </div>
    )
}

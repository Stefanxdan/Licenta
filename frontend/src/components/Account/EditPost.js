import React, {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import ReactMapGp, {Marker} from 'react-map-gl'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

export default function EditPost() {

    const { idPost } = useParams()
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const history = useHistory()

    const [viewport, setViewport] = useState({
        latitude: 47.157792,
        longitude: 27.586658,
        width: "1100px",
        height: "600px",
        zoom: 14
    });
    
    const [marker, setMarker] = useState({
        latitude: 47.157792,
        longitude: 27.586658
      });
      const onMarkerDragEnd = useCallback(event => {
        setMarker({
          longitude: event.lngLat[0],
          latitude: event.lngLat[1],
        });
      }, []);


    useEffect(() => {
        const fetchPost = async () =>{
            setLoading(true);
            await axios.get(`/Posts/${idPost}`)
            .then(response => { 
                setPost(response.data);
            })
            .catch(error => {
                if(error?.response?.status)
                    setErr(error?.response?.status + " " + error?.response?.statusText)
                else
                    setErr("ERR_CONNECTION_REFUSED")
            });
            setLoading(false);

        }

        fetchPost();
    },[idPost])


    useEffect(() => {
        setMarker({
            longitude: post?.longitude,
            latitude: post?.latitude
          })
          setViewport({
            longitude: post?.longitude,
            latitude: post?.latitude,
            width: "1100px",
            height: "600px",
            zoom: 14
          })
    }, [post?.longitude, post?.latitude])

    const onSubmit = (data) => {
        data["Latitude"] = marker.latitude;
        data["Longitude"] = marker.longitude;
        data["MapRadius"] = 0;
        data["photosPaths"] = "";

        const editPost = async () =>{
            setLoading(true);
            await axios.put(`/Posts/${post.id}`,data)
            .then(response => { 
                history.push(`/Posts/${post.id}`)
            })
            .catch(error => {
                setErr(true)
            });
            setLoading(false);
        }

        editPost();
    }

    return (
        <>
            {loading ? (
                <div className="loading-spiner-container">
                    <i className="loading-spiner fas fa-spinner fa-pulse"></i>
                </div>
            ): err ? (
               <div className="err-response">{err}</div>
            ):
            (
                <div className="account-page-inner">
                {loading ? (
                    <div className="loading-spiner-container">
                        <i className="loading-spiner fas fa-spinner fa-pulse"></i>
                    </div>
                    ): err ? (
                    <div className="err-response">{err}</div>
                    ) : null
                }   
                <div  className="addPost">
                    <div className="flex-wrap">
                        <h3 className="account-icons">Edit my post</h3>
                        <div className="green account-icons">
                            <button className="icon-button" form="addPostForm" type="submit">
                                <i className="fas fa-check fa-2x" />
                            </button>
                        </div>
                        <div className="red account-icons">
                            <button className="icon-button" onClick={() => history.push("/account")}>
                                <i className="fas fa-times fa-2x"></i>
                            </button>
                        </div>
                    </div>
                    <form id="addPostForm" onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="detail">
                            <label htmlFor="title">
                                <strong>Title:</strong>
                            </label>
                            <input type="text" id="title" name="title" defaultValue={post?.title}
                                {...register("title", { required:"Title required" })}
                            />
                            {errors.title && <p>{errors.title.message}</p>}
                        </div>

                        <div className="detail">
                            <label htmlFor="description">
                                <strong>Description:</strong>
                            </label>
                            <textarea  rows="5"  type="text" id="description" name="description" defaultValue={post?.description}
                                {...register("description", { required:"Description required" })}
                            />
                            {errors.description && <p>{errors.description.message}</p>}
                        </div>

                        <div className="flex-wrap">
                            <div className="detail price flx-grow1">
                                <label htmlFor="price">
                                    <strong>Price:</strong>
                                </label>
                                <input type="number" id="price" name="price" defaultValue={post?.price}
                                    {...register("price", { required:"Price required" })}
                                />
                                {errors.price && <p>{errors.price.message}</p>}
                                <select  type="text" id="Currency" name="Currency" defaultValue={post?.currency}
                                     {...register("Currency", { required:"Currency required" })}>
                                    <option value="EUR">EUR</option>
                                    <option value="RON">RON</option>
                                </select>
                                {errors.condition && <p>{errors.condition.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="condition">
                                    <strong>Condition:</strong>
                                </label>
                                <select  type="text" id="condition" name="condition"  defaultValue={post?.condition}
                                    {...register("condition", { required:"Condition required" })}>
                                    <option value="new">New</option>
                                    <option value="great">Great</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                </select>
                                {errors.condition && <p>{errors.condition.message}</p>}
                            </div>
                        </div>

                        <div className="flex-wrap">
                            <div className="detail flx-grow1">
                                <label htmlFor="type">
                                    <strong>Type:</strong>
                                </label>
                                <select type="text" id="type" name="type"   defaultValue={post?.type}
                                    {...register("type", { required:"Type required" })}>
                                    <option value="apartament">apartament</option>
                                    <option value="house">house</option>
                                </select>
                                {errors.type && <p>{errors.type.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="partitioning">
                                    <strong>Partitioning:</strong>
                                </label>
                                <select type="text" id="partitioning" name="partitioning"  defaultValue={post?.partitioning}
                                     {...register("partitioning", { required:"Partitioning required" })}>
                                    <option value="decomandat">decomandat</option>
                                    <option value="semidecomandat">semidecomandat</option>
                                    <option value="nedecomandat">nedecomandat</option>
                                    <option value="circular">circular</option>
                                </select>
                                {errors.partitioning && <p>{errors.partitioning.message}</p>}
                            </div>
                        </div>
                    
                        <div className="flex-wrap">
                            <div className="detail flx-grow1">
                                <label htmlFor="bedrooms">
                                    <strong>Bedrooms:</strong>
                                </label>
                                <input type="number" id="bedrooms" name="bedrooms"  defaultValue={post?.bedrooms}
                                     {...register("bedrooms", { required:"Bedrooms required" })} />
                                {errors.bedrooms && <p>{errors.bedrooms.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="bathrooms">
                                    <strong>Bathrooms:</strong>
                                </label>
                                <input type="number" id="bathrooms" name="bathrooms"  defaultValue={post?.bathrooms}
                                     {...register("bathrooms", { required:"Bathrooms required" })} />
                                {errors.bathrooms && <p>{errors.bathrooms.message}</p>}
                            </div>
                        </div>

                        <div className="flex-wrap">
                            <div className="detail flx-grow1">
                                <label htmlFor="SurfaceBuilt">
                                    <strong>Surface Built:</strong>
                                </label>
                                <input type="number" id="SurfaceBuilt" name="SurfaceBuilt"  defaultValue={post?.surfaceBuilt}
                                     {...register("SurfaceBuilt", { required:"Surface Built required" })} />
                                {errors.SurfaceBuilt && <p>{errors.SurfaceBuilt.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="SurfaceUseful">
                                    <strong>Surface Useful:</strong>
                                </label>
                                <input type="number" id="SurfaceUseful" name="SurfaceUseful"  defaultValue={post?.surfaceUseful}
                                     {...register("SurfaceUseful", { required:"Surface Useful required" })} />
                                {errors.SurfaceUseful && <p>{errors.SurfaceUseful.message}</p>}
                            </div>
                        </div>

                        <div className="flex-wrap">
                            <div className="detail flx-grow1">
                                <label htmlFor="BuildingYear">
                                    <strong>Building Year:</strong>
                                </label>
                                <input type="number" id="BuildingYear" name="BuildingYear" min="1900" max="2021"
                                    defaultValue={post?.buildingYear}
                                    {...register("BuildingYear", { required:"Building Year required" })} />
                                {errors.BuildingYear && <p>{errors.BuildingYear.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="CityLabel">
                                    <strong>City Label:</strong>
                                </label>
                                <select type="number" id="CityLabel" name="CityLabel" defaultValue={post?.cityLabel}
                                    {...register("CityLabel", { required:"City Label required" })}>
                                    <option value="Iasi (judet), Iasi">Iasi (judet), Iasi</option>
                                </select>
                                {errors.CityLabel && <p>{errors.CityLabel.message}</p>}
                            </div>
                        </div>
                    </form>
                    <h4 style={{paddingTop:"2rem", paddingBottom:"1rem"}}>Edit location</h4>
                    <div className="post-map">
                        <ReactMapGp 
                            mapStyle="mapbox://styles/stefanxd99/cknkflk4o21zv17l4twtmered"
                            {...viewport} 
                            mapboxApiAccessToken='pk.eyJ1Ijoic3RlZmFueGQ5OSIsImEiOiJja25qOW1nejQwaG41MnBwOHBpaXBzZXVwIn0.RGQrkmMTrau5mQaPrj6FLQ'
                            onViewportChange={(newView) => setViewport(newView)}
                        >
                          <Marker 
                                longitude={marker.longitude}
                                latitude={marker.latitude}
                                draggable
                                onDragEnd={onMarkerDragEnd}
                            >
                                <div 
                                    className="marker" 
                                    style={{width: `${1.5*viewport.zoom}px`, height:`${1.5*viewport.zoom}px` }} 
                                ></div>     
                            </Marker>  
                            

                        </ReactMapGp>
                    </div>
                    <h4 style={{paddingTop:"2rem", paddingBottom:"1rem"}}>Edit photos</h4>

                </div>
            </div>
            )
            }
        </>
    )
}

import React, {useState, useCallback, useLayoutEffect} from 'react'
import { useForm } from "react-hook-form"
import ReactMapGp, {Marker} from 'react-map-gl'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import defaultImgSrc from '../../assets/add-img.png'
import {cities} from "../../assets/CitiesArray"


export default function AddPost() {

    let fileInput = null;
    const { register, handleSubmit, formState: { errors }} = useForm();
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [inputFiles, setInputFiles] = useState([])
    const [previewImg, setPreviewImg] = useState([])


    const onSubmit = (data) => {

        const addPost = async () =>{
            data["Latitude"] = marker.latitude;
            data["Longitude"] = marker.longitude;
            data["MapRadius"] = 0;
            data["ForRent"] = 1;
            data["PhotosNumber"] = previewImg.length;
            console.log(data)
            setLoading(true);
            await axios.post(`/Posts`,data)
            .then(response => { 
                uploadPhoto(response.data.id)
            })
            .catch(error => {
                setErr(true)
            });
        }

        const uploadPhoto = async (postId) =>{
            
            const formData = new FormData()
            Array.from(inputFiles).map((file) => formData.append('imageFile', file))
            formData.append('postId',postId)

            setLoading(true);
            await axios.post(`/UploadFiles`,formData)
            .then(response => { 
                history.push("/account")
            })
            .catch(error => {
                setErr(true)
            });
            setLoading(false);
        }


        addPost();
    }

    const [viewport, setViewport] = useState({
        latitude: 47.157792,
        longitude: 27.586658,
        width: "1100px",
        height: "600px",
        zoom: 14
    });

    useLayoutEffect(() => {
        function updateViewport() {
            setViewport({...viewport, width: "100%"})
        }
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
      }, [viewport]);

    
    
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


    function filesInputHandler(e){
        if(e.target.files){
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file)).slice(0,10)
            setPreviewImg(fileArray);
            setInputFiles(e.target.files);
        }
    }

    return (
        <div className="account-page">
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
                        <h3 className="account-icons">Add new post</h3>
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
                            <input type="text" id="title" name="title" {...register("title", { required:"Title required" })}/>
                            {errors.title && <p>{errors.title.message}</p>}
                        </div>

                        <div className="detail">
                            <label htmlFor="description">
                                <strong>Description:</strong>
                            </label>
                            <textarea  rows="5"  type="text" id="description" name="description" {...register("description", { required:"Description required" })}/>
                            {errors.description && <p>{errors.description.message}</p>}
                        </div>

                        <div className="flex-wrap">
                            <div className="detail price flx-grow1">
                                <label htmlFor="price">
                                    <strong>Price:</strong>
                                </label>
                                <input type="number" id="price" name="price" {...register("price", { required:"Price required" })}/>
                                {errors.price && <p>{errors.price.message}</p>}
                                <select  type="text" id="Currency" name="Currency" {...register("Currency", { required:"Currency required" })}>
                                    <option value="EUR">EUR</option>
                                    <option value="RON">RON</option>
                                </select>
                                {errors.condition && <p>{errors.condition.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="condition">
                                    <strong>Condition:</strong>
                                </label>
                                <select  type="text" id="condition" name="condition" {...register("condition", { required:"Condition required" })}>
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
                                <select type="text" id="type" name="type" {...register("type", { required:"Type required" })}>
                                    <option value="apartament">apartament</option>
                                    <option value="house">house</option>
                                </select>
                                {errors.type && <p>{errors.type.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="partitioning">
                                    <strong>Partitioning:</strong>
                                </label>
                                <select type="text" id="partitioning" name="partitioning" {...register("partitioning", { required:"Partitioning required" })}>
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
                                <input type="number" id="bedrooms" name="bedrooms" {...register("bedrooms", { required:"Bedrooms required" })} />
                                {errors.bedrooms && <p>{errors.bedrooms.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="bathrooms">
                                    <strong>Bathrooms:</strong>
                                </label>
                                <input type="number" id="bathrooms" name="bathrooms" {...register("bathrooms", { required:"Bathrooms required" })} />
                                {errors.bathrooms && <p>{errors.bathrooms.message}</p>}
                            </div>
                        </div>

                        <div className="flex-wrap">
                            <div className="detail flx-grow1">
                                <label htmlFor="SurfaceBuilt">
                                    <strong>Surface Built:</strong>
                                </label>
                                <input type="number" id="SurfaceBuilt" name="SurfaceBuilt" {...register("SurfaceBuilt", { required:"Surface Built required" })} />
                                {errors.SurfaceBuilt && <p>{errors.SurfaceBuilt.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="SurfaceUseful">
                                    <strong>Surface Useful:</strong>
                                </label>
                                <input type="number" id="SurfaceUseful" name="SurfaceUseful" {...register("SurfaceUseful", { required:"Surface Useful required" })} />
                                {errors.SurfaceUseful && <p>{errors.SurfaceUseful.message}</p>}
                            </div>
                        </div>

                        <div className="flex-wrap">
                            <div className="detail flx-grow1">
                                <label htmlFor="BuildingYear">
                                    <strong>Building Year:</strong>
                                </label>
                                <input type="number" id="BuildingYear" name="BuildingYear" min="1900" max="2021" {...register("BuildingYear", { required:"Building Year required" })} />
                                {errors.BuildingYear && <p>{errors.BuildingYear.message}</p>}
                            </div>
                            <div className="detail flx-grow1">
                                <label htmlFor="CityLabel">
                                    <strong>City Label:</strong>
                                </label>
                                <select id="CityLabel" name="CityLabel" {...register("CityLabel", { required:"City Label required" })}>
                                    <option value="Iasi (judet), Iasi">Iasi (judet), Iasi</option>
                                    {
                                        cities.map(n =>
                                            (
                                                <option value={n} key={n}>{n}</option>   
                                            ))
                                    }
                                </select>
                                {errors.CityLabel && <p>{errors.CityLabel.message}</p>}
                            </div>
                        </div>
                    </form>
                    <h4 style={{paddingTop:"2rem", paddingBottom:"1rem"}}>Select location</h4>
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
                                        
                    <h4 style={{paddingTop:"2rem", paddingBottom:"1rem"}}>Add photos (max 10)</h4>
                    <div className="add-photo">
                        {
                            previewImg.map((photo) =>
                                <img src={photo} key={photo} alt="postPhoto"/>
                            )
                        }
                        <img src={defaultImgSrc} alt="postPhoto" onClick={() => fileInput.click()}/>
                        <input 
                            type="file" accept="image/*" multiple
                            id="photo" name="photo" 
                            onChange={filesInputHandler}
                            ref={(input) => { fileInput = input} }/>
                    </div>
                </div>
            </div>
        </div>
    )
}

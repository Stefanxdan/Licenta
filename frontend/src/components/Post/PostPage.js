import React, {useState, useEffect} from 'react'
import ImgSlider from "./ImgSlider"
import PostInfo from "./PostInfo"
import PostMap from "./PostMap"
import OwnerDetailes from "./OwnerDetailes"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./PostPage.css"

export default function PostPage() {

    const { idPost } = useParams()
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState();

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
        /*
        const fetchJson = async () =>{
            setLoading(true);
            const data = require("./data.json");
            setPost(data);
            setLoading(false);
        }
        */
        
        setTimeout(() => {fetchPost()},500);
    },[idPost])

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
                <>
                    <div style={{backgroundColor:" #f2f4f5"}}>
                        <div  className="slider">
                            <ImgSlider photosPaths={post.photosPaths} />
                        </div>
                    </div>
                    <PostInfo post={post}/>
                    <PostMap post={post}/>
                    <OwnerDetailes post={post}/>
                </>
            )
            }
        </>
    )
}

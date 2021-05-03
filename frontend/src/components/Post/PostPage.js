import React, {useState, useEffect} from 'react'
import ImgSlider from "./ImgSlider"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./PostPage.css"

export default function PostPage() {

    const { idPost } = useParams()
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () =>{
            setLoading(true);
            const res = await axios.get(`/Posts/${idPost}`);
            setPost(res.data);
            setLoading(false);
        }
        
        setTimeout(() => {fetchPost()},500);
    },[idPost])

    return (
        <>
            {loading || (
                <div style={{"background-color":" #f2f4f5"}}>
                    <div  className="slider">
                        <ImgSlider photosPaths={post.photosPaths} />
                    </div>
                </div>
            )}
        </>
    )
}

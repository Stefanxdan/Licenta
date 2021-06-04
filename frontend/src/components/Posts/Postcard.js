import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


export default function PostCard(props) {

    const history = useHistory()
    const [post, setPost] = useState(props.post);

    function DeletePost(){
        const deleteAsync = async () =>{
            await axios.delete(`/Posts/${post.id}`)
            .then(response => { 
                console.log(response.data)
                setPost(null)
            })
            .catch(error => {
                console.log(error.data)
            });
        }

        deleteAsync()
    }

    if( !post )
        return(<></>)
    return (
        <div className="flex">
        <Link to={`/posts/${post?.id}`} className="card-LinkTo" style={{flexGrow:1}}>
            <div className="card-container">
                <div className="img-container">
                    {
                        post?.isLocal ?
                        <img src={`http://localhost:5000/Resources/Images/${post?.id}/1.png`} alt="PostImg"/>
                        :
                        <img src={post?.photosPaths?.split("<>")[0]} alt="PostImg"/>
                    }
                </div>
                <span className="card-info-container">
                    <div className='card-title'>{post.title}</div>
                    <div className="card-small-container">
                        <div className='card-infos'>
                            <div>{post.bedrooms} bedrooms</div>
                            <div>{post.bathrooms} bathrooms</div>
                            <div>{post.surfaceUseful} m^2</div>
                        </div>
                        <div className='card-price'>{post.price}{post.currency==="EUR" ? "€" : post.currency}</div>
                    </div>
                </span> 
                
                
            </div>
        </Link>
            {props.deletable &&
                <div className="card-buttons">
                    {props.editable &&
                        <button className="icon-button" onClick={() => {history.push(`/posts/edit/${post.id}`)}}>
                            <i className="far fa-edit fa-2x"></i>
                        </button>
                    }
                    <button className="icon-button" onClick={DeletePost}>
                            <i className="far fa-trash-alt fa-2x"></i>
                    </button>
                </div>
            }
        </div>
    )
}

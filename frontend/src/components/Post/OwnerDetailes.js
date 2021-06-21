import React, { useState, useEffect } from 'react'
import  { Link } from 'react-router-dom'
import axios from 'axios'


export default function OwnerDetailes({post}) {

    const [user, setUser] = useState(null)
    useEffect(() => {
        const fetchUser = async () =>{
            await axios.get(`/Users/${post.idUser}`)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {});
        } 
        
        fetchUser()

    }, [post])
    return (
        
        <div className="post-owner">
            <i className="fas fa-user"></i>
            <div className="post-owner-info 2x">
                <h4>{user?.role === "Provider" ? "Provider: " : "Owner: "} {user?.username}</h4>
                {user?.role === "Provider" ?
                    <div>View the orignal post from storia <a href={post?.externalUrl} target="_blank" rel="noreferrer">here</a></div>
                :
                    <>
                        <div>Phone number <a href="" target="_blank" rel="noreferrer">unhide</a></div>
                        <div>Member from {user?.timeAdded.split("T")[0]}</div>
                    </>
                }
                <div style={{paddingTop: "1rem"}}>
                    See all post from this {user?.role === "Provider" ? "provider" : "user"} <Link to={`/posts/user/${post?.idUser}`}>here</Link>
                </div>
            </div>
        </div>
    )

}

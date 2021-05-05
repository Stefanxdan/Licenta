import React from 'react'
import PostProprieties from "./PostProprieties"

export default function PostInfo({post}) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const date = new Date(post?.timeAdded)
    return (
        <div className="post-info">
            <div className="post-header">
                <div className="post-title">{post.title}</div>
                <div className="post-price">
                    {post.price}{post.currency==="EUR" ? "€" : post.currency}
                </div>
            </div>
            <PostProprieties post={post}/>
            <div className="description">
                <h3>Description</h3>
                {post.description.split("\n").map((paragraph, index) =>(
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <div className="time-posted">
                <div>
                    {days[date.getDay()] + " " + date.getHours() + ":" + date.getMinutes()}
                </div>
                <div>
                    {months[date.getMonth()]  + " " + date.getDay()  + " " + date.getFullYear()}
                </div>    
            </div>
        </div>
    )
}

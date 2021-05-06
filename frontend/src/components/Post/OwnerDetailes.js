import React from 'react'
import storia from "../../assets/storia.png"

export default function OwnerDetailes({post}) {

    const name = "Storia.ro"
    if(post?.isLocal)
        return (
            <div>
                Local
            </div>
        )
    else
        return (
            <div className="post-owner">
                <img src={storia} alt="owner"/>
                <div className="post-owner-info">
                    <h4>{name}</h4>
                    <div>View the orignal post from storia: <a href={post?.externalUrl} target="_blank" rel="noreferrer">here</a></div>
                </div>
            </div>
        )
}

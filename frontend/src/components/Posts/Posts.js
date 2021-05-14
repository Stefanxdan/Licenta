import React from 'react'
import PostCard from './Postcard'



export default function Posts(props) {
    return (
        <>
            {props.posts?.map((post,index) =>(
                <PostCard post={post} editable={props.editable}  key={index} />   
            ))}
        </>
    )
}

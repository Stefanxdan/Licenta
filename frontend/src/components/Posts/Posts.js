import React from 'react'
import PostCard from './Postcard'



export default function Posts(props) {
    return (
        <>
            {props.notDisplay ? null
            : props.posts?.map((post,index) =>(
                <PostCard post={post} editable={props.editable} deletable={props.deletable} key={index} />   
            ))
        }
        </>
    )
}

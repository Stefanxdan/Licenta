import React from 'react'
import PostCard from './Postcard'
import { Container } from 'react-bootstrap'



export default function Posts(props) {
    return (
        <Container>
            {props.posts?.map((post,index) =>(
                <PostCard post={post} editable={props.editable}  key={index} />   
            ))}
        </Container>
    )
}

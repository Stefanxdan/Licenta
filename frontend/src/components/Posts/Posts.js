import React from 'react'
import { Container } from 'react-bootstrap'
import Filters from './Filters'
import PostCard from './Postcard'
import './Post.css'

export default function Posts() {
    return (
        <div className="d-flex justify-content-center" style={{maxWidth: "2000px", margin: "auto"}}>
            <div className="d-flex align-items-flex-start justify-content-center mt-5" >
                <Filters />
                <Container>
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </Container>
            </div>
        </div>
    )
}

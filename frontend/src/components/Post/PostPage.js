import React from 'react'
import { useParams } from 'react-router-dom'

export default function PostPage() {

    const { idPost } = useParams()

    return (
        <div>
            {idPost}
        </div>
    )
}

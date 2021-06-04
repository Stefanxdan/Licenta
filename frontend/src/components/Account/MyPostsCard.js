import React from 'react'
import { Link } from 'react-router-dom'

export default function MyPostsCard({myPostNumber, fct}) {
    return (
        <div className="acc-posts-card" onClick={fct}>
            <h4><strong>My Posts</strong></h4>
            <div className="apc-txt">Public Anyone can see them</div>
            <div className="apc-flex">
                <div>
                    No. {myPostNumber}                     
                </div>
                <div>
                    <Link to="/posts/add"><i className="fas fa-plus fa-2x"></i></Link>                
                </div>
            </div>
        </div>
    )
}

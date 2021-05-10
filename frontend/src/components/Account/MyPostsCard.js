import React from 'react'

export default function MyPostsCard({myPostNumber}) {
    return (
        <div className="acc-posts-card">
            <h4><strong>My Posts</strong></h4>
            <div className="apc-txt">Public Anyone can see them</div>
            <div className="apc-flex">
                <div>
                    No. {myPostNumber}                     
                </div>
                <div>
                    <i className="fas fa-plus fa-2x"></i>                   
                </div>
            </div>
        </div>
    )
}

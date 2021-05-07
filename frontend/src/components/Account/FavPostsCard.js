import React from 'react'

export default function FavPostsCard() {
    return (
        <div className="acc-posts-card">
            <h4><strong>Favorites Posts</strong></h4>
            <div className="apc-txt">Private. Only for your eyes</div>
            <div className="apc-flex">
                <div>
                    <i className="fas fa-heart fa-2x"></i>
                    
                </div>
                <div>
                    No. 0                     
                    </div>
            </div>
        </div>
    )
}

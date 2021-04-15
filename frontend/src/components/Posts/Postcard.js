import React from 'react'
import img from '../../assets/image.png'

export default function PostCard(props) {

    const post = props.post;
    if( !post )
        return(<></>)
    return (
        <div className="card-container">
            <div className="img-container">
                <img src={img} alt="Logo"/>
            </div>
            <span className="card-info-container">
                <div className='card-title'>{post.title}</div>
                <div className="card-small-container">
                    <div className='card-infos'>
                        <div>{post.bedrooms} bedrooms</div>
                        <div>{post.bathrooms} bathrooms</div>
                        <div>{post.surfaceUseful} m^2</div>
                    </div>
                    <div className='card-price'>{post.price}$</div>
                </div>
                
            </span> 
        </div>
    )
}

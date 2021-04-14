import React from 'react'
import img from '../../assets/image.png'

export default function PostCard() {
    return (
        <div className="card-container">
            <div className="img-container">
                <img src={img} alt="Logo"/>
            </div>
            <span className="card-info-container">
                <div className='card-title'>Apartament super central</div>
                <div className="card-small-container">
                    <div className='card-infos'>
                        <div>3 bedrooms</div>
                        <div>2 bathrooms</div>
                        <div>50 m^2</div>
                    </div>
                    <div className='card-price'>50.000$</div>
                </div>
                
            </span> 
        </div>
    )
}

import React, {useState} from 'react'
import { Slide } from 'react-slideshow-image';


export default function ImgSlider({photosPaths}) {

    const [slideImages] = useState(photosPaths?.split("<>"));
    /*
    <div>
            {photosPaths?.split("<>").map((photo, index) =>(
                <img src={photo} alt="PostImg" />
            ))}
        </div>
    */

    const properties = {
        indicators: true,
        autoplay: false,
        duration: 0,
        transitionDuration: 500,
        easing: "ease-out"
        };
    


    return (
        <Slide easing="ease" {...properties}>
            {slideImages?.map((photo, index) =>(
                <div className="each-slide"  key={index}>
                    <div style={{'backgroundImage': `url(${photo})`}}>
                    </div>
                </div>
            ))}
        </Slide>
    )
}

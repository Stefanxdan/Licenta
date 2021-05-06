import React from 'react'

export default function PostProprieties({post}) {

    const propName = ["Location","Type", "Bedrooms", "Bathrooms", "Surface Built", "Surface Useful", "Building Year", "Floor Position", "Total Floors of Building", "Condition", "Partitioning"]
    const propValue = [post?.cityLabel, post?.type, post?.bedrooms, post?.bathrooms, post?.surfaceBuilt, post?.surfaceUseful, post?.buildingYear, post?.floorPosition, post?.floorsBuilding, post?.condition, post?.partitioning]
    return (
        <div className="post-prop-container">
            <div className="post-prop">
                For: <b>{post?.forRent ? "Rent" : "Buying"}</b>
            </div>
            {
                propName.map((prop,index) =>
                    { return propValue[index] ?
                        (<div className="post-prop" key={index}>
                            {prop}: <b>{propValue[index]}</b>
                        </div>)
                    : null
                    }
                )
            }
        </div>
    )
}

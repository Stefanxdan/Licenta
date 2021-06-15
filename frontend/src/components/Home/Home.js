import React from 'react'
import "./Home.css"
import PricePrediction from './PricePrediction'

export default function Home() {

    //console.log(stats)

    return (
        <div className="HomePage">
            <div className="block1">
                <div className="hp-title">Find the right price</div>
                <div className="hp-subtitle">Are you looking for a place to stay or do you have a place for rent?</div>
            </div>
            <PricePrediction/>
        </div>
    )
}

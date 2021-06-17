import React, {useState} from 'react'
import {columnsStats, stats} from './Stats'
import {cities} from '../../assets/CitiesArray'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '20ch',
      },
    },
  }));
  


export default function PricePrediction() {
    const classes = useStyles();
    const [city, setCity] = useState("Centru");
    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);
    const [prediction, setPrediction] = useState(null)
    const [showStats, setShowStats] = useState(false)


    const handlePredictBtn = () =>{
        const getPrediction = async (body) =>{
        await axios.post('/Prediction', body)
        .then(response => { 
            let statsPrd = stats.find( s => s.Bedrooms === bedrooms && s.City_label=== city)
            if(statsPrd === undefined)
                statsPrd = {Bedrooms: bedrooms,
                    City_label: "Centru",
                    avgPrice: 0,
                    counter: 0,
                    deviation: 0,
                    maxPrice: 0,
                    minPrice: 0,}
            setPrediction([response.data?.price, response.data?.priceByCity, statsPrd])
        })
        .catch(error => {
            console.log(error?.response?.status + " " + error?.response?.statusText)
        });  
        }

        setShowStats(false)
        const body = {bedrooms, bathrooms, cityLabel: city}
        getPrediction(body)         
    }

    return (
        <div className="PricePrediction">
            <div className="PricePredictionInfo">
                    <div className="comp"/>
                    <div className="comp2">
                            <h3>What can you find on our website?</h3>
                        <h5>Our website is binding all ads from other website so you can find the perfect rent.
                             Don't hesitate to check the map of neighbourhoods to make your search faster and easier.</h5>
                             <h3>How do we predict the price?</h3>
                        <h5>Unlike the Tarot card reading, our prediction is based on 
                            Machine Learning Algorithm and rental ads from other websites.</h5>  
                    </div>
            </div>
            <h3>Price Prediction</h3>
            <div  className="PricePredictionContainer">
                <form className={classes.root} noValidate autoComplete="off"
                style={{backgroundColor:prediction ? "whitesmoke" : "white"}}>
                        <TextField
                        id="select-bedrooms"
                        select
                        label="Bedrooms number"
                        value={bedrooms}
                        onChange={(event) => { setBedrooms(event.target.value);}}
                        >
                        {[1,2,3,4,5].map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>

                        <TextField
                        id="select-bathrooms"
                        select
                        label="Bathrooms number"
                        value={bathrooms}
                        onChange={(event) => { setBathrooms(event.target.value);}}
                        >
                        {[1,2,3].map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>

                        <TextField
                        id="select-city"
                        select
                        label="Neighbourhood"
                        value={city}
                        onChange={(event) => { setCity(event.target.value);}}
                        >
                        {cities.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    <Button variant="contained" color="primary" className="predictBtn" onClick={handlePredictBtn}>Predict</Button>
                </form>
                {
                    !prediction ? 
                        <div className="prePrediction"/>
                    :
                        <div className="postPrediction">
                            <h5>Machine Learning</h5>
                            <div>Price by Bedrooms and Bathrooms : <strong>{prediction[0]}</strong></div>
                            <div>Price by Bedrooms, Bathrooms and Neighbourhood : <strong>{prediction[1]}</strong></div>
                            <h5 style={{marginTop:"2rem"}}>Statistics {prediction[2]?.Bedrooms} bedrooms, {prediction[2]?.City_label}</h5>
                            <div>Posts number : <strong>{prediction[2]?.counter}</strong></div>
                            <div> Average price: <strong>{prediction[2]?.avgPrice}</strong></div>
                            <span> Min price: <strong>{prediction[2]?.minPrice}</strong></span>
                            <span> Max price: <strong>{prediction[2]?.maxPrice}</strong></span>
                            <div> Standard deviation: <strong>{Number((prediction[2]?.deviation).toFixed(4))}</strong></div>
                            <h5>
                                <Button  variant="outlined" color="primary" className="predictBtn" onClick={() => setShowStats(true)}>More Stats</Button>
                            </h5>
                        </div>
                }
            </div>
            {
                showStats &&
                <div className="stats">
                    <DataGrid rows={stats.map((s,index) => s = {...s, id: index+1})} columns={columnsStats} pageSize={15} />
                </div>}
        </div>
    )
}
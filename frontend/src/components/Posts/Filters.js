import React from 'react'
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Filters({filters, setFilters, totalPosts}) {

    //const createSliderWithTooltip = Slider.createSliderWithTooltip;
    //const Range = createSliderWithTooltip(Slider.Range);

    function handleEditFilters(e){
        const {name, value} = e.target
        if(filters[name] === value){
            console.log("anulare")
            setFilters(prevState => ({
                ...prevState,
                [name]: null
            }));
        }
        else
            setFilters(prevState => ({
                ...prevState,
                [name]: value
            }));
    }


    function handlePriceEdit(e){
        setFilters(prevState => ({
            ...prevState,
            "PriceMin": e[0]
        }));
        setFilters(prevState => ({
            ...prevState,
            "PriceMax": e[1]
        }));

    }

    return (
        <div className="filters-container">
            Filters ({totalPosts})
            <div className="filters">
                <br/>
                <div>
                    <div>
                        <input type="radio" id="local" name="IsLocal" value="true"
                            checked={filters['IsLocal'] === "true"}
                            onChange={()=>{}}
                            onClick={handleEditFilters}
                            />
                        <label htmlFor="local">Local Posts</label>
                    </div>
                    <div>
                        <input type="radio" id="extern" name="IsLocal" value="false"
                            checked={filters['IsLocal'] === "false"}
                            onChange={()=>{}}
                            onClick={handleEditFilters}
                            />
                        <label htmlFor="extern">External Posts</label>
                    </div>
                </div>
                <br/>
                <div>
                    <div>
                        <input type="radio" id="rent" name="ForRent" value="true"
                            checked={filters['ForRent'] === "true"}
                            onChange={()=>{}}
                            onClick={handleEditFilters}
                            />
                        <label htmlFor="rent">Rent</label>
                    </div>
                    <div>
                        <input type="radio" id="buy" name="ForRent" value="false"
                            checked={filters['ForRent'] === "false"}
                            onChange={()=>{}}
                            onClick={handleEditFilters}
                            />
                        <label htmlFor="buy">Buy</label>
                    </div>
                </div>
                <br/>
                <div>
                    <div>
                    Price:
                    </div>
                    <span>
                        {filters['PriceMin'] ?? 0}
                    </span>
                    <span>
                        ==
                    </span>
                    <span>
                        {filters['PriceMax'] ?? 1000}
                    </span>
                    <Range onAfterChange={handlePriceEdit}
                        min={0}
                        max={1000}
                        step={10}
                        defaultValue={[0,1000]}
                        />
                </div>
                <br/>
                <div>
                    <select id="CityLabel" name="CityLabel" onChange={handleEditFilters}>
                        <option value=""> all cities </option>
                        <option value="">Iasi</option>
                    </select>
                </div>
                <br/>
                <div>
                    <select id="Type" name="Type" onChange={handleEditFilters}>
                        <option value=""> all types </option>
                        <option value="apartament">apartament</option>
                        <option value="house">house</option>
                    </select>
                </div>
                <br/>
                <div>
                    <select id="Partitioning" name="Partitioning" onChange={handleEditFilters}>
                        <option value=""> all partitionings </option>
                        <option value="decomandat">decomandat</option>
                        <option value="semidecomandat">semidecomandat</option>
                        <option value="nedecomandat">nedecomandat</option>
                        <option value="circular">circular</option>
                    </select>
                </div>
                <br/>
                <div>
                Bedrooms
                    <select id="Bedrooms" name="Bedrooms" onChange={handleEditFilters}>
                        <option value=""> number </option>
                        {Array.from({length: 10}, (_, i) => i + 1).map(number =>
                            (<option key={number} value={number}>{number}</option>))}
                    </select>
                </div><br/>
                <div>
                Bathrooms
                    <select id="Bathrooms" name="Bathrooms" onChange={handleEditFilters}>
                        <option value=""> number </option>
                            {Array.from({length: 4}, (_, i) => i + 1).map(number =>
                                (<option key={number} value={number}>{number}</option>))}
                    </select>
                </div>
            </div>
        </div>
    )
}

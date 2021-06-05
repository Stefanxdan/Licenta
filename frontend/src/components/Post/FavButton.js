import React, {useState, useEffect} from 'react'
import { useAuth } from "../../contexts/authcontext"
import axios from 'axios'


export default function FavButton({postId}) {

    const {currentUser} = useAuth()
    const [isFav, setisFav] = useState(false)


    useEffect(() => {
        const fetchFavPost = async () =>{
            await axios.get(`/Users/favoritePosts`)
            .then(response => { 
                if(response.data.some(post => post.id === postId))
                    setisFav(true)
            })
            .catch(error => {});
        }


        if(currentUser)
            fetchFavPost()
    }, [currentUser,postId])


    const AddFavCall = async () =>{
        await axios.post(`/Users/favoritePosts/${postId}`)
        .then(response => { 
            if(response.data.some(post => post.id === postId))
                setisFav(true)
        })
        .catch(error => {});
    }

    const RemoveFavCall = async () =>{
        await axios.delete(`/Users/favoritePosts/${postId}`)
        .then(response => { 
            if(response.data.some(post => post.id === postId))
                setisFav(true)
        })
        .catch(error => {});
        
    }

    const SetFavButtonHandle = () =>{
        setisFav(true)
        AddFavCall()
    }

    const SetUnFavButtonHandle = () =>{
        setisFav(false)
        RemoveFavCall()
    }

    return (
        <>
        {
            isFav ?
            <i className="fav-btn fas fa-heart" onClick={SetUnFavButtonHandle}/>
            :
            <i className="fav-btn far fa-heart" onClick={SetFavButtonHandle}/>
        }
        </>
    )
}

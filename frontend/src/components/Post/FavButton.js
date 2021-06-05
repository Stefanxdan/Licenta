import React, {useState, useEffect} from 'react'
import { useAuth } from "../../contexts/authcontext"
import  { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


export default function FavButton({postId}) {

    const {currentUser} = useAuth()
    const [isFav, setisFav] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);


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
        if(!currentUser)
            setDialogOpen(true)
        await axios.post(`/Users/favoritePosts/${postId}`)
        .then(() => {
            setisFav(true)
        })
        .catch(error => {});
    }

    const RemoveFavCall = async () =>{
        await axios.delete(`/Users/favoritePosts/${postId}`)
        .then(() => {
            setisFav(false)
        })
        .catch(error => {});
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
      };

    return (
        <>
        {
            isFav ?
            <i className="fav-btn fas fa-heart" onClick={RemoveFavCall}/>
            :
            <i className="fav-btn far fa-heart" onClick={AddFavCall}/>
        }
        <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You have to logged on for this actio
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary">
                    <Link to='/login' > Log in </Link>
                </Button>
                <Button onClick={handleCloseDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';



export default function PostCard(props) {

    const history = useHistory()
    const [post, setPost] = useState(props.post);
    const [dialogDeletePostOpen, setDialogDeletePostOpen] = useState(false);

    function DeletePost(){
        const deleteAsync = async () =>{
            let path =""
            if( props.editable)
                path = `/Posts/${post.id}`
            else
            path = `/Users/favoritePosts/${post.id}`

            await axios.delete(path)
            .then(response => { 
                console.log(response.data)
                setPost(null)
                window.location.reload();
            })
            .catch(error => {
                console.log(error.data)
            });
        }

        deleteAsync()
    }

    if( !post )
        return(<></>)
    return (
        <div className="flex post-card">
        <Link to={`/posts/${post?.id}`} className="card-LinkTo" style={{flexGrow:1}}>
            <div className="card-container">
                <div className="img-container">
                    {
                        post?.isLocal ?
                        <img src={`http://localhost:5000/Resources/Images/${post?.id}/1.png`} alt="PostImg"/>
                        :
                        <img src={post?.photosPaths?.split("<>")[0]} alt="PostImg"/>
                    }
                </div>
                <span className="card-info-container">
                    <div className='card-title'>{post.title}</div>
                    <div className="card-small-container">
                        <div className='card-infos'>
                            <div>{post.bedrooms} bedrooms</div>
                            <div>{post.bathrooms} bathrooms</div>
                            <div>{post.surfaceUseful} m^2</div>
                            <div>{post.cityLabel}</div>
                        </div>
                        <div className='card-price'>{post.price}{post.currency==="EUR" ? "€" : post.currency}</div>
                    </div>
                </span> 
                
                
            </div>
            </Link>
            {props.deletable &&
                <div className="card-buttons">
                    {props.editable &&
                        <button className="icon-button" onClick={() => {history.push(`/posts/edit/${post.id}`)}}>
                            <i className="far fa-edit fa-2x"></i>
                        </button>
                    }
                    <button className="icon-button" onClick={() =>setDialogDeletePostOpen(true)}>
                            <i className="far fa-trash-alt fa-2x"></i>
                    </button>
                </div>
            }
             <Dialog
            open={dialogDeletePostOpen}
            onClose={() => setDialogDeletePostOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="dialog-title">Delete {props.editable || "Favorite"} Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action is permenant. Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setDialogDeletePostOpen(false)} color="primary">
                        Close
                    </Button>
                    <Button variant="contained" onClick={() => DeletePost()} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { IconButton, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios'



export default function Users({users}) {

    const pageSize = 5;

    const renderUserButton = (params) => {
        if( params.row.role === "Admin")
            return null
        return (
            <strong>
                <IconButton color="primary" aria-label="info"
                    onClick={() => {
                        setInfoDialog(params.row)
                        setDialogUserOpen(true)
                    }}
                    >
                        <i className="fas fa-info-circle"/>
                </IconButton>
                <IconButton color="primary" aria-label="posts"
                    onClick={() => {
                        setPostsUser(params.row)
                    }}
                    >
                        <i className="fas fa-table"/>
                </IconButton>
                <IconButton color="secondary" aria-label="delete"
                    onClick={() => {
                        setInfoDialog(params.row)
                        setDialogDeleteUserOpen(true)
                    }}>
                        <i className="fas fa-trash-alt"/>
                </IconButton>
            </strong>
        )
    }

    const renderPostButton = (params) => {
        return (
            <strong>
                <IconButton color="primary" aria-label="info"
                onClick={() => {
                    setInfoDialog(params.row)
                    setDialogPostOpen(true)
                }}
                >
                    <i className="fas fa-info-circle"></i>
                </IconButton>
                <IconButton color="secondary" aria-label="delete"
                onClick={() => {
                    setInfoDialog(params.row)
                    setDialogDeletePostOpen(true)
                }}>
                    <i className="fas fa-trash-alt"></i>
                </IconButton>
            </strong>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'role', headerName: 'Role', width: 120 },
        { field: 'username', headerName: 'Username', width: 180 },
        { field: 'email',  headerName: 'Email',  width: 200, sortable:false,},
        { field: 'timeAdded', headerName: 'Time Added',  width: 220},
        { field: 'postsNumber', headerName: 'Posts no.',  width: 145},
        {
            field: 'action',
            headerName: 'Action',
            width: 180,
            renderCell: renderUserButton,
            sortable:false,
        }
        ];
    const postColumns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'price', headerName: 'Price', width: 120,},
        { field: 'cityLabel', headerName: 'City Label', width: 200 },
        { field: 'bedrooms', headerName: 'Bedrooms', width: 155},
        { field: 'bathrooms', headerName: 'Bathrooms', width: 160},
        { field: 'surfaceUseful', headerName: 'Surface', width: 130,},
        { field: 'timeAdded', headerName: 'Time Added',  width: 165},
        {
            field: 'action',
            headerName: 'Action',
            sortable:false,
            width: 145,
            renderCell: renderPostButton
        }
    ]

    const deleteUserAsync = async (userId) =>{
        await axios.delete(`/Users/${userId}`)
        .then(response => { 
            console.log(response.data)
            setDialogDeleteUserOpen(false)
            window.location.reload();
        })
        .catch(error => {
            console.log(error.data)
        });
    }

    const deletePostAsync = async (postId) =>{
        await axios.delete(`/Posts/${postId}`)
        .then(response => { 
            console.log(response.data)
            setDialogDeletePostOpen(false)
            window.location.reload();
        })
        .catch(error => {
            console.log(error.data)
        });
    }

    const [infoDialog, setInfoDialog] = useState(null)
    const [postsUser, setPostsUser] = useState(null)
    const [posts, setPosts] = useState(null)

    const [dialogDeleteUserOpen, setDialogDeleteUserOpen] = useState(false);
    const [dialogDeletePostOpen, setDialogDeletePostOpen] = useState(false);
    const [dialogUserOpen, setDialogUserOpen] = useState(false);
    const [dialogPostOpen, setDialogPostOpen] = useState(false);

    useEffect(() => {
        const fetchPosts = async () =>{
            await axios.get(`/Posts/user/${postsUser?.id}`)
            .then(response => { 
                setPosts(response.data);
            })
            .catch(error => {
                if(error?.response?.status)
                    console.log(error?.response?.status + " " + error?.response?.statusText)
                else
                    console.log("ERR_CONNECTION_REFUSED")
            });
        }
        if(postsUser)
            fetchPosts();

   }, [postsUser])


    return (
        <div className="admin-users">
            <h2>Users</h2>
            {users &&
                <div style={{ height:  Math.min(pageSize,users?.length)*52+130, width: '100%', backgroundColor: 'white' }}>
                    <DataGrid rows={users} columns={columns} pageSize={pageSize}/>
                </div>
            }
            {
                postsUser && 
                <>
                    <h2>Posts from {postsUser.username}</h2>
                    {
                        posts &&
                        <div style={{ height: Math.min(2*pageSize,posts.length)*52+130, width: '100%', backgroundColor: 'white' }}>
                                <DataGrid rows={posts} columns={postColumns} pageSize={2*pageSize}/>
                        </div>
                    }
                </>
            }

        <Dialog
            open={dialogDeleteUserOpen}
            onClose={() => setDialogDeleteUserOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="dialog-title">Delete user {infoDialog?.username}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action is permenant.
                </DialogContentText>
                <DialogContentText>
                     Are you sure you want to delete this account and all his posts?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => setDialogDeleteUserOpen(false)} color="primary">
                    Close
                </Button>
                <Button variant="contained" onClick={() => deleteUserAsync(infoDialog.id)} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={dialogDeletePostOpen}
            onClose={() => setDialogDeletePostOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="dialog-title">Delete Post {infoDialog?.id}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action is permenant. Are you sure you want to delete this post?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => setDialogDeletePostOpen(false)} color="primary">
                    Close
                </Button>
                <Button variant="contained" onClick={() => deletePostAsync(infoDialog.id)} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={dialogUserOpen}
            onClose={() => setDialogUserOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="dialog-title">More info</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {infoDialog && Object.keys(infoDialog)?.map(key=>(
                        <span className="flex" key={key}>
                            <span style={{width:"200px"}}>{key}:</span>
                            <span >{infoDialog[key]}</span>
                        </span>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogUserOpen(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            fullScreen open={dialogPostOpen}
            onClose={() => setDialogPostOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="dialog-title">More info</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {infoDialog && Object.keys(infoDialog)?.map(key=>(
                        <span className="flex" key={key}>
                            <span style={{width:"200px",paddingRight:"20px"}}>{key}:</span>
                            <span >{
                                key!=="photosPaths" ?
                                    infoDialog[key]
                                    :
                                    infoDialog[key].replaceAll("<>","\n")
                            }</span>
                        </span>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogPostOpen(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

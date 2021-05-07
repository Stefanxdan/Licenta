import React, {useEffect, useState} from 'react'
import { useAuth } from "../../contexts/authcontext"
import {useHistory } from 'react-router-dom'
import AccountCard from "./AccountCard"
import MyPostsCard from "./MyPostsCard"
import FavPostsCard from "./FavPostsCard"
import axios from 'axios'
import "./Account.css"

export default function Account() {
    const [user, setUser] = useState();
    const [myPost, setMyPost] = useState();
    const [err, setErr] = useState();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const { currentUser, logout } = useAuth()
    const history = useHistory()


    useEffect(() => {
        const fetchUser = async () =>{
            setLoading(true);
            await axios.get(`/Users/${currentUser?.id}`)
            .then(response => { 
                setUser(response.data);
            })
            .catch(error => {
                if(error?.response?.status)
                    setErr(error?.response?.status + " " + error?.response?.statusText)
                else
                    setErr("ERR_CONNECTION_REFUSED")
            });
            setLoading(false);
        }

        const fetchPosts = async () =>{
            setLoading2(true);
            await axios.get(`/Posts/user/${currentUser?.id}`)
            .then(response => { 
                setMyPost(response.data);
            })
            .catch(error => {
                if(error?.response?.status)
                    setErr(error?.response?.status + " " + error?.response?.statusText)
                else
                    setErr("ERR_CONNECTION_REFUSED")
            });
            setLoading2(false);
        }
        
        setTimeout(() => {fetchUser()},500);
        setTimeout(() => {fetchPosts()},500);
    }, [currentUser?.id])

    function handleLogout(){
        setErr("")
        logout()
        history.push('/login')
    }

    return (
        <div className="account-page">
            {(loading && loading2) ? (
                <div className="loading-spiner-container">
                    <i className="loading-spiner fas fa-spinner fa-pulse"></i>
                </div>
            ): err ? (
               <div className="err-response">{err}</div>
            ):
            <div className="account-page-inner">
                <AccountCard user={user} handleLogout={handleLogout}/>
                <div className="flex-wrap" style={{justifyContent:' space-between'}}>
                    <MyPostsCard  myPost={myPost}/>
                    <FavPostsCard />
                </div>
            </div>
            }
        </div>
    )
}

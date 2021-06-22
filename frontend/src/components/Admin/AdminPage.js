import React, { useState, useEffect } from 'react'
import { useAuth } from "../../contexts/authcontext"
import {useHistory } from 'react-router-dom'
import AdminCard from './AdminCard'
import Users from './Users'
import axios from 'axios'
import "./admin.css"



export default function AdminPage() {

    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const [users, setUsers] = useState();
    const [displayPosts, setDisplayPosts] = useState(false);

    const [err, setErr] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if(currentUser.role !== "Admin")
             history.push('/')

             const fetchUsers = async () =>{
                setLoading(true);
                await axios.get(`/Users`)
                .then(response => {
                    setUsers(response.data);
    
                })
                .catch(error => {
                    if(error?.response?.status)
                        setErr(error?.response?.status + " " + error?.response?.statusText)
                    else
                        setErr("ERR_CONNECTION_REFUSED")
                });
                setLoading(false);
            }
    
            fetchUsers();
        return () => (setUsers(null))
    }, [currentUser, history])

    function handleLogout(){
        setErr("")
        logout()
        history.push('/login')
    }

    return (
        <>
        {
            currentUser.role === "Admin" &&
            <div className="account-page">
                {(loading) ? (
                    <div className="loading-spiner-container">
                        <i className="loading-spiner fas fa-spinner fa-pulse"></i>
                    </div>
                ): err ? (
                <div className="err-response">{err}</div>
                ):
                <div className="account-page-inner">
                    <AdminCard handleLogout={handleLogout} setDisplayPosts={setDisplayPosts}/>
                    <Users users={users} editable={false} deletable={true} notDisplay={displayPosts}/>
                </div>
                }
            </div>
        }
        </>
    )
}

import React from 'react'
import { useAuth } from "../contexts/authcontext"

export default function Home() {

    const {currentUser} = useAuth()

    return (
        <div>
            Home
            {currentUser && <div>{currentUser.username}</div>}
        </div>
    )
}

import React from 'react'

export default function AdminCard({postsNumber, usersNumber, handleLogout, setDisplayPosts}) {
    return (
        <div className="account-card">
            <h3 className="account-item">
                <span className="account-item account-icons">
                    <strong>Admin Page</strong>
                </span>
                <span className="account-item account-icons">
                    <i className="fas fa-sign-out-alt fa-lg" onClick={handleLogout}></i>
                </span>
            </h3>
        </div>
    )
}

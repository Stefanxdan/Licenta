import React from 'react'

export default function AccountCard({user,handleLogout}) {

    return (
        <div className="account-card">
            <div>
                <h3 className="account-item">
                    <span className="account-item account-icons">
                        Welcome to your account: <strong>{user?.username}</strong>
                    </span>
                    <span className="account-item account-icons">
                        <i className="fas fa-user-edit fa-lg"></i>
                        <i className="fas fa-sign-out-alt fa-lg" onClick={handleLogout}></i>
                    </span>
                </h3>

            </div>
            <div className="flex-wrap">
                <div className="account-item">
                    <div className="detail">
                    <strong>First Name:</strong> {user?.firstName}
                    </div>
                    <div className="detail">
                    <strong>Last Name:</strong> {user?.lastName}
                    </div>
                </div>
                <div className="account-item">
                    <div  className="detail">
                    <strong>Email:</strong> {user?.email}
                    </div>
                    <div  className="detail">
                    <strong>Phone:</strong> {user?.phoneNumber}
                    </div>
                </div>
            </div>
        </div>
    )
}

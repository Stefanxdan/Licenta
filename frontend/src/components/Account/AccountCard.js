import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function AccountCard({user,setUser,handleLogout}) {

    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [err, setErr] = useState(false);
    const history = useHistory()



    const onSubmit = (data) => {
        const updateUser = async () =>{
            await axios.put(`/Users/${user?.id}`,data)
            .then(response => { 
                setEditMode(false)
                const newUser = {
                    username: user.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber
                }
                setUser(newUser)

            })
            .catch(error => {
                console.log("Er");
                if(error?.response?.status)
                    setErr(error?.response?.status + " " + error?.response?.statusText)
                else
                    history.push("/account")
            });
        }
        updateUser();
    }
    
    return (
            
        <div className="account-card">
            {editMode ? 
            <>
                <div>
                    <h3 className="account-item">
                        <span className="account-item account-icons">
                            Edit your profile: <strong>{user?.username}</strong>
                        </span>
                        <span className="account-item account-icons">
                            <div className="green">
                                <i className="fas fa-check-circle fa-lg"></i>
                                <i className="far fa-check-circle fa-lg"></i>
                                <i className="fas fa-check-square fa-lg"></i>
                                <i className="far fa-check-square fa-lg" />
                                <button className="icon-button" form="updateUser" type="submit">
                                    <i className="fas fa-check" />
                                </button>
                            </div>
                            <div className="red">
                                <i className="fas fa-times-circle fa-lg" onClick={() => setEditMode(false)}></i>
                                <i className="far fa-times-circle fa-lg" onClick={() => setEditMode(false)}></i>
                                <i className="fas fa-window-close fa-lg" onClick={() => setEditMode(false)}></i>
                                <i className="far fa-window-close fa-lg" onClick={() => setEditMode(false)}></i>
                                <i className="fas fa-times" onClick={() => setEditMode(false)}></i>
                            </div>
                        </span>
                    </h3>
                    <form id="updateUser" className="flex-wrap" onSubmit={handleSubmit(onSubmit)}>
                        <div className="account-item">
                            <div className="detail">
                                <label htmlFor="fname">
                                    <strong>First Name:</strong>
                                </label>
                                <input type="text" id="fname" name="fname" defaultValue={user?.firstName} {...register("firstName", { required:"First Name required" })}/>
                                {errors.firstName && <p>{errors.firstName.message}</p>}
                            </div>
                            <div className="detail">
                                <label htmlFor="lname">
                                    <strong>Last Name:</strong>
                                </label>
                                <input type="text" id="lname" name="lname" defaultValue={user?.lastName} {...register("lastName", { required:"Last Name required" })} />
                                {errors.lastName && <p>{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className="account-item">
                            <div  className="detail">
                                <label htmlFor="email">
                                    <strong>Email:</strong> 
                                </label>
                                <input type="text" id="email" name="email" defaultValue={user?.email} {...register("email", { required:"Emai required" })} />    
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>
                            <div  className="detail">
                                <label htmlFor="phone">
                                    <strong>Phone:</strong> 
                                </label>
                                <input type="text" id="phone" name="phone" defaultValue={user?.phoneNumber} {...register("phoneNumber")} />  
                            </div>
                        </div>
                    </form >
                    {
                        err && (
                            <div className="err-response">{err}</div>
                        )
                    }
                    
                </div>
                
            </> 
            :
            <>
                <div>
                    <h3 className="account-item">
                        <span className="account-item account-icons">
                            Welcome to your account: <strong>{user?.username}</strong>
                        </span>
                        <span className="account-item account-icons">
                            <i className="fas fa-user-edit fa-lg" onClick={() => setEditMode(true)}></i>
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
            </>
        }
        </div>
    )
}

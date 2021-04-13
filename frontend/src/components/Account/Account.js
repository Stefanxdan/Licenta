import React, {useState} from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../../contexts/authcontext"
import { Link, useHistory } from 'react-router-dom'


export default function Account() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    function handleLogout(){
        setError("")
        logout()
        history.push('/login')
    }

    return (
        <Container
            className="d-flex align-items-flex-start justify-content-center mt-5" 
            style={{ minHeight: "100vh"}}
        >   
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <h2 className="text-center">Account</h2>
                        <h2 className="text-center mb-4">-{currentUser?.username}-</h2>
                        
                        <div>
                        <strong>Email:</strong> {currentUser?.email}
                        </div>
                        <div>
                        <strong>FirstName:</strong> {currentUser?.FirstName}
                        </div>
                        <div>
                        <strong>LastName:</strong> {currentUser?.LastName}
                        </div>

                        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile</Link>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </Container>
    )
}

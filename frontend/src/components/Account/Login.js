import React, {useRef, useState, useEffect} from 'react'
import { Card, Button, Form, Container, Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "../../contexts/authcontext"
import axios from 'axios'


export default function Login() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault();

        try{
            setError("")
            setLoading(true)
            await login(usernameRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to sign in")
        }

        setLoading(false)
    }
    
    useEffect(() => {
        const source = axios.CancelToken.source()
        return () => {
            source.cancel()
        }
      }, []);

    return (
        <Container
            className="d-flex align-items-flex-start justify-content-center mt-5" 
            style={{ minHeight: "100vh"}}
        >
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log in</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" ref={usernameRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">
                                Log in
                            </Button>
                        </Form>
                        <div className='w-100 text-center mt-3'>
                            <Link to="/forgot-password"> Forgot password?</Link>
                        </div >
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to="/signup"> Sign Up</Link>
                </div >
                
            </div>
        </Container>
    )
}

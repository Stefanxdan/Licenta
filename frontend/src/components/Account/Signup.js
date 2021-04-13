import React, {useRef, useState, useEffect} from 'react'
import { Card, Button, Form, Container, Alert} from 'react-bootstrap'
import { useAuth } from "../../contexts/authcontext"
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'




export default function Signup() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault();

        if( passwordRef.current.value !==
            passwordConfirmRef.current.value){
                return setError("Passwords do not match")
            }

        try{
            setError("")
            setLoading(true)
            await signup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create")
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
                        <h2 className="text-center mb-4">Sign up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group id="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" ref={usernameRef} required />
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </Container>
    )
}

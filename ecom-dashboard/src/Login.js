import Header from './Header'
import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/add")
        }
    }, [])

    async function login() {
        let item = { password, email }
        
        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        result = await result.json()

        if (result.success == true) {
            localStorage.setItem("user-info", JSON.stringify(result))
            navigate("/add")
        }
        else {
            alert('invalid credentials');
        }
    }

    return (

        <>
            <Header />
            <div className="col-sm-4 offset-sm-4">
                <h1>Login</h1>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                <br />
                <button onClick={login} className="btn btn-primary">Login</button>
            </div>
        </>
    )
}

export default Login
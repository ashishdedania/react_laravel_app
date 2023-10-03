import React,{useState,useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import Header from './Header'

function Register()
{
    useEffect(() => {
        if(localStorage.getItem('user-info'))
        {
            navigate("/add")  
        }
    },[])
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const navigate =useNavigate();

    async function signup()
    {
        let item = {name,password,email}
        //console.warn()
        let result = await fetch("http://localhost:8000/api/register",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",
                "Accept" : "application/json"
            }
        })

        result = await result.json()
        localStorage.setItem("user-info",JSON.stringify(result))
        navigate("/add")
    }

    return (

        <>
        <Header />
        <div className="col-sm-6 offset-sm-3">
            <h1>Sign up</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name" />
            <br />
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email" />
            <br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" />
            <br />
            <button onClick={signup} className="btn btn-primary">Sign Up</button>
        </div>
        </>
    )
}

export default Register
import React, { useState,useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const SignIn = () => {
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loggedIn = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
           return  M.toast({html: 'Invalid Email',classes:"#c62828 red darken-3"})
        }
        fetch('/signin', {
            method: 'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else
            {
                const {name}=data.user
                M.toast({html:`Welcome ${name}`,classes:"#1b5e20 green darken-4"})
                localStorage.setItem("jwt","Bearer "+data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                history.push('/')
            }
        })
    }

    return (
        <div className='mycard'>
            <div className="card auth-card nput-field">
                <h2>Instagram</h2>
                <input
                    type='text'
                    placeholder='email'
                    onChange={(e) => { setEmail(e.target.value) }}
                />

                <input
                    type='password'
                    placeholder='password'
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button className="btn waves-effect blue lighten-2" onClick={loggedIn}>SignIn
                </button>
                <h5>
                    <Link to='/signup'> Don't have account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignIn


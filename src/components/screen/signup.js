import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SignUp = () => {
    const history=useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)

    useEffect(() => {
        if(url)
        {
            uploadfields()
        }
    }, [url])

    const postData=()=>{
       if(image)
       {
        uploadPic()
       }
       else
       {
        uploadfields() 
       }
    }
    const uploadfields=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
           return  M.toast({html: 'Invalid Email',classes:"#c62828 red darken-3"})
        }
        fetch("/signup",{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>
            {
                if(data.error)
                {
                    M.toast({html: data.error,classes:"#c62828 red darken-3"})
                }
                else 
                {
                    M.toast({html:data.message,classes:"#1b5e20 green darken-4"})
                    history.push('/signin')
                }
            })
            .catch(err=>{console.log(err);})
    }
    const uploadPic = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'insta-clone')
        data.append('cloud_name', 'suryainsta')
        fetch('https://api.cloudinary.com/v1_1/suryainsta/image/upload', {
            method: 'post',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            }
            )
    }
    return (
        <div className='mycard'>
            <div className="card auth-card nput-field">
                <h2>Instagram</h2>
                <input
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                    <input
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                 <div className="file-field input-field">
                    <div className="btn blue lighten-2">
                        <span>Upload Pic</span>
                        <input type="file"
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>

                </div>

                <button className="btn waves-effect blue lighten-2" onClick={postData}>SignUp
                </button>
                <h5> 
                    <Link to='/signin'> Already have an Account?</Link>
                </h5>

            </div>
        </div>
    )
}

export default SignUp


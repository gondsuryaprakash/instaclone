import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const [data, setData] = useState([])
    const userName = JSON.parse(localStorage.getItem('user')).name
    const { state, dispatch } = useContext(UserContext)
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)

    useEffect(() => {
        
        fetch('/mypost', {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(data => {
                setData(data.mypost)
            })

    }, [])
    
    useEffect(() => {
        if(image)
        {
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
                    console.log(data);
                    setUrl(data.url)
                    localStorage.setItem('user',JSON.stringify({...state,pic:data.url}))
                    dispatch({type:"UPDATEPIC",payload:data.url})
                    console.log('data.url',data.url);
                    fetch('/updatepic',{
                        method: 'put',
                        headers: {
                            "Content-Type":"application/json",
                            "Authorization": localStorage.getItem("jwt")
                        },
                        body:JSON.stringify({
                            pic:data.url
                        })
                    })
                    .then(res=>res.json())
                    .then(results=>{
                        console.log(results);
                    })

                }
                )
        }
    }, [image])

    console.log("state=>", state);


    const uploadPic = (file) => {
        setImage(file)
       
    }

    return (
        <div style={{ maxWidth: '550px', margin: "0px auto" }}>
            <div style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",

                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: '80px' }}
                            src={state ? state.pic : "loading"} />
                    </div>

                    <div>
                        <h4>{state ? state.name : 'loading..'}</h4>
                        <h5>{state ? state.email : 'loading..'}</h5>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "108%"
                        }}>
                            <h5>{data.length} Posts</h5>
                            <h5>{state ? state.followers.length : "0"} followers</h5>
                            <h5>{state ? state.following.length : "0"} following</h5>
                        </div>
                    </div>
                </div>
                <div className="file-field input-field">
                    <div className="btn blue lighten-2">
                        <span>Update Profile</span>
                        <input type="file"
                            onChange={(e) => {
                                uploadPic(e.target.files[0])
                            }} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>

                </div>





            </div>


            <div className="gallery">
                {
                    data.map(item => {
                        const { photo, _id } = item
                        return (
                            <img key={_id} className='item' src={photo} />
                        )

                    })
                }


            </div>
        </div>
    )
}

export default Profile

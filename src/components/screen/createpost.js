import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')
    const history=useHistory()
    const creatpost = (url) => {
        fetch('/createpost', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                body,
                photo: url
            })

        })
            .then(result => {
                result.json()
            })
            .then(data => {
                if (data && data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    console.log(data.error);
                }
                else{
                    M.toast({html:"Post updated successfully",classes:"#1b5e20 green darken-4"})
                    history.push('/')
                }

            })
            .catch(err => {
                M.toast({ html: err, classes: "#c62828 red darken-3" })
                console.log(err);
            })
    }
    const postDetails = () => {
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
                creatpost(data.url)
            }
            )

           



    }

    return (

        <div>
            <div className='card input-filed' style={{
                margin: '30px auto',
                maxWidth: '500px',
                padding: '20px',
                textAlign: 'center'
            }}>
                <input
                    type="text"
                    placeholder='title'
                    onChange={(e) => { setTitle(e.target.value) }}
                ></input>
                <input
                    type="text"
                    placeholder='body'
                    onChange={(e) => { setBody(e.target.value) }}
                >
                </input>

                <div className="file-field input-field">
                    <div className="btn blue lighten-2">
                        <span>Upload Image</span>
                        <input type="file"
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>

                </div>
                <button className="btn waves-effect blue lighten-2" onClick={postDetails}>Submit Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost
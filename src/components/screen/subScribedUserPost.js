import React, { useState, useEffect, useContext } from 'react'
import HomeCard from '../utils/homeCard'
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'

const SubscribedHome = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const likePost = (id) => {
        fetch('/like',
            {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    postId: id
                })

            })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const unlikePost = (id) => {
        fetch('/unlike',
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    postId: id
                })
            })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetch('/subpost', {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data.posts)
            })

    }, [])


    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text,
                postId

            })

        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deletePost = (postId) => {
        fetch(`/deletepost/${postId}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.filter(el => {
                    return el._id !== result._id
                })
                setData(newData)
            })
    }

    const deleteComment = (commentId) => {
        fetch(`/deletecomment/${commentId}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(res => { res.json() })
            .then(result => {
                console.log(result);
                // const newData = data.map(el => {
                //     const { comments } = el
                    
                //     comments.filter(com => {
                //         console.log('com==>',com._id);
                //         return com._id !== result._id
                //     })
                   
                // })

               // setData(newData)



            })
    }



    console.log("state=>",state);
    return (

        <div className='home'>
            {
                data.map(item => {
                    const { _id, title, body, photo, postedBy, likes, comments } = item
                    console.log(likes);
                    const { name } = postedBy
                    return (
                        <div className='card home-card' key={_id}>
                            <h5 style={{padding:'6px'}}><Link to={state._id.toString() !== postedBy._id.toString()?`/profile/${postedBy._id}`:`/profile`}>{name}</Link>
                                {
                                    state._id.toString() === postedBy._id.toString()
                                    &&
                                    <i className="material-icons" style={{ float: 'right' }} onClick={() => deletePost(_id)}>delete</i>}
                            </h5>


                            <div className='card-image'>
                                <img
                                    src={photo} />
                            </div>
                            <div className='card-content'>
                                <i className="material-icons" style={{ color: 'red' }}>favorite</i>
                                {likes.includes(state._id)
                                    ?
                                    <i style={{ pointerEvents: 'auto' }} className="material-icons" onClick={() => unlikePost(_id)}>thumb_down</i>
                                    :
                                    <i className="material-icons" onClick={() => likePost(_id)}>thumb_up</i>

                                }
                                <h6>{likes.length} likes</h6>
                                <h6>{title}</h6>
                                <p>{body}</p>
                                {
                                    comments.map(records => {
                                       
                                        console.log(records.postedBy.name);
                                        console.log(`commentId ${records._id}`);
                                        return (
                                            <h6 key={records._id}><span style={{ fontWeight: 500 }}>{records.postedBy.name} </span> {records.text} <span>  {
                                                state._id.toString() === records.postedBy._id.toString()
                                                &&
                                                <i className="material-icons" style={{ float: 'right' }} onClick={() => deleteComment(_id)}>delete</i>}</span></h6>
                                        )
                                    })

                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, _id)
                                    e.target[0].value = ''

                                }}>
                                    <input type='text' placeholder='add a comment'></input>
                                </form>

                            </div>

                        </div>
                    )
                })
            }


        </div>
    )
}

export default SubscribedHome
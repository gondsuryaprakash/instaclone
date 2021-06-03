import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const [data, setData] = useState(null)
   

    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    const [showFollow, setshowFollow] = useState(state?!state.following.includes(userid):true)
    console.log(userid);

    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log('data=>', result);
                setData(result)
            })

    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                followId: userid
            })
        })
            .then(res => res.json())
            .then(result => {

                dispatch({ type: "UPDATE", payload: { following: result.following, followers: result.followers } })
                localStorage.setItem("user", JSON.stringify(result))
                setData((prevState) => {
                    
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers,result._id]
                            
                        }
                    }
                })

                console.log(result);
                setshowFollow(false)
            })
    }
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                followId: userid
            })
        })
            .then(res => res.json())
            .then(result => {
                dispatch({ type: "UPDATE", payload: { following: result.following, followers: result.followers } })
                localStorage.setItem("user", JSON.stringify(result))
                
                setData((prevState) => {
                    const newFollower=prevState.user.followers.filter(el=>el!=result._id)
                    console.log("newFollower",newFollower);
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })

                console.log(result);
                setshowFollow(true)
                
            })
    }
console.log("ProfileData",data);

    return (
        <>
            {
                data  ? <div div style={{ maxWidth: '550px', margin: "0px auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom: "1px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: '80px' }}
                                src={data.user.pic} />
                        </div>
                        <div>
                            <h4>{data.user.name}</h4>
                            <h5>{data.user.email}</h5>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "108%"
                            }}>
                                <h5>{data.posts.length} Posts</h5>
                                <h5>{data.user.followers.length} followers</h5>
                                <h5>{data.user.following.length} following</h5>
                            </div>
                            {showFollow ? <button style={{margin:"10px"}} className="btn waves-effect blue lighten-2" onClick={() => followUser()}>Follow
                </button> : <button style={{margin:"10px"}} className="btn waves-effect blue lighten-2" onClick={() => unfollowUser()}>Unfollow
                </button>}


                        </div>

                    </div>
                    <div className="gallery">
                        {
                            data.posts.map(item => {
                                const { photo, _id } = item
                                return (
                                    <img key={_id} className='item' src={photo} />
                                )

                            })
                        }


                    </div>
                </div> : <h2>loading....</h2>}

        </>
    )
}

export default Profile

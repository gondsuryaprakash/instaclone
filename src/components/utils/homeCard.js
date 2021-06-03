import React from 'react'

const Homecard = (props) => {
    const { _id, title, body, photo, postedBy, likes } = props.data
    const { name } = postedBy
    return (

        <div className='card home-card' key={_id}>
            <h5>{name}</h5>
            <div className='card-image'>
                <img
                    src={photo} />
            </div>
            <div className='card-content'>
                <i className="material-icons" style={{ color: 'red' }}>favorite</i>
                <i className="material-icons">thumb_down</i>
                <i className="material-icons">thumb_up</i>
                <h6>{likes.length} likes</h6>
                <h6>{title}</h6>
                <p>{body}</p>
                <input type='text' placeholder='add a comment'></input>
            </div>

        </div>


    )
}
export default Homecard

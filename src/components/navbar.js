import React,{useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const Navbar = () => {
    const history=useHistory()
    const {state,dispatch}=useContext(UserContext)
    const rendorList=()=>{
        if(state)
        {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">CreatePost</Link></li>,
                <li><Link to="/subpost">My Follower Post</Link></li>,
                <li>
                    <button className="btn waves-effect #ff3d00 deep-orange accent-3" onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }}>Logout
                </button>
                </li>
            ]
        }
        else
        {
            return [
                <li><Link to="/signin">SignIn</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }

    }

    return (
        <nav>
            <div className="nav-wrapper white" style={{color:"black"}}>
                <Link to={state ? '/':'/signin'} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                  {rendorList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
import React, { useEffect, useState } from 'react'
import './Header.css'
import { HiDotsVertical } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../../redux/slice';



const Header = () => {

    const [isMobile, setIsMobile] = useState(false);
    const token = useSelector((state) => state.auth.user_access_token);
    const [checkToken, setCheckToken] = useState(false);


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleMobile = () => {
        setIsMobile(!isMobile);
    };   

    const handleSignIn = ()=>{
        navigate('/signin');
    }

    const handleSignUp = ()=>{
        navigate('/signup');
    }

    const handleHome = ()=>{
        navigate('/home');
    }

    const handleCreateEvent = ()=>{
        navigate('/createevent');
    }

    const handleLogout = () =>{
        dispatch(clearCredentials())
        navigate('/signin')
    }

    useEffect(()=>{
        if(token){
            setCheckToken(true);
        } else {
            setCheckToken(false);
        }   
    }, [token]);   

    return (
        <div className='header'>
            <div className='headerContainer'>
                <div className='headerLeft'>
                    <ul>
                        {
                        checkToken ?  
                        <>
                        <li><a onClick={handleHome}>Home</a></li>
                        <li><a>Profile</a></li>
                        <li><a onClick={handleCreateEvent}>Create Event</a></li>
                        </>
                        :<></>}
                    </ul>
                </div>
                <div className='headerRight'>
                    {
                        checkToken ?  
                    <ul>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul> :
                    <ul>
                        <li><a onClick={handleSignIn}>Sign In</a></li>
                        <li><a onClick={handleSignUp}>Sign Up</a></li>
                    </ul>
                    }
                    
                </div>

                <div className='headerRightTab'>
                    <HiDotsVertical onClick={handleMobile}/>
                </div>


                {/* Tab View */}
                {isMobile && (
                <div className='headerRightMobile'>
                    <ul>
                        {
                        checkToken ? (
                            <>
                            <li><a onClick={handleHome}>Home</a></li>
                            <li><a>Create Event</a></li>
                            <li><a>Profile</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                            </>
                        
                        ) : (
                        <>
                            <li><a onClick={handleSignIn}>Sign In</a></li>
                            <li><a onClick={handleSignUp}>Sign Up</a></li>
                        </>
                    )
        }
                    </ul>
                </div>
                )}

            

            </div>
            
        </div>
    )
};


export default Header;

import React from 'react'
import './FrontPage.css'
import Header from '../header/header';

const Frontpage = () => {
    return (
        <>
            <Header/>
            <div className='frontpagecontainer'>
                <h6>Find your next experience</h6>
                <p>Discover the world's best events and activities</p>
            </div>  
        </>
    )
};


export default Frontpage;

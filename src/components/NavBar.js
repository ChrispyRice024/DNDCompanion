import React from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function NavBar () {


    return(
        <div id='nav_bar'>
            <div>
                <div className='nav_element'>
                    <Link to='/' className='nav_home'>
                        <strong>Home</strong>
                    </Link>
                </div>
                <div className='nav_element'>
                    <Link to='/creator' className='nav_creator'>
                        <strong>Character Creator</strong>
                    </Link>
                </div>
                <div className='nav_element'>
                </div>
            </div>
        </div>
    )
}
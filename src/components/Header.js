import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const Header = () => {
    return (
        <div className='ui fixed menu'>
        <div className='ui container center'>
            <Link to ='/'>
            <h2> Ambience Store</h2>
            </Link>
        </div>

        <div className="column rp">
            <div className="ui vertical animated button" tabIndex="0">
            <Link to = '/cart'>
            <div className="hidden content">
                Cart
            </div>
            <div className="visible content"><i className="shop icon"></i></div>
            </Link>
            </div>
            
        </div>

        </div>
    )
}

export default Header

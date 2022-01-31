import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {products} from '../../features/productSlice';

import '../../App.css'

const ProductComponent = () =>{
    const storeProducts = useSelector(products);
    const renderedProduct = storeProducts.map((product) => {
        const {id, title, image, price, category} = product
        return (
            <div className="four wide column space" key={id}>
                <Link to={`/product/${id}`}>
            <div className='ui link cards'>
            <div className='card'>
                <div className='image'>
                    <img src={image} alt={title} style={{height: '48vh'}}></img>
                </div>
                <div className='content'>
                    <div className='header'>{title} </div>
                    <div className='meta price'>$ {price}</div>
                    <div className='meta'> {category}</div>                    
                </div>
            </div>
            </div>
                </Link>
            </div>
        )
    })
    return  <>{renderedProduct}</>
    
}

export default ProductComponent

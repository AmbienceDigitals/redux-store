import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {selectedProduct, removeSelectedProduct, product, products} from '../../features/productSlice';
import {addToCart} from '../../features/cartSlice';
import {useHistory} from 'react-router-dom';

const ProductDetail = () =>{
    const productDetail = useSelector(product);
    const productLength = useSelector(products)
    const {image, title, price, category, description} = productDetail;
    const [refresh, setRefresh] = useState(true);
    // const [{productId}, setProductId] = useState(useParams());
    const {productId} = useParams();
    const dispatch = useDispatch();

    const next = () => {
        if (productId < productLength.length) {
            productId+='1'
            fetchProductDetail()
        }
    }

    const previous = () => {
        if (productId > 1) {
            // setProductId(productId--);
            fetchProductDetail();
            
        }
    }

    
    const fetchProductDetail = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
        .catch((err) => {
            console.log("we ran into the following error" + err)
        });
        dispatch(selectedProduct(response.data));
        console.log(typeof(productId))
        return response.data
    }


    const addProductToCart = () => {
        dispatch(addToCart(productDetail))
        setRefresh(!refresh)
    }

    useEffect(() => {
        if (productId && productId !== '')
        fetchProductDetail();
        return () => {
            dispatch(removeSelectedProduct());
        }
    }, [productId, refresh])

    return (
                // if product is empty
            <div className="ui grid container">
                {Object.keys(productDetail).length === 0 ? (
                <div className='ui grid container list'>
                    ...Loading
                </div>
            ) : (
                // if product isnt empty 
                <div className='ui grid'>
                <div className="ui placeholder segment">
                    <div className="ui container segment block clear">
                    <button className="ui left floated button teal" 
                    onClick={() => {previous()}}>{productLength.length}<i className='angle double left icon'/> Previous </button>
                    <button className="ui right floated button teal"
                    onClick={() => {next()}}>Next <i className='angle double right icon'/>{productId + 1}</button>
                    <div style= {{clear: 'both'}}></div>
                    </div>
                   
                <div className="ui two column stackable center aligned grid">
                    <div className="ui vertical divider">AND</div>
                    <div className="middle aligned row">
                    <div className="column lp">
                        <img className="ui fluid image" src={image} alt='' />
                    </div>
                    <div className="column rp">
                        <h1>{title}</h1>
                        <h2>
                        <a className="ui teal tag label">${price}</a>
                        </h2>
                        <h3 className="ui brown block header">{category}</h3>
                        <p>{description}</p>
                        <div 
                        className="ui vertical animated button" 
                        tabIndex="0" 
                        onClick={() => {
                            addProductToCart()}}>
                        <div className="hidden content">
                            <i className="shop icon"></i>
                        </div>
                        <div className="visible content">Add to Cart</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
                
            )}
            
            </div>
    )
}

export default ProductDetail

import React, {useEffect} from 'react';
import axios from 'axios';
import ProductComponent from './ProductComponent';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/productSlice';

const ProductListing = () => {
    const dispatch = useDispatch()

    const fetchProducts = async () => {
        const response = await axios.get('https://fakestoreapi.com/products')
        .catch((error) => {
            console.log(`we encountered the following error ${error}`)
        });
        dispatch(addProduct(response.data))
    };

    useEffect(() => {
        fetchProducts();
    });

    return (
        <div className='ui grid container'>
            <ProductComponent></ProductComponent>
        </div>
    )
}

export default ProductListing

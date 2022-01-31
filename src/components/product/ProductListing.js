import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProductComponent from './ProductComponent';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/productSlice';


const ProductListing = () => {
    const [mobile, setMobile] = useState(window.innerWidth <= 760);
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
        window.addEventListener("resize", () => {
            const isMobile = window.innerWidth <= 760;
            if (isMobile !== mobile) setMobile(isMobile);
            }, false)
    }, [mobile]);

    return (
        <div className={mobile ? "list ui center aligned middle aligned container flex" : "ui grid container"}>
            <ProductComponent/>
        </div>
    )
}

export default ProductListing

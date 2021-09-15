import { createSlice } from '@reduxjs/toolkit';
import {v1 as uuid} from 'uuid'

const initialState = {
    products: [],
    product: {}
}

const productSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const id = action.payload
            if (state.products.length === 0) {
                state.products.push(...action.payload)
            }
            else if (state.products.length !== 0) {
                state.products.map(product => {
                    if (products.id in (id)) {
                        return state.products
                    }
                })
            }
        },

        selectedProduct: (state, action) => {
            state.product = Object.assign({}, {...action.payload, uniqueId: uuid()});
        },

        removeSelectedProduct: (state, action) => {
            state.product = Object.assign({}, {});
        }
    
    }
});

export const {
    addProduct,
    selectedProduct,
    removeSelectedProduct
} = productSlice.actions

export const products = state => state.allProducts.products;
export const product = state => state.allProducts.product;


export default productSlice.reducer
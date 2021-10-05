import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    cartLength: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let load = action.payload
            state.cart.push(load)
        },

        removeFromCart: (state, action) => {
            let removedItem = state.cart.filter((item) => item.uniqueId !== action.payload.uniqueId)
            state.cart = removedItem
        },

        length: (state, action) => {
            state.cartLength += state.cart.length;
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    length
} = cartSlice.actions

export const cart = state => state.cart.cart
export const cartLength = state => state.cart.cartLength


export default cartSlice.reducer
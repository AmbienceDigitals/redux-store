import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    cartLength: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let load = action.payload
            state.cart.push(load);
            state.cartLength++;
            state.totalPrice = state.cart.reduce((accumulator, current) => accumulator + current.price, 0);
        },

        removeFromCart: (state, action) => {
            let removedItem = state.cart.filter((item) => item.uniqueId !== action.payload.uniqueId)
            state.cart = removedItem;
            state.cartLength--;
            state.totalPrice = state.cart.reduce((accumulator, current) => accumulator - (-current.price), 0);
        },

        clearCart: (state) => {
            let cart = []
            state.cart = cart
            state.cartLength = 0
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    clearCart
} = cartSlice.actions

export const cart = state => state.cart.cart
export const cartLength = state => state.cart.cartLength
export const totalPrice = state => state.cart.totalPrice

export default cartSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
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
        }
    }
});

export const {
    addToCart,
    removeFromCart,
} = cartSlice.actions

export const cart = state => state.cart.cart

export default cartSlice.reducer
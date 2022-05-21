import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TCoin } from '../../types/types'



interface AllCoinsState {
    AllCoins: TCoin[]
    isLoading: boolean
}

const initialState: AllCoinsState = {
    AllCoins: [],
    isLoading: false,
}

export const coinsSlice = createSlice({
    name: 'Coin',
    initialState,
    reducers: {
        coinsFetching(state) {
            state.isLoading = true
        },
        coinsFetchingSuccess(state, action: PayloadAction<TCoin[]>) {
            state.isLoading = false

            state.AllCoins.filter((coin, index) => coin.price > state.AllCoins[index].price
            ? state.AllCoins[index].status = 'down'
            : coin.price < state.AllCoins[index].price
                ? state.AllCoins[index].status = 'up'
                : state.AllCoins[index].status = '')

            state.AllCoins = action.payload
        },
    },
})

export default coinsSlice.reducer

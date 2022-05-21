import { coinsApi } from '../../api/coinsApi'

import { TCoin } from '../../types/types'

import { AppDispatch } from './../store'
import { coinsSlice } from './CoinsReducer'


export const fetchCoins = () => async (dispatch: AppDispatch) => {
    dispatch(coinsSlice.actions.coinsFetching)
    const response: TCoin[] = await coinsApi.getAllCoins()
        .then(({ data }) => {
            const coins = data.Data.map((coin: any) => {
                const obj: TCoin = {
                    name: coin.CoinInfo.Name,
                    fullName: coin.CoinInfo.FullName,
                    imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
                    price: coin.RAW.USD.PRICE.toFixed(2),
                    volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR),
                    changePercentDay: coin.DISPLAY.USD.CHANGEPCTDAY,
                    status: '',
                }
                return obj
            })
            return coins
        })
    dispatch(coinsSlice.actions.coinsFetchingSuccess(response))
}

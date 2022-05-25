import axios from 'axios'

const REACT_APP_API_URL_GET_COINS = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
const REACT_APP_API_URL_CONVERT = 'https://min-api.cryptocompare.com/data'

const $getCoins = axios.create({
    withCredentials: true,
    baseURL: REACT_APP_API_URL_GET_COINS,
})

const $convert = axios.create({
    withCredentials: true,
    baseURL: REACT_APP_API_URL_CONVERT,
})

export const coinsApi = {
    getAllCoins() {
        return $getCoins.get('')
    },
    getConvertPrice(from: string, to: string) {
        return $convert.get(`pricemultifull?fsyms=${from}&tsyms=${to}`)
    },
}

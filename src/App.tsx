import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { TCoin } from './types/types'
import { coinsApi } from './api/coinsApi'

import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import Sitebar from './pages/Sitebar/Sitebar'

const App = () => {
  const [allCoins, setAllCoins] = React.useState<TCoin[] | []>([])

  const difference = (coins: TCoin[]) => {
    if (allCoins.length === 0) {
      setAllCoins(coins)
    }

    allCoins.filter((coin, index) => coin.price > coins[index].price
      ? coins[index].status = 'down'
      : coin.price < coins[index].price
        ? coins[index].status = 'up'
        : coins[index].status = '')
    setAllCoins(coins)
  }

  React.useEffect(() => {
    coinsApi.getAllCoins()
      .then(({ data }) => {
        const coins: TCoin[] = data.Data.map((coin: any) => {
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
        setAllCoins(coins)
      })
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      coinsApi.getAllCoins()
        .then(({ data }) => {
          const coins: TCoin[] = data.Data.map((coin: any) => {
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
          difference(coins)
        })
    }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCoins])

  return (
    <div className="wrapper">
      <main>
        <div className="app">
          <div className="app__container">
            <Routes>
              <Route path="/" element={<Sitebar />}>
                <Route index
                  element={<Dashboard allCoins={allCoins} />} />
                <Route path={'/profile'}
                  element={<Profile allCoins={allCoins} />} />
              </Route>
            </Routes>
          </div>
        </div>
      </main>
    </div >
  )
}

export default App

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import Sitebar from './pages/Sitebar/Sitebar'

import { useAppDispatch, useAppSelector } from './redux/hooks/redux'
import { fetchCoins } from './redux/reducers/ActionCreators'

const App = () => {

  const dispatch = useAppDispatch()
  const { AllCoins } = useAppSelector(store => store.CoinsReducer)

  React.useEffect(() => {
    dispatch(fetchCoins())
  }, [])

  React.useEffect(() => {
    setTimeout(() => dispatch(fetchCoins()), 3000)
  }, [AllCoins])

  return (
    <div className="wrapper">
      <main>
        <div className="app">
          <div className="app__container">
            <Routes>
              <Route path="/" element={<Sitebar />}>
                <Route index
                  element={<Dashboard allCoins={AllCoins} />} />
                <Route path={'/profile'}
                  element={<Profile allCoins={AllCoins} />} />
              </Route>
            </Routes>
          </div>
        </div>
      </main>
    </div >
  )
}

export default App

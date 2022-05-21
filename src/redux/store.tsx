import { configureStore, combineReducers } from '@reduxjs/toolkit'

import CoinsReducer from './reducers/CoinsReducer'

const rootReducer = combineReducers({
    CoinsReducer,
})

export const setupStore = () => configureStore({ reducer: rootReducer})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

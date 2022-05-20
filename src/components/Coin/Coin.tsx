import React from 'react'
import cn from 'classnames'

import CoinDifference from '../CoinDifference/CoinDifference'
import LineChart from '../LineChart/LineChart'

import { TCoin } from '../../types/types'

import './coin.scss'

interface CoinProps {
    coin: TCoin | null
}

const Coin: React.FC<CoinProps> = ({ coin }) => {
    const [backgroundColorChart, setBackgroundColorChart] = React.useState('')
    const [borderColorChart, setBorderColorChart] = React.useState('')

    React.useEffect(() => {
        if (coin && coin?.changePercentDay > 0) {
            setBackgroundColorChart('rgba(0, 209, 84, 0.3)')
            setBorderColorChart('#00D154')
        } else {
            setBackgroundColorChart('rgba(241, 59, 1, 0.3)')
            setBorderColorChart('#F13B01')
        }
        setTimeout(() => {
            if (coin?.status === 'up' || coin?.status === 'down') {
                coin.status = ''
            }
        }, 500)
    }, [coin])

    const changePercentDayUp = coin?.changePercentDay && coin?.changePercentDay >= 0

    return (
        <div
            className={
                cn('coin', { 'coin-green': coin?.status === 'up', 'coin-red': coin?.status === 'down' })
            }
        >
            <div className={cn('coin__body', { 'coin__body-down': !changePercentDayUp })}>
                <div className="coin__info">
                    <div className={cn('coin__img', { 'coin__img-down': !changePercentDayUp })}>
                        <img src={coin?.imageUrl} alt="" />
                    </div>
                    <div className="coin__names">
                        <div className="coin__name">{coin?.name}</div>
                        <div className="coin__fullname">{coin?.fullName}</div>
                    </div>
                </div>
                <div className="coin__total">
                    <div className="coin__price">$ {coin?.price}</div>
                    <CoinDifference
                        changePercentDay={coin?.changePercentDay}
                    />
                </div>
                <div className="coin__chart">
                    <LineChart
                        width="227px"
                        height="111px"
                        coin={coin?.name}
                        ticksDisplayX={false}
                        ticksDisplayY={false}
                        pointRadius={0}
                        backgroundColor={backgroundColorChart}
                        borderColor={borderColorChart}
                        gridY={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Coin

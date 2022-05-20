import React from 'react'

import CoinDifference from '../../CoinDifference/CoinDifference'

import { TCoin } from '../../../types/types'

interface WalletCoinProps {
    balance: number
    actualBalance: number
    coin: TCoin
}

const WalletCoin: React.FC<WalletCoinProps> = ({ balance, actualBalance, coin }) => {
    const [changePercent, setChangePercent] = React.useState<number>(0)

    React.useEffect(() => {
        if (balance === 0) {
            return setChangePercent(0)
        }
        setChangePercent(+((actualBalance - balance) / balance * 100).toFixed(2))
    }, [balance, actualBalance])

    return (
        <div key={coin.name} className="wallet-tr tr-out">
            <div className="wallet-th th-out">
                <img src={coin.imageUrl} alt={coin.name} />
            </div>
            <div className="wallet-th th-out">{coin.name}</div>
            <div className="wallet-th th-out">{coin.fullName}</div>
            <div className="wallet-th th-out">$ {balance}</div>
            <div className="wallet-th th-out">$ {actualBalance}</div>
            <div className="wallet-th th-out">
                <CoinDifference
                    changePercentDay={changePercent}
                />
            </div>
        </div>
    )
}

export default WalletCoin

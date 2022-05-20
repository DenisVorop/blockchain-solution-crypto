import React from 'react'

import WalletCoin from '../components/Wallet/WalletCoin/WalletCoin'

import { TCoin } from '../types/types'

interface WalletSwitchHocProps {
    actualBtcBalance: number
    actualEthBalance: number
    btcBalance: number
    ethBalance: number
    usdBalance: number
    coin: TCoin
}

const WalletSwitchHoc: React.FC<WalletSwitchHocProps> = (
    { actualBtcBalance, actualEthBalance, btcBalance, ethBalance, usdBalance, coin },
) => {
    let balance = 0
    let actualBalance = 0

    switch (coin.name) {
        case 'BTC':
            actualBalance = actualBtcBalance
            balance = btcBalance
            break
        case 'ETH':
            actualBalance = actualEthBalance
            balance = ethBalance
            break
        case 'BUSD':
            balance = usdBalance
            actualBalance = usdBalance
            break
    }

    return <WalletCoin
        actualBalance={actualBalance}
        balance={balance}
        coin={coin}
    />
}

export default WalletSwitchHoc

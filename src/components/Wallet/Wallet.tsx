import React from 'react'

import Currency from '../Currency/Currency'

import { TCoin, TDeal } from '../../types/types'

import WalletSwitchHoc from '../../hoc/WalletSwitchHoc'

import './wallet.scss'

interface WalletProps {
    allCoins: TCoin[]
    actualBtcBalance: number
    actualEthBalance: number
    btcBalance: number
    ethBalance: number
    usdBalance: number
    btcBuyDeals: TDeal[]
    ethBuyDeals: TDeal[]
    openDeal: (coin: string, value: number) => void
    closeDeal: (deal: TDeal) => void
}

const Wallet: React.FC<WalletProps> = (
    { allCoins, actualBtcBalance, actualEthBalance, btcBalance, ethBalance, usdBalance, btcBuyDeals, ethBuyDeals, openDeal, closeDeal },
) => {
    return (
        <>
            <div className="purse-profile__wallet">
                <div className="purse-profile__label">Wallet</div>
                <div className="purse-profile__table">
                    <div className="wallet-table">
                        <div className="wallet-thead">
                            <div className="wallet-tr">
                                <div className="wallet-th">&nbsp;</div>
                                <div className="wallet-th">Name</div>
                                <div className="wallet-th">Fullname</div>
                                <div className="wallet-th">Balance ($)</div>
                                <div className="wallet-th">Actual Price ($)</div>
                                <div className="wallet-th">Change (24h)</div>
                            </div>
                        </div>
                        <div className="wallet-tbody">
                            {allCoins?.map(coin => (
                                <WalletSwitchHoc
                                    key={coin.name}
                                    coin={coin}
                                    actualBtcBalance={actualBtcBalance}
                                    actualEthBalance={actualEthBalance}
                                    btcBalance={btcBalance}
                                    ethBalance={ethBalance}
                                    usdBalance={usdBalance}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Currency
                    btcBuyDeals={btcBuyDeals}
                    ethBuyDeals={ethBuyDeals}
                    openDeal={openDeal}
                    closeDeal={closeDeal}
                />
            </div>
        </>
    )
}

export default Wallet

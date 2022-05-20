import React from 'react'

import { TDeal } from '../../types/types'

import Deals from '../Deals/Deals'

import RowCurrency from './RowCurrency/RowCurrency'

import './currency.scss'

interface CurrencyProps {
    btcBuyDeals: TDeal[]
    ethBuyDeals: TDeal[]
    openDeal: (coin: string, value: number) => void
    closeDeal: (deal: TDeal) => void
}

const Currency: React.FC<CurrencyProps> = ({ btcBuyDeals, ethBuyDeals, openDeal, closeDeal }) => {
    return (
        <div className="currency">
            <div className="currency__container">
                <div className="currency__body">
                    <div className="currency__rows">
                        <RowCurrency label="Buy deal" action={openDeal} />
                        <RowCurrency label="Sell deal" action={null} />
                    </div>
                    <Deals
                        btcBuyDeals={btcBuyDeals}
                        ethBuyDeals={ethBuyDeals}
                        closeDeal={closeDeal}
                    />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Currency)

import React from 'react'
import cn from 'classnames'

import { TDeal } from '../../types/types'

import close from '../../assets/images/close.svg'
import arrowR from '../../assets/images/arrowRto.svg'

import './deals.scss'

interface DealsProps {
    btcBuyDeals: TDeal[]
    ethBuyDeals: TDeal[]
    closeDeal: (deal: TDeal) => void
}

const Deals: React.FC<DealsProps> = ({ btcBuyDeals, ethBuyDeals, closeDeal }) => {
    const [deals, setDeals] = React.useState<TDeal[]>([])

    React.useEffect(() => {
        setDeals(Array.prototype.concat(btcBuyDeals, ethBuyDeals))
    }, [btcBuyDeals, ethBuyDeals])

    return (
        <div className="deals">
            <div className="deals__container">
                {deals.length !== 0
                    ? <div className="deals__body">
                        <div className="deals__rows">
                            {deals.map(deal => (
                                <div className="deal__row row-deal" key={deal.id}>
                                    <div className="row-deal__info">
                                        <div className="row-deal__tp">
                                            <div className="row-deal__ellipse ellipse">{deal.name}</div>
                                            <div className="row-deal__position">buy, {(deal.proportion).toFixed(2)}</div>
                                        </div>
                                        <div className="row-deal__bt">
                                            <div className="row-deal__value">{deal.open}</div>
                                            <img src={arrowR} alt="arrow" />
                                            <div className="row-deal__actual-value">434343</div>
                                        </div>
                                    </div>
                                    <div className="row-deal__end">
                                        <div className={cn('row-deal__profit', {'profit-down': deal.profit < 0})}>{deal.profit}</div>
                                        <div className="row-deal__close" onClick={() => closeDeal(deal)}>
                                            <img src={close} alt="close position" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default React.memo(Deals)

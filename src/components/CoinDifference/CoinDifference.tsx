import React from 'react'
import cn from 'classnames'

import arrowUp from '../../assets/images/arrowUp.svg'
import arrowDown from '../../assets/images/arrowDown.svg'

import './coindifference.scss'

interface CoinDifferenceProps {
    changePercentDay: number | undefined | null
}

const CoinDifference: React.FC<CoinDifferenceProps> = ({ changePercentDay }) => {
    const [arrow, setArrow] = React.useState(arrowUp)
    const [difference, setDifference] = React.useState('up')

    React.useEffect(() => {
        if (changePercentDay) {
            if (changePercentDay < 0) {
                setArrow(arrowDown)
                setDifference('down')
            } else {
                setArrow(arrowUp)
                setDifference('up')
            }
        }
    }, [changePercentDay])

    return (
        <div className="coin-difference">
            <div className={cn('coin-difference__number', { 'coin-difference__down': difference !== 'up' })}
            >
                {changePercentDay && changePercentDay < 0 ? '' : '+'}{changePercentDay} %</div>
            <div className="coin-difference__arrow">
                <img src={arrow} alt="arrow" />
            </div>
        </div>
    )
}

export default CoinDifference

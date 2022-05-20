import React from 'react'

import Coin from '../../components/Coin/Coin'

import CoinDifference from '../../components/CoinDifference/CoinDifference'
import LineChart from '../../components/LineChart/LineChart'

import { TCoin } from '../../types/types'

import './dashboard.scss'

interface DashboardProps {
    allCoins: TCoin[]
}

const Dashboard: React.FC<DashboardProps> = ({ allCoins }) => {
    const [selectedCoin, setSelectedCoin] = React.useState<TCoin | null>(null)
    const [visibleChart, setVisibleChart] = React.useState(false)

    const getChart = (coin: TCoin) => {
        setSelectedCoin(coin)
        setVisibleChart(true)
    }

    React.useEffect(() => {
        const choiceCoin: TCoin[] = allCoins?.filter(coin => coin.name === selectedCoin?.name)
        setSelectedCoin(choiceCoin[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allCoins])

    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard__body">
                    <div className="dashboard__cards">
                        {allCoins?.map((coin) => (
                            <div className="dashboard__card card-dashboard" key={coin.name} onClick={() => getChart(coin)}>
                                <div className="card-dashboard__coin">
                                    <Coin coin={coin} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleChart
                        ? <div className="dashboard__selected-coin selected-coin-dashboard">
                            <div className="selected-coin-dashboard__correlation">
                                <div className="selected-coin-dashboard__coin-to">
                                    {selectedCoin?.fullName} USD ({selectedCoin?.name} - USD)
                                </div>
                            </div>
                            <div className="selected-coin-dashboard__total">
                                <div className="selected-coin-dashboard__price">$ {selectedCoin?.price}</div>
                                <CoinDifference
                                    changePercentDay={selectedCoin?.changePercentDay}
                                />
                            </div>
                            <div className="selected-coin-dashboard__summary">
                                <div className="selected-coin-dashboard__label">Summary 2 weeks</div>
                                <div className="selected-coin-dashboard__chart">
                                    <LineChart
                                        width=""
                                        height=""
                                        coin={selectedCoin?.name}
                                        ticksDisplayX={true}
                                        ticksDisplayY={true}
                                        pointRadius={4}
                                        backgroundColor="rgba(51, 195, 215, 0.3)"
                                        borderColor="#33C3D7"
                                        gridY={true}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard

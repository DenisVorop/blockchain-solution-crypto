import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

import './piechart.scss'

Chart.register(...registerables)

interface PieChartProps {
    btcBalance: number
    ethBalance: number
    usdBalance: number
    balance: number
}

const PieChart: React.FC<PieChartProps> = ({ btcBalance, ethBalance, usdBalance, balance }) => {
    const [percentBtcBalance, setPercentBtcBalance] = React.useState<number>(0)
    const [percentEthBalance, setPercentEthBalance] = React.useState<number>(0)
    const [percentUsdBalance, setPercentUsdBalance] = React.useState<number>(0)

    React.useEffect(() => {
        setPercentBtcBalance(+((btcBalance / balance) * 100).toFixed(1))
        setPercentEthBalance(+((ethBalance / balance) * 100).toFixed(1))
        setPercentUsdBalance(+((usdBalance / balance) * 100).toFixed(1))
    }, [btcBalance, ethBalance, usdBalance, balance])

    const state = {
        labels: ['BTC, %', 'ETH, %', 'USD, %'],
        datasets: [
            {
                label: 'WALLET',
                backgroundColor: [
                    '#76E3F2',
                    '#5CC7D6',
                    '#4E9DBF',
                ],
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 0,
                data: [percentBtcBalance, percentEthBalance, percentUsdBalance],
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Distribution of coins in the wallet',
                color: '#021113',
                font: {
                    weight: '400',
                    size: 18,
                    family: 'Montserrat',
                },
            },
        },
    }

    return (
        <div style={{ width: '300px' }}>
            <Pie
                data={state}
                options={options}
            />
        </div>
    )
}

export default PieChart

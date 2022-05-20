import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'

Chart.register(...registerables)

interface LineChartProps {
    width: string
    height: string
    coin: string | undefined
    pointRadius: number
    ticksDisplayX: boolean
    ticksDisplayY: boolean
    backgroundColor: string
    borderColor: string
    gridY: boolean
}

interface dataChart2WeeksType {
    dateData: string[]
    priceCloseData: number[]
}

const LineChart: React.FC<LineChartProps> = ({ width, height, coin, ticksDisplayX, ticksDisplayY, pointRadius, backgroundColor, borderColor, gridY }) => {
    const [datasetsData, setDatasetsData] = React.useState<dataChart2WeeksType>({ priceCloseData: [], dateData: [] })

    async function getDataChart() {
        const dataChart2Weeks = await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=USD&limit=13`)
            .then(({ data }) => {
                const responseData = data.Data.Data
                const dateData: string[] = []
                const priceCloseData: number[] = []

                responseData.map((day: { time: number; }) => (
                    dateData.push('',
                        new Date((Number(`${day.time}000`)))
                            .toISOString()
                            .substring(0, 10)
                            .substring(5),
                    )))
                responseData.map((day: { open: number, close: number; }) => (
                    priceCloseData.push(day.open, day.close)
                ))

                return { priceCloseData, dateData }
            })
        setDatasetsData(dataChart2Weeks)
    }

    React.useEffect(() => {
        getDataChart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coin])

    const data = {
        labels: datasetsData.dateData,
        datasets: [
            {
                label: 'USD, $',
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 2,
                data: datasetsData.priceCloseData,
                pointRadius: pointRadius,
                fill: true,
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: ticksDisplayX,
                },
            },
            y: {
                position: 'right' as const,
                grid: {
                    display: gridY,
                    drawBorder: false,
                },
                ticks: {
                    display: ticksDisplayY,
                },
            },
        },
    }

    return (
        <div style={{ width: width, height: height }}>
            <Line
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineChart

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import CoinDifference from '../../components/CoinDifference/CoinDifference'
import Error from '../../components/Error/Error'
import PieChart from '../../components/PieChart/PieChart'
import Wallet from '../../components/Wallet/Wallet'

import { TCoin, TDeal } from '../../types/types'

import './profile.scss'

interface ProfileProps {
    allCoins: TCoin[]
}

const Profile: React.FC<ProfileProps> = ({ allCoins }) => {

    // -- BTC
    const [btcBalance, setBtcBalance] = React.useState<number>(5000) // Сумма активов
    const [actualBtcBalance, setActualBtcBalance] = React.useState<number>(5000) // Актуальная стоимость актива (с учетом роста/падения)
    const [actualBtcPrice, setActualBtcPrice] = React.useState<number>() // Актуальная стоимость актива
    const [btcBuyDeals, setBtcBuyDeals] = React.useState<TDeal[]>([{ // Сделки в покупку BTC
        id: 1653035321822,
        name: 'BTC',
        open: 29000,
        close: null,
        status: 'active',
        profit: 0,
        proportion: 0.17241379,
        value: 5000,
        actualPrice: actualBtcPrice!,
    }])
    const [btcClosedDeals, setBtcClosedDeals] = React.useState<TDeal[]>([])
    // -- ETH
    const [ethBalance, setEthBalance] = React.useState<number>(2000) // Сумма активов
    const [actualEthBalance, setActualEthBalance] = React.useState<number>(2000) // Актуальная стоимость актива (с учетом роста/падения)
    const [actualEthPrice, setActualEthPrice] = React.useState<number>() // Актуальная стоимость актива
    const [ethBuyDeals, setEthBuyDeals] = React.useState<TDeal[]>([{ // Сделки в покупку
        id: 1653035321345,
        name: 'ETH',
        open: 2000,
        close: null,
        status: 'active',
        profit: 0,
        proportion: 1,
        value: 2000,
        actualPrice: actualEthPrice!,
    }])
    const [ethClosedDeals, setEthClosedDeals] = React.useState<TDeal[]>([])
    // -- BUSD
    const [usdBalance, setUsdBalance] = React.useState<number>(12000) // Долларовый баланс
    // -- ALL
    const [balance, setBalance] = React.useState<number>(20000) // Общий баланс
    const [actualBalance, setActualBalance] = React.useState<number>(0) // Стоимость портфеля с поправкой на рост/падение
    const [changePercent, setChangePercent] = React.useState<number | null>(null) // Изменение стоимости портфеля в процентах

    const [error, setError] = React.useState<string>('')
    const [visibleError, setVisibleError] = React.useState<boolean>(false)

    React.useEffect(() => {
        // eslint-disable-next-line no-sequences
        setTimeout(() => (setError(''), setVisibleError(false)), 2000)
    }, [error])

    React.useEffect(() => {
        setChangePercent(+((actualBalance - balance) / balance * 100).toFixed(2)) // Прибыль/убыток портфеля в %

        setBalance((btcBalance + ethBalance + usdBalance)) // Стоимость портфеля
        setActualBalance(+(actualBtcBalance + actualEthBalance + usdBalance).toFixed(2)) //  Стоимость портфеля с поправкой на рост/падение

        setActualBtcBalance(btcBuyDeals.reduce(((prev, deal) => +(prev + deal.proportion * actualBtcPrice!).toFixed(2)), 0)) // Стоимость BTC в портфеле с поправкой на рост/падение
        setActualEthBalance(ethBuyDeals.reduce(((prev, deal) => +(prev + deal.proportion * actualEthPrice!).toFixed(2)), 0)) // Стоимость ETH в портфеле с поправкой на рост/падение

        setActualBtcPrice(allCoins.filter(coin => coin.name === 'BTC')[0]?.price) // Обновление актуальной стоимости BTC
        setActualEthPrice(allCoins.filter(coin => coin.name === 'ETH')[0]?.price) // Обновление актуальной стоимости ETH

        // Если что-либо изменится, лучше обновить все (Для поддержания актуальности данных)
    }, [actualBalance, actualBtcBalance, actualBtcPrice, actualEthBalance, actualEthPrice, allCoins, balance, btcBalance, btcBuyDeals, ethBalance, ethBuyDeals, usdBalance])

    React.useEffect(() => {
        btcBuyDeals.forEach(deal => deal.profit = +((actualBtcPrice! - deal.open!) * deal.proportion).toFixed(2)) // Профит от сделки в покупку BTC
        ethBuyDeals.forEach(deal => deal.profit = +((actualEthPrice! - deal.open!) * deal.proportion).toFixed(2)) // Профит от сделки в покупку ETH
        btcBuyDeals.forEach(deal => deal.actualPrice = actualBtcPrice!) // Актуальная стоимость BTC
        ethBuyDeals.forEach(deal => deal.actualPrice = actualEthPrice!) // Актуальная стоимость ETH
    }, [actualBtcBalance, actualBtcPrice, actualEthPrice, btcBuyDeals, ethBuyDeals])

    const innerOpenDeal = (
        value: number, coinName: string, actualPrice: number, buyDeals: TDeal[],
        setBuyDeals: React.Dispatch<React.SetStateAction<TDeal[]>>,
        setBalance: React.Dispatch<React.SetStateAction<number>>,
    ) => {
        const proportion = value / actualPrice! // Какая часть от стоимости монеты была приобретена BTC
        const deal: TDeal = { // Создание сделки на покупку BTC
            id: Date.now(),
            name: coinName,
            open: actualPrice!,
            close: null,
            status: 'active',
            profit: 0,
            proportion: proportion,
            value: value,
            actualPrice: actualPrice!,
        }
        setBuyDeals([...buyDeals, deal])
        setBalance(prev => +(prev + value).toFixed(2)) // Баланс BTC
    }

    const openDeal = (coin: string, value: number) => {
        if (value === 0) {
            setError('Заполните поле')
            setVisibleError(true)
            return
        }
        if (usdBalance < value) {
            setError('Недостаточно средств')
            setVisibleError(true)
            return
        }
        setUsdBalance(prev => +(prev - value).toFixed(2)) // Баланс USD
        if (coin === 'BTC') {
            return innerOpenDeal(value, coin, actualBtcPrice!, btcBuyDeals, setBtcBuyDeals, setBtcBalance)
        }
        return innerOpenDeal(value, coin, actualEthPrice!, ethBuyDeals, setEthBuyDeals, setEthBalance)
    }

    const innerCloseDeal = (
        deal: TDeal, actualPrice: number, closedDeals: TDeal[], buyDeals: TDeal[],
        setClosedDeals: React.Dispatch<React.SetStateAction<TDeal[]>>,
        setBuyDeals: React.Dispatch<React.SetStateAction<TDeal[]>>,
        setBalance: React.Dispatch<React.SetStateAction<number>>,
    ) => {
        deal.status = 'closed' // Меняем статус сделки
        deal.close = actualPrice! // Меняем цену закрытия сделки
        setClosedDeals([...closedDeals, deal])
        setBuyDeals(buyDeals.filter(oldDeal => oldDeal.id !== deal.id)) // Возвращаем массив без закрытой сделки
        setBalance(prev => +(prev - deal.value).toFixed(2)) // Баланс монеты
        setUsdBalance(prev => +(prev + deal.value + deal.profit).toFixed(2)) // Баланс USD
    }

    const closeDeal = (dealClose: TDeal) => {
        if (dealClose.name === 'BTC') {
            return innerCloseDeal(dealClose, actualBtcPrice!, btcClosedDeals, btcBuyDeals, setBtcClosedDeals, setBtcBuyDeals, setBtcBalance)
        }
        return innerCloseDeal(dealClose, actualEthPrice!, ethClosedDeals, ethBuyDeals, setEthClosedDeals, setEthBuyDeals, setEthBalance)
    }

    return (<div className="profile">
        <div className="profile__container">
            <div className="profile__body">
                <div className="profile__balance balance-profile">
                    <div className="balance-profile__label">Total balance</div>
                    <div className="balance-profile__amount">
                        <div className="balance-profile__total">$ {actualBalance}</div>
                        <div className="balance-profile__difference">
                            <CoinDifference
                                changePercentDay={changePercent!}
                            />
                        </div>
                    </div>
                </div>
                <div className="profile__purse purse-profile">
                    <Wallet
                        allCoins={allCoins}
                        actualBtcBalance={actualBtcBalance}
                        actualEthBalance={actualEthBalance}
                        btcBalance={btcBalance}
                        ethBalance={ethBalance}
                        usdBalance={usdBalance}
                        openDeal={openDeal}
                        closeDeal={closeDeal}
                        btcBuyDeals={btcBuyDeals}
                        ethBuyDeals={ethBuyDeals}
                    />
                    <div className="purse-profile__pie-chart">
                        <div className="pie-chart__label">Pie chart</div>
                        <div className="pie-chart__chart">
                            <PieChart
                                btcBalance={btcBalance}
                                ethBalance={ethBalance}
                                usdBalance={usdBalance}
                                balance={balance}
                            />
                        </div>
                    </div>
                </div>
                <Error
                    error={error}
                    visibleError={visibleError}
                />
            </div>
        </div>
    </div >
    )
}

export default Profile

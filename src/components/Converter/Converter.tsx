import React from 'react'
import cn from 'classnames'

import LocalActionButton from '../LocalActionButton/LocalActionButton'

import { coinsApi } from '../../api/coinsApi'

import refresh from '../../assets/images/refresh.svg'

import './converter.scss'

const Converter = () => {
    const [price, setPrice] = React.useState<number>()
    const [fromCoin, setFromCoin] = React.useState<string>('BTC')
    const [toCoin, setToCoin] = React.useState<string>('USD')
    const [converterInputFrom, setConverterInputFrom] = React.useState('')
    const [converterInputTo, setConverterInputTo] = React.useState<string | undefined>('')
    const [refreshing, setRefreshing] = React.useState<boolean>(true)

    async function getConvert(from: string, to: string) {
        setRefreshing(true)
        setFromCoin(from)
        setToCoin(to)
        const price = await coinsApi.getConvertPrice(from, to)
            .then(({ data }) => {
                const key = (data: any, i: number) => {
                    return data[Object.keys(data)[i]]
                }
                return key(key(key(data, 0), 0), 0).PRICE
            })
        setPrice(price)
        setTimeout(() => setRefreshing(false), 700)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setConverterInputFrom(e.target.value)
    }

    React.useEffect(() => {
        getConvert('BTC', 'USD')
    }, [])

    const convertOptions = ['BTC', 'ETH', 'USD']

    const outputConvertedValue = () => {
        setConverterInputTo((Number(converterInputFrom) * price!).toString())
    }

    return (
        <div className="converter">
            <div className="converter__container">
                <div className="converter__body">
                    <div className="converter__label">Convert</div>
                    <div className="converter__input input-converter">
                        <div className="input-converter__select">
                            <div className="input-converter__coins">
                                {convertOptions.map(option => (
                                    <div className={cn('input-converter__coin', { 'coin-active': fromCoin === option })}
                                        onClick={() => (
                                            // eslint-disable-next-line no-sequences
                                            setFromCoin(option),
                                            getConvert(option, toCoin)
                                        )}
                                        key={option}
                                    >
                                        {option}
                                    </div>),
                                )}
                            </div>
                        </div>
                        <div className="input-converter__input-field">
                            <input
                                type="number"
                                value={converterInputFrom}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="input-converter__note">1 {fromCoin} = {price?.toFixed(5)} {toCoin}</div>
                    </div>
                    <div className="converter__output">
                        <div className="input-converter__select">
                            <div className="input-converter__coins">
                                {convertOptions.map(option => (
                                    <div className={
                                        toCoin === option
                                            ? 'input-converter__coin coin-active'
                                            : 'input-converter__coin'
                                    }
                                        onClick={() => (
                                            // eslint-disable-next-line no-sequences
                                            setToCoin(option),
                                            getConvert(fromCoin, option)
                                        )}
                                        key={option}
                                    >
                                        {option}
                                    </div>),
                                )}
                            </div>
                        </div>
                        <div className="input-converter__input-field">
                            <input
                                type="text"
                                readOnly={true}
                                value={converterInputTo ? Number(converterInputTo).toFixed(5) : undefined}
                            />
                        </div>
                        <div className="input-converter__note">1 {toCoin} = {(1 / price!).toFixed(5)} {fromCoin}</div>
                    </div>
                </div>
                <div className="converter__action">
                    <div className="converter__button" onClick={() => (
                        // eslint-disable-next-line no-sequences
                        getConvert(fromCoin, toCoin),
                        outputConvertedValue()
                    )}>
                        <LocalActionButton label="convert" />
                    </div>
                    <div className={refreshing ? 'converter__refresh refreshing' : 'converter__refresh'}>
                        <img src={refresh} alt="refresh" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Converter

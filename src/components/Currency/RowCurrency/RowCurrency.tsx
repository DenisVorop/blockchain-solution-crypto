import React from 'react'

import LocalActionButton from '../../LocalActionButton/LocalActionButton'

import arrowB from '../../../assets/images/arrowB.svg'

interface RowCurrencyProps {
    label: string
    action: ((coin: string, value: number) => void) | null
}

const RowCurrency: React.FC<RowCurrencyProps> = ({ label, action }) => {
    const [currencyValue, setCurrencyValue] = React.useState<string>('')
    const [selectValue, setSelectValue] = React.useState<string>('BTC')
    const [buttonLabel, setButtonLabel] = React.useState<string>('')
    const [disabledButton, setDisabledButton] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (label === 'Buy deal') {
            return setButtonLabel('Buy')
        }
        setDisabledButton(true)
        return setButtonLabel('Sell')
    }, [label])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setCurrencyValue(e.target.value)
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setSelectValue(e.target.value)
    }

    const handleDeal = () => {
        action!(selectValue, +currencyValue)
        setCurrencyValue('')
    }

    return (
        <div className="currency__row row-currency">
            <div className="row-currency__label">{label}</div>
            <div className="row-currency__body">
                <div className="row-currency__enter">
                    <div className="row-currency__select ellipse">
                        <select
                            name="select"
                            value={selectValue}
                            id="select"
                            onChange={(e) => handleSelectChange(e)}
                        >
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                        </select>
                        <img src={arrowB} alt="arrow" />
                    </div>
                    <div className="row-currency__input">
                        <input
                            type="number"
                            placeholder="$ Enter amount"
                            value={buttonLabel === 'Buy' ? currencyValue : ''}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                </div>
                <button
                    className="row-currency__button"
                    disabled={disabledButton}
                    onClick={handleDeal}
                >
                    <LocalActionButton label={buttonLabel} />
                </button>
            </div>
        </div>
    )
}

export default React.memo(RowCurrency)

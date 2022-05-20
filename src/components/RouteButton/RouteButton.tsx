import React from 'react'
import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import arrowR from '../../assets/images/arrowR.svg'

import './routebutton.scss'

interface RouteButtonProps {
    Img: typeof arrowR
    link: string
    label: string
}

const RouteButton: React.FC<RouteButtonProps> = ({ Img, link, label }) => {
    const location = useLocation()
    const active = location.pathname === link

    return (
        <Link to={link} className={cn('route-button', {'route-button__active': active})}>
            <div className="route-button__image">
                <Img className={active ? 'route-button__stroke' : ''} />
            </div>
            <div className="route-button__label">{label}</div>
            <div className="route-button__arrow">
                {active ? <img src={arrowR} alt="arrowR" /> : null}
            </div>
        </Link>
    )
}

export default RouteButton

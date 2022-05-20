import React from 'react'
import { Outlet } from 'react-router-dom'

import RouteButton from '../../components/RouteButton/RouteButton'
import Converter from '../../components/Converter/Converter'

import {ReactComponent as profile} from '../../assets/images/profile.svg'
import {ReactComponent as dashboard} from '../../assets/images/dashboard.svg'
import logo from '../../assets/images/logo.svg'

import './sitebar.scss'

const Sitebar = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div className="sitebar">
                <div className="sitebar__container">
                    <div className="sitebar__body">
                        <div className="sitebar__top top-sitebar">
                            <div className="top-sitebar__logo">
                                <div className="top-sitebar__image">
                                    <img src={logo} alt="logo" />
                                </div>
                                <div className="top-sitebar__name">Blockchain Solutions</div>
                            </div>
                        </div>
                        <div className="sitebar__main main-sitebar">
                            <div className="main-sitebar__routes">
                                <RouteButton
                                    Img={profile}
                                    link={'/profile'}
                                    label={'Profile'}
                                />
                                <RouteButton
                                    Img={dashboard}
                                    link={'/'}
                                    label={'Dashboard'}
                                />
                            </div>
                            <div className="main-sitebar__converter">
                                <Converter />
                            </div>
                        </div>
                        <div className="sitebar__bottom bottom-sitebar">
                            <div className="bottom-sitebar__label">Created by Denis Voropaev</div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Sitebar

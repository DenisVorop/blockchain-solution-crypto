import React from 'react'
import cn from 'classnames'

import './localactionbutton.scss'

interface LocalActionButtonProps {
    label: string
}

const LocalActionButton: React.FC<LocalActionButtonProps> = ({ label }) => {
    return (
        <div className={cn('local-action-btn', { 'action-btn-hvr': label !== 'Sell' })}>
            <div className="local-action-label">{label}</div>
        </div>
    )
}

export default LocalActionButton

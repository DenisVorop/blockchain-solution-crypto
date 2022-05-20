import React from 'react'

import './localactionbutton.scss'

interface LocalActionButtonProps {
    label: string
}

const LocalActionButton: React.FC<LocalActionButtonProps> = ({label}) => {
    return (
        <div className="local-action-btn">
            <div className="local-action-label">{label}</div>
        </div>
    )
}

export default LocalActionButton

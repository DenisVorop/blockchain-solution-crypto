import React from 'react'
import cn from 'classnames'

import './error.scss'

interface ErrorProps {
    error: string
    visibleError: boolean
}

const Error: React.FC<ErrorProps> = ({ error, visibleError }) => {
    return (
        <div className={visibleError ? 'error' : ''} >
            <div className={cn('error-body', { 'error-visible': visibleError })}>
                <div className="block-error">
                    {error}
                </div>
            </div>
        </div>
    )
}

export default Error

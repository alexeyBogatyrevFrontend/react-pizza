import React from 'react'
import c from './MyButton.module.scss'

const MyButton = ({ children, ...props }) => {
    return (
        <button {...props} className={c.btn}>
            {children}
        </button>
    )
}

export default MyButton

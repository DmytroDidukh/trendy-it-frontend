import React, {useEffect, useState} from "react";

import {Spinner} from "../index";
import './style.scss'

const LoadingOverlay = ({isVisible}) => {
    const [hide, setHide] = useState(false)
    const [opacityToZero, setOpacityToZero] = useState(false)


    useEffect(() => {
        if (!isVisible) {
            setTimeout(() => setOpacityToZero(true), 500)
            setTimeout(() => setHide(true), 3000)
        }
    }, [isVisible])

    return (
        <div className={`loading-page ${opacityToZero && 'opacity'} ${hide && 'disabled'}`}>
            <h2>Trendy IT</h2>
            <Spinner/>
        </div>
    )
}

export default LoadingOverlay

import React from 'react';
import styles from './card.module.scss'

const Card = ({children, style, className=""}) => {
    return (
        <div className={`${styles._} ${className}`} style={style}>
            {children}
        </div>
    );
};

export default Card;
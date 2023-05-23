import React from 'react'
import styles from './Button.module.scss';
function Button({ Text, onClick, className, type = 'button', alertGuide }) {
  return (
    <div className={
      className ?? styles.containerButton 
    }>

      <button type={type}
        className={
          className
            ? styles.buttonGlobal
            : alertGuide
              ? `${styles.buttonGuide} ${styles.blinks}`
              : styles.buttonCreate
        }
        onClick={onClick} >{Text}
      </button>

    </div>
  )
}

export default Button;
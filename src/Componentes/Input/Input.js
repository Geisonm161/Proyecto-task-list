import React from 'react'
import styles from './Input.module.scss'

function Input({ name,
  placeholder,
  value,
  className,
  aboveInput,
  onChange,
  type,
  required,
  handleAlertCreateTask,
  alertguide }) {
  return (
    <div >
      <div className={className && styles.footInput}>{aboveInput}</div>
      <div>
        <input
          className={`${className ? styles.insideInput : styles.input} ${alertguide ? styles.alertInput : styles.alertInputNone}`}
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={handleAlertCreateTask}
          alertguide={alertguide}
        />
      </div>
    </div>
  )
}

export default Input
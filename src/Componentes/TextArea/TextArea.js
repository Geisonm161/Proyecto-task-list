import React from 'react'
import styles from './TextArea.module.scss';

function TextArea({ name,
  required,
  placeholder,
  value,
  abovetext,
  onChange
}) {
  return (
    <div>
      <div className={styles.footTextArea}>
        {abovetext}
      </div>

      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.insideInputTextArea} /> </div>
  )
}

export default TextArea
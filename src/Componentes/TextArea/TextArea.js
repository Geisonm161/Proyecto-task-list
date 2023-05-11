import React from 'react'
import './TextArea.css';

function TextArea({ name,
  required,
  placeholder,
  value,
  abovetext,
  onChange
}) {
  return (
    <div>
      <div className='foot-text-area'>
        {abovetext}
      </div>

      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='inside-input-textarea' /> </div>
  )
}

export default TextArea
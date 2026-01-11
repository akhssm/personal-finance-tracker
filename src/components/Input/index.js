import React from 'react'
import './styles.css'

function Input ({ label, setState, state, placeholder }) {
  return (
    <div className="input-wrapper">
        <p className="label-input">{label}</p>
        <input 
            value={state}
            placeholder={placeholder}
            onChange={(e) => setState(e.target.value)}
            className="custom-input"/>
    </div>
  );
}

export default Input

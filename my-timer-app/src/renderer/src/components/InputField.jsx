import React from 'react'

export default function InputField({ label, value, onChange, placeHolder }) {
  return (
    <div className="text-3xl">
      <label className="text-stone-300">{label}:</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className="w-20 bg-transparent text-blue-400"
      />
    </div>
  )
}

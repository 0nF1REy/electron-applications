import React, { useState } from 'react'
import InputField from './InputField'

export default function Timer({ isOverlay }) {
  const [isEditing, setIsEditing] = useState(true)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [hours, setHours] = useState(0)

  return (
    <div>
      {isEditing ? (
        // Time Setup
        <div>
          <InputField
            label={'Hours'}
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
          ></InputField>
          <InputField
            label={'Minutes'}
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          ></InputField>
          <InputField
            label={'Seconds'}
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          ></InputField>
        </div>
      ) : (
        // Timer
        <div></div>
      )}
    </div>
  )
}

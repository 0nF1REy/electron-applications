import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import alarm from '../assets/sounds/tuturu.mp3'

export default function Timer({ isOverlay, isEditing, setIsEditing }) {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [hours, setHours] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const audio = useMemo(() => new Audio(alarm), [])

  useEffect(() => {
    let intervalId
    if (isActive && !isEditing) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1)
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1)
          setSeconds(59)
        } else if (hours > 0) {
          setHours((prev) => prev - 1)
          setMinutes(59)
          setSeconds(59)
        } else {
          audio.play()
          clearInterval(intervalId)
          setIsActive(false)
        }
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [isActive, seconds, minutes, hours, audio, isEditing])

  const parseValue = (value) => parseInt(value) || 0

  const resetTimer = () => {
    setIsActive(false)
    setHours(0)
    setMinutes(1)
    setSeconds(0)
  }

  return (
    <div className="w-full text-center">
      {isEditing ? (
        <div className="flex flex-col items-center">
          <InputField
            label={'H'}
            value={hours}
            onChange={(e) => setHours(parseValue(e.target.value))}
          />
          <InputField
            label={'M'}
            value={minutes}
            onChange={(e) => setMinutes(parseValue(e.target.value))}
          />
          <InputField
            label={'S'}
            value={seconds}
            onChange={(e) => setSeconds(parseValue(e.target.value))}
          />
          <button
            className="font-digital text-2xl bg-amber-dark text-amber border border-amber px-8 py-1 mt-3"
            onClick={() => setIsEditing(false)}
          >
            [CONFIRM]
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="font-digital text-fallout-green text-7xl text-shadow-glow">
            <span>{hours.toString().padStart(2, '0')}</span>
            <span className="animate-pulse">:</span>
            <span>{minutes.toString().padStart(2, '0')}</span>
            <span className="animate-pulse">:</span>
            <span>{seconds.toString().padStart(2, '0')}</span>
          </div>

          <div
            id="timer-buttons"
            className={`
              mt-4 text-xl flex justify-center space-x-4
              ${!isOverlay ? 'visible' : 'hidden'}
            `}
          >
            {isActive ? (
              <>
                <button
                  onClick={() => setIsActive(false)}
                  className="bg-amber-dark text-amber border border-amber px-4 py-1"
                >
                  [PAUSE]
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-red-900 text-red-300 border border-red-300 px-4 py-1"
                >
                  [STOP]
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsActive(true)}
                  className="bg-fallout-green-dark text-fallout-green border border-fallout-green px-4 py-1"
                >
                  [START]
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-amber-dark text-amber border border-amber px-4 py-1"
                >
                  [EDIT]
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Validação das props
Timer.propTypes = {
  isOverlay: PropTypes.bool,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired
}

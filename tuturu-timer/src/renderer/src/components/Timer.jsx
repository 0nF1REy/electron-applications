import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import alarm from '../assets/sounds/tuturu.mp3'

function NixieDigit({ digit }) {
  return (
    <div className="relative w-12 h-20 flex items-center justify-center bg-metal-dark border border-metal-medium rounded">
      <div
        className="absolute inset-0 bg-repeat bg-center opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '3px 3px'
        }}
      ></div>
      <span className="relative text-6xl text-nixie-orange text-shadow-glow font-digital animate-flicker">
        {digit}
      </span>
    </div>
  )
}
NixieDigit.propTypes = { digit: PropTypes.string.isRequired }

function NixieDisplay({ hours, minutes, seconds }) {
  const time = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Horas */}
      <NixieDigit digit={time[0]} />
      <NixieDigit digit={time[1]} />
      <div className="text-6xl text-cyan-accent animate-pulse">:</div>
      {/* Minutos */}
      <NixieDigit digit={time[2]} />
      <NixieDigit digit={time[3]} />
      <div className="text-6xl text-cyan-accent animate-pulse">:</div>
      {/* Segundos */}
      <NixieDigit digit={time[4]} />
      <NixieDigit digit={time[5]} />
    </div>
  )
}
NixieDisplay.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number
}

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
    <div className="w-full flex flex-col items-center">
      {isEditing ? (
        <div className="w-4/5 flex flex-col items-center p-4 bg-metal-medium border border-metal-light rounded">
          <InputField
            label={'HOURS'}
            value={hours}
            onChange={(e) => setHours(parseValue(e.target.value))}
          />
          <InputField
            label={'MINUTES'}
            value={minutes}
            onChange={(e) => setMinutes(parseValue(e.target.value))}
          />
          <InputField
            label={'SECONDS'}
            value={seconds}
            onChange={(e) => setSeconds(parseValue(e.target.value))}
          />
          <button
            className="text-lg bg-cyan-dark text-cyan-accent border border-cyan-accent px-6 py-1 mt-4"
            onClick={() => setIsEditing(false)}
          >
            {'> SET DIVERGENCE'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <NixieDisplay hours={hours} minutes={minutes} seconds={seconds} />
          <div
            id="timer-buttons"
            className={`mt-4 text-md flex justify-center space-x-4 ${!isOverlay ? 'visible' : 'hidden'}`}
          >
            {isActive ? (
              <>
                <button
                  onClick={() => setIsActive(false)}
                  className="bg-metal-dark text-nixie-orange border border-nixie-orange px-4 py-1"
                >
                  {'// PAUSE'}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-red-900 text-red-300 border border-red-300 px-4 py-1"
                >
                  {'// ABORT'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsActive(true)}
                  className="bg-cyan-dark text-cyan-accent border border-cyan-accent px-4 py-1"
                >
                  {'> ENGAGE'}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-metal-dark text-nixie-orange border border-nixie-orange px-4 py-1"
                >
                  {'// CONFIG'}
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

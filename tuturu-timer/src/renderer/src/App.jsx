import { useState, useEffect } from 'react'
import TopBarComponent from './components/TopBar'
import Timer from './components/Timer'

function App() {
  const [isOverlay, setIsOverlay] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const toggleOverlay = () => {
      setIsOverlay((prev) => !prev)
    }
    window.electron.ipcRenderer.on('overlay-mode', toggleOverlay)
    return () => {
      window.electron.ipcRenderer.removeAllListeners('overlay-mode')
    }
  }, [])

  return (
    <div
      className={`
        h-screen w-screen overflow-hidden rounded-xl border-2 border-industrial-medium
        transition-all duration-500 relative scanline
        ${isEditing ? 'bg-background-edit' : 'bg-background-normal'}
        bg-cover bg-center
      `}
    >
      <div className={!isOverlay ? 'visible' : 'hidden'}>
        <TopBarComponent />
      </div>

      <div className="p-2 h-full flex flex-col justify-center items-center">
        <Timer isOverlay={isOverlay} isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
    </div>
  )
}

export default App

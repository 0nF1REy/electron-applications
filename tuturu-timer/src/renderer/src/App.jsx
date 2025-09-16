import { useState, useEffect } from 'react'
import TopBarComponent from './components/TopBar'
import Timer from './components/Timer'

import bgNormal from './assets/images/background-normal.jpg'
import bgEdit from './assets/images/background-edit.jpg'

function App() {
  const [isOverlay, setIsOverlay] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const toggleOverlay = () => setIsOverlay((prev) => !prev)
    window.electron.ipcRenderer.on('overlay-mode', toggleOverlay)
    return () => window.electron.ipcRenderer.removeAllListeners('overlay-mode')
  }, [])

  return (
    <div
      className="h-screen w-screen overflow-hidden rounded-xl border-2 border-metal-medium bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `url(${isEditing ? bgEdit : bgNormal})`
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex h-full flex-col">
        <div className={!isOverlay ? 'visible' : 'hidden'}>
          <TopBarComponent />
        </div>
        <div className="flex flex-grow items-center justify-center p-2">
          <Timer isOverlay={isOverlay} isEditing={isEditing} setIsEditing={setIsEditing} />
        </div>
      </div>
    </div>
  )
}

export default App

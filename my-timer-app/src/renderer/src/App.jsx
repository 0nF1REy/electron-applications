import TopBarComponent from './components/TopBar'
import { useState, useEffect } from 'react'
import Timer from './components/Timer'

function App() {
  const [isOverlay, setIsOverlay] = useState(false)

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
    <>
      <div className={!isOverlay ? 'visible' : 'invisible'}>
        <TopBarComponent />
      </div>
      <div
        className={
          !isOverlay
            ? 'bg-black bg-opacity-40 p-2 rounded-b-xl'
            : 'bg-black bg-opacity-40 p-2 rounded-xl'
        }
      >
        <Timer isOverlay={isOverlay} />
      </div>
    </>
  )
}

export default App

import TopBarComponent from './components/TopBar'
import { useState } from 'react'
import Timer from './components/Timer'

function App() {
  const [isOverlay, setIsOverlay] = useState(false)
  return (
    <>
      <TopBarComponent></TopBarComponent>
      <div className="bg-black bg-opacity-40 p-2 rounded-b-xl"></div>
      <Timer></Timer>
    </>
  )
}

export default App

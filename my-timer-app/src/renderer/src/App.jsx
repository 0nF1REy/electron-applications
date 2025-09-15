import TopBarComponent from './components/TopBar'
import { useState } from 'react'
import Timer from './components/Timer'

function App() {
  const [isOverlay, setIsOverlay] = useState(false)
  return (
    <>
      <TopBarComponent></TopBarComponent>
      <Timer></Timer>
    </>
  )
}

export default App

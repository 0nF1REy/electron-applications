export default function TopBarComponent() {
  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }

  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  return (
    <div
      className="bg-industrial-dark w-full h-8 flex justify-between items-center px-3 border-b-2 border-industrial-medium"
      style={{ WebkitAppRegion: 'drag' }}
    >
      <div className="text-fallout-green text-lg">TUTURU_TIMER_v3.0</div>
      <div className="text-fallout-green" style={{ WebkitAppRegion: 'no-drag' }}>
        <button className="px-2" onClick={handleMinimize}>
          _
        </button>
        <button className="px-2" onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  )
}

export default function TopBarComponent() {
  const handleClose = () => window.electron.ipcRenderer.send('close-window')
  const handleMinimize = () => window.electron.ipcRenderer.send('minimize-window')

  return (
    <div
      className="bg-metal-dark w-full h-8 flex justify-between items-center px-3 border-b-2 border-metal-medium"
      style={{ WebkitAppRegion: 'drag' }}
    >
      <div className="text-cyan-accent text-sm tracking-widest">
        FG-204 3rd Ed. "TUTURU" DIVERGENCE METER
      </div>
      <div className="text-cyan-accent" style={{ WebkitAppRegion: 'no-drag' }}>
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

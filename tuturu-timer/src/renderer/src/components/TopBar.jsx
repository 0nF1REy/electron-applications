export default function TopBarComponent() {
  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }

  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  return (
    <div
      className="rounded-t-xl bg-blue-400 w-full h-8 flex justify-end items-center"
      style={{ WebkitAppRegion: 'drag' }}
    >
      <div
        id="control-buttons"
        className="text-stone-200 pe-2"
        style={{ WebkitAppRegion: 'no-drag' }}
      >
        <button id="minimize" className="p-1" onClick={handleMinimize}>
          &#128469;
        </button>
        <button id="close" className="p-1" onClick={handleClose}>
          &#x2715;
        </button>
      </div>
    </div>
  )
}

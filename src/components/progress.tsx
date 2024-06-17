import { useEffect, useState } from 'react'
import { usePlayerStore } from '../store/player'

export default function Progress() {
  const currentTime = usePlayerStore(state => state.currentTime)
  const duration = usePlayerStore(state => state.duration)
  const seek = usePlayerStore(state => state.seek)
  const [width, setWidth] = useState(0)
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const offsetX = e.nativeEvent.offsetX
    const fullWidth = document.documentElement.clientWidth
    const radio = offsetX / fullWidth
    const nextCurrentTime = duration * radio
    seek(nextCurrentTime)
  }

  useEffect(() => {
    if (duration !== 0) {
      setWidth((currentTime / duration) * 100)
    }
  }, [currentTime, duration])

  return (
    <div className="absolute bottom-0 left-0 w-full bg-gray-500" onMouseDown={e => handleClick(e)}>
      <div
        className="bg-zinc-200 h-2"
        style={{ width: `${width}%` }}
      >
      </div>
    </div>
  )
}

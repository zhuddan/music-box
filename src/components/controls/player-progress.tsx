import { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '../../store/player'

export default function PlayerProgress({
  className,
  barHeight,
}: {
  className?: string | undefined
  barHeight?: number
}) {
  const currentTime = usePlayerStore(state => state.currentTime)
  const duration = usePlayerStore(state => state.duration)
  const seek = usePlayerStore(state => state.seek)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation()
    console.log(e)
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

  const barStyle: React.CSSProperties = {
    height: barHeight ? `${barHeight}px` : '60%',
  }

  return (
    <div
      className={`player-progress-container w-full flex items-center h-2  ${className}`}
      onClick={e => handleClick(e)}
      ref={containerRef}
    >
      <div
        className=" flex-1 bg-gray-500 rounded overflow-hidden"
        style={barStyle}
      >
        <div
          className="bg-zinc-200 h-full rounded"
          style={{ width: `${width}%` }}
        >
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '../../store/player'

export default function PlayerProgress({
  className,
  barHeight,
}: {
  className?: string | undefined
  barHeight?: number
}) {
  const {
    currentTime,
    duration,
    seek,
  } = usePlayerStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation()
    if (!containerRef.current)
      return
    const offsetX = e.nativeEvent.offsetX
    const fullWidth = containerRef.current.clientWidth
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
      className={`player-progress-container w-full flex items-center h-2 hover:cursor-pointer ${className}`}
      onClick={e => handleClick(e)}
      ref={containerRef}
    >
      <div
        className=" flex-1 bg-gray-300 rounded overflow-hidden"
        style={barStyle}
      >
        <div
          className="bg-primary h-full rounded "
          style={{ width: `${width}%` }}
        >
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '../../store/player'
import { useColors } from '../../hooks/useColors'

export default function PlayerProgress({
  className,
  barHeight,
}: {
  className?: string | undefined
  barHeight?: number
}) {
  const { currentTime, duration, seek } = usePlayerStore()
  const { colors } = useColors()

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

  /**
   * 监听 currentTime 更新进度条
   */
  useEffect(() => {
    if (duration !== 0) {
      setWidth((currentTime / duration) * 100)
    }
  }, [currentTime, duration])

  const barStyle: React.CSSProperties = {
    height: barHeight ? `${barHeight}px` : '60%',
    backgroundColor: colors[2],
  }

  return (
    <div
      className={`player-progress-container w-full flex items-center h-2 hover:cursor-pointer ${className}`}
      onClick={e => handleClick(e)}
      ref={containerRef}
    >
      <div
        className=" flex-1  rounded overflow-hidden"
        style={barStyle}
      >
        <div
          className=" h-full rounded "
          style={{
            width: `${width}%`,
            backgroundColor: colors[0],
          }}
        >
        </div>
      </div>
    </div>
  )
}

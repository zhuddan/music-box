import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useWavesurfer } from '@wavesurfer/react'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import { usePlayerStore } from '../../store/player'
import { useColors } from '../../hooks/useColors'

export function WaveSurferControl() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentSong, currentTime, seek, duration } = usePlayerStore()
  const { colors, base } = useColors()

  const handleClick = useCallback((radio: number) => {
    if (duration) {
      const nextCurrentTime = duration * radio
      seek(nextCurrentTime)
    }
  }, [seek, duration])

  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    height: 30,
    barGap: 1,
    barWidth: 1,
    waveColor: colors[1],
    progressColor: base,
    url: currentSong?.url,
    plugins: useMemo(() => {
      return [
        Hover.create({
          lineColor: base,
          lineWidth: 2,
          labelBackground: '#fff',
          labelColor: '#000',
          labelSize: '11px',
        }),
        Timeline.create({
          height: 10,
        }),
      ]
    }, [base]),
  })

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on('click', handleClick)
    }
    return () => {
      wavesurfer?.un('click', handleClick)
    }
  }, [handleClick, wavesurfer])

  useEffect(() => {
    wavesurfer?.setTime(currentTime)
  }, [currentTime, wavesurfer])

  return (
    <div className="h-16 flex items-center">
      <div className="w-full">
        <div ref={containerRef}></div>
      </div>
    </div>
  )
}

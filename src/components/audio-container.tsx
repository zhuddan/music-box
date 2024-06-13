import type { PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'
import { usePlayerStore } from '../state/player'

export default function AudioContainer({ children }: PropsWithChildren) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const isPlaying = usePlayerStore(state => state.isPlaying)
  const setCurrentTime = usePlayerStore(state => state.setCurrentTime)
  const setDuration = usePlayerStore(state => state.setDuration)

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  function onReady() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying)
        audioRef.current.play()
      else
        audioRef.current.pause()
    }
  }, [isPlaying])
  return (
    <>
      <audio
        onTimeUpdate={handleTimeUpdate}
        ref={audioRef}
        onCanPlay={onReady}
        src="/flow-211881.mp3"
      >
      </audio>
      {children}
    </>
  )
}

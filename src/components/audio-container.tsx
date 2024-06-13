import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash-es'
import { usePlayerStore } from '../state/player'

export default function AudioContainer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const isPlaying = usePlayerStore(state => state.isPlaying)
  const currentTime = usePlayerStore(state => state.currentTime)
  const setCurrentTime = usePlayerStore(state => state.setCurrentTime)
  const setDuration = usePlayerStore(state => state.setDuration)
  const [isSeeking, setIsSeeking] = useState(false)
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying)
        audioRef.current.play()
      else
        audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      const _currentTime = audioRef.current.currentTime
      if (currentTime !== _currentTime) {
        setIsSeeking(true)
        audioRef.current.currentTime = currentTime
        setIsSeeking(false)
      }
    }
  }, [currentTime])

  function log() {
    console.log(audioRef.current?.currentTime)
  }
  function handleTimeUpdate() {
    if (audioRef.current && !isSeeking) {
      setCurrentTime(audioRef.current.currentTime)
      log()
    }
  }

  function onReady() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  return (
    <audio
      onTimeUpdate={handleTimeUpdate}
      ref={audioRef}
      onCanPlay={onReady}
      src="/flow-211881.mp3"
    >
    </audio>
  )
}

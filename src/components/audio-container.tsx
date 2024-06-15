import { useEffect, useRef } from 'react'
import { usePlayerStore } from '../state/player'

export default function AudioContainer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const isPlaying = usePlayerStore(state => state.isPlaying)
  const isSeeking = usePlayerStore(state => state.isSeeking)
  const currentTime = usePlayerStore(state => state.currentTime)

  const setIsSeeking = usePlayerStore(state => state.setIsSeeking)
  const setIsPlaying = usePlayerStore(state => state.setIsPlaying)
  const setCurrentTime = usePlayerStore(state => state.setCurrentTime)
  const setDuration = usePlayerStore(state => state.setDuration)

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
      if (
        audioRef.current.currentTime !== currentTime && isSeeking
      ) {
        audioRef.current.currentTime = currentTime
        setCurrentTime(audioRef.current.currentTime)
        setIsSeeking(false)
      }
    }
  }, [currentTime, isPlaying, isSeeking, setCurrentTime, setIsSeeking])

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  function handleCanPlay() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  function handleEnded() {
    if (audioRef.current) {
      setIsPlaying(false)
    }
  }

  return (
    <audio
      onTimeUpdate={handleTimeUpdate}
      ref={audioRef}
      onCanPlay={handleCanPlay}
      onEnded={handleEnded}
      src="/The Clouds in Camarillo.mp3"
    >
    </audio>
  )
}

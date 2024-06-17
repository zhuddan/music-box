import { useEffect, useRef } from 'react'
import { usePlayerStore } from '../store/player'

export default function AudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    isPlaying,
    isSeeking,
    currentTime,
    setIsSeeking,
    toggle,
    setIsPlaying,
    setCurrentTime,
    setDuration,
  } = usePlayerStore()

  useEffect(() => {
    if (audioRef.current) {
      console.log('isPlaying', isPlaying)
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
        if (!isPlaying) {
          toggle()
        }
      }
    }
  }, [currentTime, isPlaying, isSeeking, setCurrentTime, setIsSeeking, toggle])

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
      // src="/audios/06 Solat Recitation Al Fatihah_revised.mp3"
      src="/The Clouds in Camarillo.mp3"
    >
    </audio>
  )
}

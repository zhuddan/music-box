import { useEffect, useRef } from 'react'
import { usePlayerStore } from '../../store/player'

export default function AudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    isPlaying,
    _isSeeking,
    _isCutSong,
    currentTime,
    currentSong,
    onSeek,
    pause,
    onCutSong,
    setCurrentTime,
    setDuration,
  } = usePlayerStore()

  const src = currentSong?.name ? `/${currentSong?.name}.mp3` : undefined

  useEffect(() => {
    try {
      try {
        if (isPlaying)
          audioRef.current?.play()
        else audioRef.current?.pause()
      }
      catch (error) {
        console.log(error)
      }
    }
    catch (error) {
      console.log(error)
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      if (
        audioRef.current.currentTime !== currentTime && _isSeeking
      ) {
        audioRef.current.currentTime = currentTime
        onSeek()
      }
    }
  }, [currentTime, _isSeeking, onSeek])

  useEffect(() => {
    if (_isCutSong && isPlaying) {
      pause()
    }
  }, [_isCutSong, isPlaying, pause])

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  function handleCanPlay() {
    console.log('handleCanPlay')
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      if (_isCutSong) {
        onCutSong()
      }
    }
  }

  function handleEnded() {
    if (audioRef.current) {
      pause()
    }
  }

  function handleError(e: React.SyntheticEvent<HTMLAudioElement, Event>,
  ) {
    console.log(e)
  }

  return (
    <audio
      onTimeUpdate={handleTimeUpdate}
      ref={audioRef}
      onCanPlay={handleCanPlay}
      onEnded={handleEnded}
      onError={handleError}
      src={src}
    >
    </audio>
  )
}

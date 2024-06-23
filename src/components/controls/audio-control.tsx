import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useEvent } from 'react-use'
import { usePlayerStore } from '../../store/player'
import { useKeyControl } from '../../hooks/useKeyControl'

export default function AudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    isPlaying,
    _isSeeking,
    _isCutSong,
    currentTime,
    currentSong,
    playEnd,
    seek,
    onSeek,
    pause,
    onCutSong,
    setCurrentTime,
    setDuration,
  } = usePlayerStore()

  useKeyControl()

  const src = useMemo(() => {
    return currentSong?.url
  }, [currentSong])

  /**
   * 播放控制
   */
  useEffect(() => {
    try {
      if (isPlaying)
        audioRef.current?.play()
      else
        audioRef.current?.pause()
    }
    catch (error) {
      console.log(error)
    }
  }, [isPlaying])

  /**
   * 播放进度控制
   */
  useEffect(() => {
    if (audioRef.current) {
      if (
        audioRef.current.currentTime !== currentTime && _isSeeking
      ) {
        audioRef.current.currentTime = currentTime
        // document.querySelector('audio')!.currentTime = 100
        // console.log(document.querySelector('audio'))
        // console.log(document.querySelector('audio')?.currentTime)
        // console.log('audioRef.current.currentTime', audioRef.current.currentTime)
      }
    }
  }, [currentTime, _isSeeking])

  /**
   * 切歌控制
   */
  useEffect(() => {
    if (_isCutSong && isPlaying) {
      if (currentTime) {
        seek(currentTime)
      }
      pause()
    }
  }, [_isCutSong, currentTime, isPlaying, pause, seek])

  /**
   * 刷新控制
   */
  useEvent('beforeunload', () => {
    // 在页面刷新或关闭时 暂停播放
    // 因为已经持久化了
    pause()
  }, window)

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      if (!_isSeeking) {
        setCurrentTime(audioRef.current.currentTime)
      }
      else {
        onSeek()
      }
    }
  }, [_isSeeking, onSeek, setCurrentTime])

  function handleCanPlay() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      if (_isCutSong) {
        onCutSong()
      }
      else {
        if (audioRef.current.currentTime !== currentTime) {
          audioRef.current.currentTime = currentTime
        }
      }
    }
  }

  function handleEnded() {
    if (audioRef.current) {
      playEnd()
    }
  }

  function handleError(e: React.SyntheticEvent<HTMLAudioElement, Event>) {
    console.log(e)
  }

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onCanPlay={handleCanPlay}
      onEnded={handleEnded}
      onError={handleError}
      key={src}
      src={src}
      id="audio"
    >
    </audio>
  )
}

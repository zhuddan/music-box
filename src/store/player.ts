import { create } from 'zustand'

const songs: Song.Song[] = [
  {
    id: '1',
    cover: '/cover/The Clouds in Camarillo.jpg',
    name: 'The Clouds in Camarillo',
    artist: 'Brazzaville - Topic',
    duration: 203.337143,
  },
  {
    id: '2',
    cover: '/cover/花与剑.webp',
    name: '花与剑',
    artist: 'js',
    duration: 247.719184,
  },
]

const playerMode: PlayerNamespace.PlayMode[] = [
  'repeat-one',
  'repeat-list',
  'order-list',
  'shuffle',
]

export const usePlayerStore = create<PlayerNamespace.PlayerStore>((set, get) => ({
  songs,
  isPlaying: false,
  currentSong: null,
  currentTime: 0,
  _isSeeking: false,
  _isCutSong: false,
  duration: 0,
  playMode: 'repeat-one',
  play: () => {
    const { setIsPlaying } = get()
    setIsPlaying(true)
  },
  pause: () => {
    const { setIsPlaying } = get()
    setIsPlaying(false)
  },
  setDuration: (duration) => {
    return set({ duration })
  },
  setCurrentTime: (currentTime) => {
    return set({ currentTime })
  },
  setIsPlaying: (value) => {
    const { currentSong } = get()
    if (!currentSong) {
      console.warn('no song')
      return
    }
    return typeof value === 'boolean' ? set({ isPlaying: value }) : set(value)
  },
  seek: (currentTime) => {
    const { currentSong } = get()
    if (!currentSong) {
      console.warn('no song')
      return
    }
    return set({ currentTime, _isSeeking: true })
  },
  onSeek() {
    console.log('onSeek')
    const { currentSong } = get()
    if (!currentSong) {
      console.warn('no song')
      return
    }
    return set({
      _isSeeking: false,
      isPlaying: true,
    })
  },
  skip: async (value: number) => {
    const { duration, currentTime, seek } = get()
    const min = 0
    const max = duration - 1
    const _currentTime = currentTime + value
    const nextCurrentTime = _currentTime <= min
      ? min
      : _currentTime >= max
        ? max
        : _currentTime
    seek(nextCurrentTime)
  },
  cutSong: (song) => {
    return set({ currentSong: song, currentTime: 0, _isCutSong: true })
  },
  onCutSong: () => {
    return set({ isPlaying: true, _isCutSong: false })
  },
  toNextSong: () => {
    const {
      songs,
      currentSong,
      cutSong,
    } = get()
    const currentSongIndex = songs.findIndex(song => song.id === currentSong?.id)
    const nextSongIndex = (currentSongIndex + 1) % songs.length
    const nextSong = songs[nextSongIndex]
    if (!nextSong) {
      console.warn('no nextSong')
      return
    }
    cutSong(nextSong)
  },
  toPrevSong: () => {
    const {
      songs,
      currentSong,
      cutSong,
    } = get()
    const currentSongIndex = songs.findIndex(song => song.id === currentSong?.id)
    const prevSongIndex = (songs.length + currentSongIndex - 1) % songs.length
    const prevSong = songs[prevSongIndex]
    if (!prevSong) {
      console.warn('no prevSong')
      return
    }
    cutSong(prevSong)
  },
  togglePlayMode() {
    const { currentSong, playMode } = get()
    if (!currentSong) {
      console.warn('no song')
      return
    }
    const index = (playerMode.indexOf(playMode) + 1) % playerMode.length
    const nextPlayMode = playerMode[index]
    set({ playMode: nextPlayMode })
  },

  playEnd() {
    const { playMode, currentSong, songs, cutSong, seek, toNextSong, pause } = get()
    pause()
    if (!currentSong) {
      return
    }

    const currentIndex = songs.findIndex(song => song.id === currentSong?.id)
    console.log('end', playMode)
    switch (playMode) {
      case 'repeat-one':
        seek(0) // Start the current song from the beginning
        set({ _isCutSong: true })
        break
      case 'repeat-list':
        toNextSong() // Go to the next song in the list
        break
      case 'order-list':
        if (currentIndex === songs.length - 1) {
          // pause() // Pause at the end of the list
        }
        else {
          toNextSong() // Go to the next song in the list
        }
        break
      case 'shuffle':
        // eslint-disable-next-line no-case-declarations
        const randomIndex = Math.floor(Math.random() * songs.length)
        // eslint-disable-next-line no-case-declarations
        const randomSong = songs[randomIndex]
        cutSong(randomSong) // Play a random song
        break
    }
  },
}))

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
    get().setIsPlaying(true)
  },
  pause: () => {
    get().setIsPlaying(false)
  },
  setDuration: (duration) => {
    return set({ duration })
  },
  setCurrentTime: (currentTime) => {
    return set({ currentTime })
  },
  setIsPlaying: (value) => {
    if (!get().currentSong) {
      console.warn('no song')
      return
    }
    return typeof value === 'boolean' ? set({ isPlaying: value }) : set(value)
  },
  seek: (currentTime) => {
    if (!get().currentSong) {
      console.warn('no song')
      return
    }
    return set({ currentTime, _isSeeking: true })
  },
  onSeek() {
    console.log('onSeek')
    if (!get().currentSong) {
      console.warn('no song')
      return
    }
    return set({
      _isSeeking: false,
      isPlaying: true,
    })
  },
  skip: async (value: number) => {
    const min = 0
    const max = get().duration - 1
    const currentTime = get().currentTime + value
    const nextCurrentTime = currentTime <= min
      ? min
      : currentTime >= max
        ? max
        : currentTime
    get().seek(nextCurrentTime)
  },
  cutSong: (song) => {
    return set({ currentSong: song, currentTime: 0, _isCutSong: true })
  },
  onCutSong: () => {
    return set({ isPlaying: true, _isCutSong: false })
  },
  toNextSong: () => {
    const currentSongIndex = get().songs.findIndex(song => song.id === get().currentSong?.id)
    const nextSongIndex = currentSongIndex + 1
    const nextSong = get().songs[nextSongIndex]
    if (!nextSong) {
      console.warn('no nextSong')
      return
    }
    get().cutSong(nextSong)
  },
  toPrevSong: () => {
    const currentSongIndex = get().songs.findIndex(song => song.id === get().currentSong?.id)
    const prevSongIndex = currentSongIndex - 1
    const prevSong = get().songs[prevSongIndex]
    if (!prevSong) {
      console.warn('no prevSong')
      return
    }
    get().cutSong(prevSong)
  },
  togglePlayMode() {
    if (!get().currentSong) {
      console.warn('no song')
      return
    }
    const index = (playerMode.indexOf(get().playMode) + 1) % playerMode.length
    const nextPlayMode = playerMode[index]
    set({ playMode: nextPlayMode })
  },

  playEnd() {
    const { playMode, currentSong, songs, cutSong, seek, toNextSong, pause } = get()
    if (!currentSong) {
      return
    }

    const currentIndex = songs.findIndex(song => song.id === get().currentSong?.id)
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
          pause() // Pause at the end of the list
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

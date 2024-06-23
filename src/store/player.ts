import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// persist
const playerMode: PlayerNamespace.PlayMode[] = [
  'repeat-one',
  'repeat-list',
  'order-list',
  'shuffle',
]

export const usePlayerStore = create<PlayerNamespace.PlayerStore>()(
  devtools(
    // persist(
    (set, get) => ({
      speed: 1,
      songs: [],
      isPlaying: false,
      currentSong: null,
      currentTime: 0,
      _isSeeking: false,
      _isCutSong: false,
      duration: 0,
      playMode: 'repeat-one',
      setSongs: (songs: Song.Song[]) => {
        return set({ songs })
      },
      play: () => {
        const { setIsPlaying } = get()
        setIsPlaying(true)
      },
      pause: () => {
        const { setIsPlaying } = get()
        setIsPlaying(false)
      },
      setIsSeeking(_isSeeking) {
        console.log('setIsSeeking')
        return set({ _isSeeking })
      },
      setDuration: (duration) => {
        return set({ duration })
      },
      setCurrentTime: (currentTime) => {
        return set({ currentTime })
      },
      setCurrentSong(currentSong) {
        return set({ currentSong })
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
        get().setCurrentSong(song)
        return set({ currentTime: 0, _isCutSong: true })
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
      setSpeed: (speed: number) => {
        return set({ speed })
      },
      playEnd() {
        const { playMode, currentSong, songs, cutSong, seek, toNextSong, pause } = get()
        pause()
        if (!currentSong) {
          return
        }

        const currentIndex = songs.findIndex(song => song.id === currentSong?.id)
        console.log('playMode', playMode)
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
    }),
    // { name: 'playerStore' },
    // ),
  ),
)

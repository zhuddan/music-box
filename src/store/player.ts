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
interface PlayerState {
  _isSeeking: boolean
  _isCutSong: boolean
  isPlaying: boolean
  currentTime: number
  duration: number
  currentSong: Song.Song | null
  songs: Song.Song[]
}
interface PlayerActions {
  play: () => void
  pause: () => void
  setDuration: (value: number) => void
  setCurrentTime: (value: number) => void
  setIsPlaying: (value: boolean | SetFunction) => void
  seek: (value: number) => void
  skip: (value: number) => void
  cutSong: (value: Song.Song) => void
  onSeek: () => void
  onCutSong: () => void
}

type PlayerStore = PlayerState & PlayerActions

type SetFunction = (set: PlayerStore) => PlayerStore | Partial<PlayerStore>

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  songs,
  isPlaying: false,
  currentSong: null,
  currentTime: 0,
  _isSeeking: false,
  _isCutSong: false,
  duration: 0,
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
    return set({ currentSong: song, _isCutSong: true })
  },
  onCutSong: () => {
    return set({ isPlaying: true, _isCutSong: false })
  },
}))

import { create } from 'zustand'
import { faker } from '@faker-js/faker'

const songs: Song.Song[] = [
  {
    id: '1',
    cover: faker.image.avatarGitHub(),
    name: 'The Clouds in Camarillo',
    artist: 'Brazzaville - Topic',
    duration: 203.337143,
  },
  {
    id: '2',
    cover: faker.image.avatarGitHub(),
    name: '花与剑',
    artist: 'js',
    duration: 247.719184,
  },
]
interface PlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  isSeeking: boolean

  currentSong: Song.Song | null
  list: Song.Song[]
  isToggleSong: boolean
}
interface PlayerActions {
  toggle: () => void
  play: () => void
  pause: () => void
  setDuration: (value: number) => void
  setIsSeeking: (value: boolean) => void
  setIsToggleSong: (value: boolean) => void
  setCurrentTime: (value: number) => void
  setIsPlaying: (value: boolean) => void
  seek: (value: number) => void
  skip: (value: number) => void
  playSong: (value: Song.Song) => void
}

type PlayerStore = PlayerState & PlayerActions

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  list: songs,
  isPlaying: false,
  currentSong: null,
  currentTime: 0,
  isSeeking: false,
  isToggleSong: false,
  duration: 0,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setDuration: duration => set({ duration }),
  setCurrentTime: currentTime => set({ currentTime }),
  setIsPlaying: isPlaying => set({ isPlaying }),
  setIsSeeking: isSeeking => set({ isSeeking }),
  setIsToggleSong: isToggleSong => set({ isToggleSong }),
  seek: (currentTime) => {
    return set({ currentTime, isSeeking: true })
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
  toggle: () => set(state => ({ isPlaying: !state.isPlaying })),
  playSong: (song) => {
    set({ currentSong: song, isToggleSong: true })
  },
}))

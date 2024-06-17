import { create } from 'zustand'
import { sleep } from '../utils/sleep'

interface PlayerStore {
  isPlaying: boolean
  currentSong: Song.Song | null
  currentTime: number
  duration: number
  isSeeking: boolean

  toggle: () => void
  play: () => void
  pause: () => void
  setDuration: (value: number) => void
  setIsSeeking: (value: boolean) => void
  setCurrentTime: (value: number) => void
  setIsPlaying: (value: boolean) => void
  seek: (value: number) => void
  skip: (value: number) => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  isPlaying: false,
  currentSong: null,
  currentTime: 0,
  isSeeking: false,
  duration: 0,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  setDuration: duration => set({ duration }),
  setCurrentTime: currentTime => set({ currentTime }),
  setIsPlaying: isPlaying => set({ isPlaying }),
  setIsSeeking: isSeeking => set({ isSeeking }),
  seek: (currentTime) => {
    return set({ currentTime, isSeeking: true })
  },
  skip: async (value: number) => {
    const min = 0
    const max = get().duration - 1
    const currentTime = get().currentTime + value
    const nextCurrentTime = currentTime <= min ? min : currentTime >= max ? max : currentTime
    await sleep(1000)
    get().seek(nextCurrentTime)
  },
  toggle: () => set(state => ({ isPlaying: !state.isPlaying })),
}))

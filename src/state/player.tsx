import { create } from 'zustand'

interface PlayerStore {
  isPlaying: boolean
  currentSong: Song.Song | null
  currentTime: number
  duration: number
  play: () => void
  pause: () => void
  setDuration: (duration: number) => void
  setCurrentTime: (duration: number) => void
  setIsPlaying: (isPlaying: boolean) => void
}

export const usePlayerStore = create<PlayerStore>()(set => ({
  isPlaying: false,
  currentSong: null,
  currentTime: 0,
  duration: 0,
  play: () => {
    return set({ isPlaying: true })
  },
  pause: () => {
    return set({ isPlaying: false })
  },
  setDuration: (duration) => {
    return set({ duration })
  },
  setCurrentTime: (currentTime) => {
    return set({ currentTime })
  },
  setIsPlaying: (isPlaying) => {
    return set({ isPlaying })
  },
}),
)

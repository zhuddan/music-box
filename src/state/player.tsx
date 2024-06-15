import { create } from 'zustand'

interface PlayerStore {
  isPlaying: boolean
  currentSong: Song.Song | null
  currentTime: number
  duration: number
  isSeeking: boolean
  play: () => void
  pause: () => void
  setDuration: (value: number) => void
  setIsSeeking: (value: boolean) => void
  setCurrentTime: (value: number) => void
  setIsPlaying: (value: boolean) => void
  seek: (value: number) => void
}

export const usePlayerStore = create<PlayerStore>()(set => ({
  isPlaying: true,
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
  seek: currentTime => set({ currentTime, isSeeking: true }),
}),
)

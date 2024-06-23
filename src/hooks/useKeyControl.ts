import { useKey } from 'react-use'
import { usePlayerStore } from '../store/player'

export function useKeyControl() {
  const {
    setIsPlaying,
    skip,
  } = usePlayerStore()

  useKey(' ', () => {
    toggle()
  })
  useKey('ArrowLeft', () => {
    skip(-1)
  })
  useKey('ArrowRight', () => {
    skip(1)
  })

  function toggle() {
    setIsPlaying((set) => {
      if (set.isPlaying) {
        console.log('set.currentTime', set.currentTime)
      }
      return ({ isPlaying: !set.isPlaying })
    })
  }
}

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
    skip(-5)
  })
  useKey('ArrowRight', () => {
    skip(5)
  })

  function toggle() {
    setIsPlaying(set => ({ isPlaying: !set.isPlaying }))
  }
}

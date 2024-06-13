import { usePlayerStore } from '../state/player'

export default function Progress() {
  const currentTime = usePlayerStore(state => state.currentTime)
  const duration = usePlayerStore(state => state.duration)

  let width = 0
  if (duration !== 0) {
    width = (currentTime / duration) * 100
  }

  return (
    <div className="absolute bottom-0 left-0 w-full bg-gray-50">
      <div
        className="bg-zinc-200 h-2"
        style={{ width: `${width}%` }}
      >
      </div>
    </div>
  )
}

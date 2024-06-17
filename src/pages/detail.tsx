import { useNavigate } from 'react-router-dom'
import { Lyric } from '../components/lyric'
import { Player } from '../components/player'
import { usePlayerStore } from '../store/player'
import MdiNavigateBefore from '~icons/mdi/navigate-before'

export default function Detail() {
  const navigateTo = useNavigate()
  const { currentSong } = usePlayerStore()
  function handleBack() {
    navigateTo(-1)
  }
  return (
    <div className="bg-background">
      <div className="h-10 bg-primary flex items-center text-white">
        <MdiNavigateBefore onClick={handleBack} fontSize="2em"></MdiNavigateBefore>
        <span className="flex-1 text-center pr-8 ">
          { currentSong?.name}
        </span>
      </div>
      <div
        className="overflow-hidden"
        style={{
          height: 'calc(100vh - 7.5rem)',
        }}
      >
        <Lyric></Lyric>
      </div>
      <Player></Player>
    </div>
  )
}

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Lyric } from '../components/lyric'
import { PlayerControl } from '../components/player-control'
import { usePlayerStore } from '../store/player'
import MdiNavigateBefore from '~icons/mdi/navigate-before'

export default function Detail() {
  const navigateTo = useNavigate()
  const [params] = useSearchParams()
  const { currentSong, songs, cutSong } = usePlayerStore()
  function handleBack() {
    navigateTo(-1)
  }

  useEffect(() => {
    if (!currentSong) {
      const id = params.getAll('id')?.[0]
      if (id) {
        const song = songs.find(e => e.id === id)
        if (song) {
          cutSong(song)
        }
      }
    }
  }, [currentSong, cutSong, params, songs])
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
      <PlayerControl></PlayerControl>
    </div>
  )
}

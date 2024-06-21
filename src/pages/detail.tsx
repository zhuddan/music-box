import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Lyric } from '../components/song/lyric'
import { PlayerControl } from '../components/controls/player-control'
import { usePlayerStore } from '../store/player'
import Button from '../components/button'
import MdiNavigateBefore from '~icons/mdi/navigate-before'

export default function Detail() {
  const navigateTo = useNavigate()
  const [params, setParams] = useSearchParams()
  const { currentSong, songs, setCurrentSong } = usePlayerStore()
  function handleBack() {
    navigateTo(-1)
  }

  /**
   * 获取歌曲
   */
  useEffect(() => {
    const id = params.getAll('id')?.[0]
    if (!currentSong) {
      if (id) {
        const song = songs.find(e => e.id === id)
        if (song) {
          setCurrentSong(song)
        }
      }
    }
    else {
      if (currentSong.id !== id) {
        setParams({ id: currentSong.id }, { replace: true })
      }
    }
  }, [setParams, setCurrentSong, currentSong, params, songs])
  return (
    <div className="bg-background">
      <div className="h-10 bg-primary flex items-center text-white">
        <Button icon={<MdiNavigateBefore />} onClick={handleBack}>
        </Button>
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

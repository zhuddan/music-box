import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Lyric } from '../components/song/lyric'
import { PlayerControl } from '../components/controls/player-control'
import { usePlayerStore } from '../store/player'
import Button from '../components/button'
import { WaveSurferControl } from '../components/controls/wave-surfer-control'
import { useColors } from '../hooks/useColors'
import MdiNavigateBefore from '~icons/mdi/navigate-before'

export default function Detail() {
  const navigateTo = useNavigate()
  const [params, setParams] = useSearchParams()
  const { currentSong, songs, setCurrentSong } = usePlayerStore()

  const { colors, base } = useColors()
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
    <div
      className="bg-background transition-all duration-1000"
      style={{
        backgroundColor: colors[4],
      }}
    >
      <div
        className="h-10  flex items-center transition-all duration-1000"
        style={{
          color: base,
        }}
      >
        <Button icon={<MdiNavigateBefore />} onClick={handleBack}>
        </Button>
        <span className="flex-1 font-bold text-center pr-8 ">
          { currentSong?.name}
        </span>
      </div>
      <div
        className="overflow-hidden"
        style={{
          height: 'calc(100vh - 2.5rem - 64px - 64px)',
        }}
      >
        <Lyric></Lyric>
      </div>
      <PlayerControl></PlayerControl>
      <WaveSurferControl></WaveSurferControl>
    </div>
  )
}

// cspell:disable

import { usePlayerStore } from '../store/player'
import SongItem from '../components/song/song-item'
import { PlayerControlMini } from '../components/controls/player-control-mini'
import { useColors } from '../hooks/useColors'

function SongList() {
  const { currentSong, songs } = usePlayerStore()
  return songs.map((song) => {
    return (
      <SongItem
        key={song.id}
        isActive={currentSong?.id === song.id}
        song={song}
      >
      </SongItem>
    )
  })
}

export default function Main() {
  const { colors } = useColors()
  return (
    <div
      className="bg-background min-h-[100vh] overflow-hidden transition-all duration-1000"
      style={{
        backgroundColor: colors[4],
      }}
    >
      <div className="pb-20">
        <SongList></SongList>
      </div>
      <PlayerControlMini></PlayerControlMini>
    </div>
  )
}

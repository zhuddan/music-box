// cspell:disable
import { PlayerControlMini } from '../components/controls/player-control-mini'
import SongItem from '../components/song/song-item'
import { usePlayerStore } from '../store/player'

function List() {
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
  return (
    <div className="bg-background">
      <div className="pb-20">
        <List></List>
      </div>
      <PlayerControlMini></PlayerControlMini>
    </div>
  )
}

// cspell:disable

import { usePlayerStore } from '../store/player'
import SongItem from '../components/song/song-item'
import { PlayerControlMini } from '../components/controls/player-control-mini'

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
    <div className="bg-background min-h-[100vh] overflow-hidden">
      <div className="pb-20">
        <List></List>
      </div>
      <PlayerControlMini></PlayerControlMini>
    </div>
  )
}

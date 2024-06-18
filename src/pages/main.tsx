// cspell:disable
import { Player } from '../components/player'
import SongItem from '../components/song-item'
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
      <div
        className="overflow-hidden"
        style={{
          height: 'calc(100vh - 5rem)',
        }}
      >
        <List></List>
      </div>
      <Player></Player>
    </div>
  )
}

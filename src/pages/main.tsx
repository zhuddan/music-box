// cspell:disable
import { faker } from '@faker-js/faker'
import { Player } from '../components/player'
import SongItem from '../components/song-item'
import { usePlayerStore } from '../store/player'

const songs: Song.Song[] = [
  {
    id: '1',
    cover: faker.image.avatarGitHub(),
    name: 'The Clouds in Camarillo',
    artist: 'Brazzaville - Topic',
    duration: 203.337143,
  },
  {
    id: '2',
    cover: faker.image.avatarGitHub(),
    name: '花与剑',
    artist: 'js',
    duration: 247.719184,
  },
]

function List() {
  const { currentSong } = usePlayerStore()
  return songs.map((song) => {
    return <SongItem key={song.id} isActive={currentSong?.id === song.id} song={song}></SongItem>
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

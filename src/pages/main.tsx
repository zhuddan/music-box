import { random, uniqueId } from 'lodash-es'
import { faker } from '@faker-js/faker'
import { useEffect } from 'react'
import { Player } from '../components/player'
import SongItem from '../components/song-item'

const songs: Song.Song[] = Array.from({
  length: 20,
}).map((_) => {
  const res: Song.Song = {
    id: uniqueId(),
    cover: faker.image.avatarGitHub(),
    name: faker.person.firstName(),
    artist: faker.person.firstName(),
    duration: random(60 * 3, 60 * 4 - 5),
  }
  return res
})

function List() {
  return songs.map((song, index) => {
    return <SongItem key={song.id} isActive={index === 0} song={song}></SongItem>
  })
}

export default function Main() {
  return (
    <div className="bg-background">
      <ul className="pb-20 overflow-hidden">
        <List></List>
      </ul>
      <Player></Player>
    </div>
  )
}

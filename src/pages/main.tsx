// cspell:disable

// import { random, uniqueId } from 'lodash-es'
// import { faker } from '@faker-js/faker'
import { Player } from '../components/player'
// import SongItem from '../components/song-item'

// const songs: Song.Song[] = Array.from({
//   length: 20,
// }).map((_) => {
//   const res: Song.Song = {
//     id: uniqueId(),
//     cover: faker.image.avatarGitHub(),
//     name: faker.person.firstName(),
//     artist: faker.person.firstName(),
//     duration: random(60 * 3, 60 * 4 - 5),
//   }
//   return res
// })

// function List() {
//   return songs.map((song, index) => {
//     return <SongItem key={song.id} isActive={index === 0} song={song}></SongItem>
//   })
// }

function Lyric() {
  return (
    <>
      <h2 className="text-3xl">
        Bismillahir Rahmanir Rahim.
      </h2>
      <ol className="list-decimal leading-loose text-2xl">
        <li>Alhamdu lillahi Rabbil 'alameen.</li>
        <li>Ar-Rahmanir Rahim.</li>
        <li>Maliki yawmid-deen.</li>
        <li>Iyyaka na'budu wa iyyaka nasta'een.</li>
        <li>Ihdinas-siratal-mustaqeem.</li>
        <li>
          Siratal-lazeena an'amta 'alaihim ghairil-maghdoobi 'alaihim wa lad-dalleen.
          Empty space, drag to resize
        </li>
      </ol>

    </>
  )
}

export default function Main() {
  return (
    <div className="bg-background">
      <div className="pb-20 min-h-[100vh] box-border p-20 overflow-hidden">
        {/* <List></List> */}
        {/* <Lyric></Lyric> */}
      </div>
      <Player></Player>
    </div>
  )
}

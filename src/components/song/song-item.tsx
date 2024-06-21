import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { usePlayerStore } from '../../store/player'
import no_song_img from '../../assets/no-song.png'
import { formatTime } from '../../utils/formatTime'

const base = `grid m-2 rounded-md p-4 auto-cols-auto gap-x-4 drop-shadow`

export default function SongItem({ song, isActive }: PropsWithChildren<{
  song: Song.Song
  isActive?: boolean
}>) {
  const { cutSong: playSong } = usePlayerStore()
  const duration = formatTime(song.duration)
  const className = useMemo(() => {
    return `${base} ${isActive ? 'bg-primary text-white' : 'bg-white'}`
  }, [isActive])

  function handleClick() {
    playSong(song)
  }

  return (
    <li
      className={className}
      style={{ gridTemplateColumns: 'auto 1fr auto' }}
      onClick={handleClick}
    >
      <div className="col-start-1 row-span-2 size-12 rounded-full drop-shadow">
        <LazyLoadImage
          style={{ objectFit: 'cover' }}
          className="h-full w-full"
          src={song.cover || no_song_img}
        />
      </div>
      <span className="col-start-2 text-nowrap row-start-1 w-10 font-bold md:text-xl">{song.name}</span>
      <span className="col-start-2 row-start-2 w-100">{song.artist}</span>
      <span className="col-start-3 row-span-2 self-center italic">{duration}</span>
    </li>
  )
}

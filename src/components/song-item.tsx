import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const base = `grid m-2 rounded-md p-4 auto-cols-auto gap-x-4 drop-shadow`

export default function SongItem({ song, isActive }: PropsWithChildren<{
  song: Song.Song
  isActive?: boolean
}>) {
  const duration = formatDuration(song.duration)
  const className = useMemo(() => {
    return `${base} ${isActive ? 'bg-primary text-white' : 'bg-white'}`
  }, [isActive])

  return (
    <li
      className={className}
      style={{
        gridTemplateColumns: 'auto 1fr auto',
      }}
    >
      <div className="col-start-1 row-span-2 size-12 rounded-full">
        <LazyLoadImage
          src={song.cover} // use normal <img> attributes as props
        />
      </div>
      <span className="col-start-2 row-start-1 w-10 font-bold  text-xl">{song.name}</span>
      <span className="col-start-2 row-start-2 w-100">{song.artist}</span>
      <span className="col-start-3 row-span-2 self-center italic">{duration}</span>
    </li>
  )
}

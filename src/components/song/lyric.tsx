import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { usePlayerStore } from '../../store/player'
import { useColors } from '../../hooks/useColors'

export function Lyric() {
  const divRef = useRef<HTMLDivElement>(null)
  const { base, colors } = useColors()
  const { currentTime, currentSong, _isCutSong, seek } = usePlayerStore()
  const { data } = useQuery({
    queryKey: ['lrc', currentSong?.name],
    async queryFn() {
      if (!currentSong)
        return ''
      return (await axios.get(currentSong.lyric)).data as string
    },
  })
  const lyricsItems: Song.Lyric[] = (data?.split('\n') || []).map((e, id) => {
    const regex = /\[\d{2}:\d{2}\.\d{2}\]/g
    const matches = e.match(regex)
    const time = (matches?.[0] || '')
    let startTime: number | undefined
    if (time) {
      const [a, b] = time.replace(/\[|\]/g, '').split(':')
      startTime = Number(a) * 60 + Number(b)
    }
    return {
      id,
      startTime,
      title: e.replace(time, ''),
    }
  })

  const active = useMemo(() => {
    let active = -1
    for (let index = lyricsItems.length - 1; index >= 0; index--) {
      const { startTime, id } = lyricsItems[index]
      if (startTime !== undefined && currentTime >= startTime) {
        active = id
        break
      }
    }

    return active
  }, [currentTime, lyricsItems])

  const handleClickLyricsItem = useCallback((lyric: Song.Lyric) => {
    if (lyric.startTime === undefined)
      return
    seek(lyric.startTime)
  }, [seek])

  useEffect(() => {
    if (_isCutSong) {
      divRef.current?.scrollTo(0, 0)
    }
  }, [_isCutSong])

  const LyricsItem = lyricsItems.map((e) => {
    return (
      <li
        key={e.id}
        id={`lyric-${e.id}`}
        onClick={() => handleClickLyricsItem(e)}
        className={
          active === e.id
            ? 'font-bold md:text-4xl text-2xl lyric-active md:my-10 my-5'
            : 'md:my-10 my-5'
        }
        style={{
          color: active === e.id ? base : colors[1],
        }}
      >
        {e.title}
      </li>
    )
  })

  useEffect(() => {
    const el = document.getElementById(`lyric-${active}`)
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [active])

  useEffect(() => {
    const el = document.getElementById(`lyric-${active}`)
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [active])

  return (
    <ul
      className="lyric-container h-full  md:text-2xl text-xl box-border p-10 overflow-hidden "
    >
      <div className="h-full overflow-auto hide-scrollbar" ref={divRef}>
        {LyricsItem}
      </div>
    </ul>
  )
}

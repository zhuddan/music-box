import { useMemo } from 'react'
import tinycolor from 'tinycolor2'
import { usePlayerStore } from '../store/player'

export function useColors(song?: Song.Song) {
  const { currentSong } = usePlayerStore()
  const _song = useMemo(() => {
    return song || currentSong
  }, [currentSong, song])

  const base = useMemo(() => _song?.color || '#333333', [_song])

  const colors = useMemo(() => {
    return Array.from({ length: 9 }).map((_, index) => lightColor(base, (index + 1) * 10))
  }, [base])
  return {
    base,
    colors,
  }
}

function lightColor(color: string, amount: number = 30): string {
  // 使用 tinycolor 解析输入颜色
  const tc = tinycolor(color)
  // 使用 tinycolor 变浅颜色
  const lightenedColor = tc.lighten(amount)
  // 返回变浅后的颜色字符串
  return lightenedColor.toString()
}

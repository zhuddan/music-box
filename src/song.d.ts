declare namespace Song {
  interface Song {
    id: string
    name: string
    artist: string
    duration: number
    cover: string
  }

  interface Lyric {
    id: number
    startTime: number | undefined
    title: string
  }
}

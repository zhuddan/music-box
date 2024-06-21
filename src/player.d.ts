declare namespace PlayerNamespace {
  type PlayMode =
    'repeat-one' // 单曲循环
    | 'repeat-list' // 列表循环
    | 'order-list' // 顺序播放
    | 'shuffle' // 随机播放

  interface PlayerState {
    _isSeeking: boolean
    _isCutSong: boolean
    playMode: PlayMode
    isPlaying: boolean
    currentTime: number
    duration: number
    currentSong: Song.Song | null
    songs: Song.Song[]
  }

  interface PlayerActions {
    play: () => void
    pause: () => void
    setDuration: (value: number) => void
    setCurrentTime: (value: number) => void
    setIsPlaying: (value: boolean | PlayerStoreSetFunction) => void
    seek: (value: number) => void
    skip: (value: number) => void
    cutSong: (value: Song.Song) => void
    setCurrentSong: (value: Song.Song) => void
    setIsSeeking: (value: boolean) => void
    onSeek: () => void
    onCutSong: () => void
    toNextSong: () => void
    toPrevSong: () => void
    playEnd: () => void
    togglePlayMode: () => void
  }

 type PlayerStore = PlayerState & PlayerActions

  type PlayerStoreSetFunction = (set: PlayerStore) => PlayerStore | Partial<PlayerStore>

}

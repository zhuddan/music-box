import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayerStore } from '../../store/player'
import no_song_img from '../../assets/no-song.png'
import { PlayerPreviousButton } from '../buttons/player-previous-button'
import { PlayerPlayButton } from '../buttons/player-play-button'
import { PlayerNextButton } from '../buttons/player-next-button'
import { useColors } from '../../hooks/useColors'
import PlayerProgress from './player-progress'

export const PlayerControlMini = memo(() => {
  const navigateTo = useNavigate()
  const { currentSong } = usePlayerStore()

  function handleClick() {
    if (!currentSong)
      return
    navigateTo(`/detail?id=${currentSong.id}`)
  }

  const { colors } = useColors()

  return (
    <div
      className="fixed bottom-0 bg-secondary right-0 left-0 flex"
      style={{
        backgroundColor: colors[1],
      }}

    >
      <div className="flex w-full items-center p-4 relative box-border h-20">
        <div
          className="rounded-full bg-gray-500 md:size-12 size-10"
          onClick={handleClick}
        >
          <img
            src={currentSong?.cover || no_song_img}
            alt=""
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col ml-4 md:height-12 height-10 justify-between text-white">
          <p className="md:text-lg text-sm text-white">
            {currentSong?.name || '暂无歌曲'}
          </p>
          <p className="text-xs">
            {currentSong?.artist || '-'}
          </p>
        </div>
        <div className="flex-1"></div>
        <div className="flex text-white items-center">
          <PlayerPreviousButton />
          <PlayerPlayButton />
          <PlayerNextButton />
        </div>
        <PlayerProgress barHeight={2} className="absolute bottom-0 left-0 right-0 !items-end " />
      </div>
    </div>
  )
})

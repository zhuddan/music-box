import { memo } from 'react'
import { usePlayerStore } from '../../store/player'
import { formatTime } from '../../utils/formatTime'
import { PlayerPreviousButton } from '../buttons/player-previous-button'
import { PlayerPlayButton } from '../buttons/player-play-button'
import { PlayerNextButton } from '../buttons/player-next-button'
import { PlayerModeButton } from '../buttons/player-mode-button'
import { PlayerSpeedButton } from '../buttons/player-speed-button'
import PlayerProgress from './player-progress'

export const PlayerControl = memo(() => {
  const {
    currentTime,
    duration,
  } = usePlayerStore()
  return (
    <div>
      <div className="flex items-center">
        <span className="inline-block w-14 text-center">
          {formatTime(currentTime)}
        </span>
        <PlayerProgress className="flex-1"></PlayerProgress>
        <span className="inline-block w-14 text-center">
          {formatTime(duration)}
        </span>
      </div>

      <div className="flex w-full items-center justify-center">
        <PlayerModeButton />
        <PlayerPreviousButton />
        <PlayerPlayButton />
        <PlayerNextButton />
        <PlayerSpeedButton />
      </div>
    </div>
  )
})

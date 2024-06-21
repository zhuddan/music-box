import { usePlayerStore } from '../../store/player'
import Button from '../button'
import MdiPlayCircleOutline from '~icons/mdi/play-circle-outline'
import MdiPauseCircleOutline from '~icons/mdi/pause-circle-outline'

export function PlayerPlayButton() {
  const {
    setIsPlaying,
    isPlaying,
  } = usePlayerStore()

  function handleClickPlayButton(e: React.MouseEvent<Element, MouseEvent>) {
    e.stopPropagation()
    setIsPlaying(set => ({ isPlaying: !set.isPlaying }))
  }
  return (
    <Button
      onClick={handleClickPlayButton}
      icon={isPlaying ? <MdiPauseCircleOutline /> : <MdiPlayCircleOutline />}
      size="large"
    >
    </Button>
  )
}

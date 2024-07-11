import { usePlayerStore } from '../../store/player'
import Button from '../button'
import MdiSkipPrevious from '~icons/mdi/skip-previous'

export function PlayerPreviousButton() {
  const { toPrevSong } = usePlayerStore()

  function handleClickPreviousButton(e: React.MouseEvent<Element, MouseEvent>) {
    e.stopPropagation()
    toPrevSong()
  }
  return (
    <Button
      onClick={handleClickPreviousButton}
      icon={<MdiSkipPrevious />}
    >
    </Button>
  )
}

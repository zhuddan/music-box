import { usePlayerStore } from '../../store/player'
import Button from '../button'
import MdiSkipNext from '~icons/mdi/skip-next'

export function PlayerNextButton() {
  const { toNextSong } = usePlayerStore()

  function handleClickNextButton(e: React.MouseEvent<Element, MouseEvent>) {
    e.stopPropagation()
    toNextSong()
  }
  return (
    <Button
      onClick={handleClickNextButton}
      icon={<MdiSkipNext />}
    >
    </Button>
  )
}

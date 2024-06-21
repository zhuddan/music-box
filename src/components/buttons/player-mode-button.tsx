import Button from '../button'
import { usePlayerStore } from '../../store/player'
import MdiRepeatOne from '~icons/mdi/repeat-one'
import MdiRepeat from '~icons/mdi/repeat'
import MdiPlayListPlay from '~icons/mdi/playlist-play'
import MdiShuffle from '~icons/mdi/shuffle'

const playerModeIcon: Record<PlayerNamespace.PlayMode, React.ReactNode> = {
  'repeat-one': <MdiRepeatOne />,
  'repeat-list': <MdiRepeat />,
  'order-list': <MdiPlayListPlay />,
  'shuffle': <MdiShuffle />,
}

export function PlayerModeButton() {
  const { playMode, togglePlayMode } = usePlayerStore()

  const icon = playerModeIcon[playMode]
  return (
    <Button
      onClick={togglePlayMode}
      icon={icon}
    >
    </Button>
  )
}

import { useStateList } from 'react-use'
import Button from '../button'
import MdiRepeatOne from '~icons/mdi/repeat-one'
import MdiRepeat from '~icons/mdi/repeat'
import MdiPlayListPlay from '~icons/mdi/playlist-play'
import MdiShuffle from '~icons/mdi/shuffle'

type PlayMode =
  'repeat-one' // 单曲循环
  | 'repeat-list' // 列表循环
  | 'order-list' // 顺序播放
  | 'shuffle' // 随机播放
const playerMode: PlayMode[] = [
  'repeat-one',
  'repeat-list',
  'order-list',
  'shuffle',
]
const playerModeIcon: Record<PlayMode, React.ReactNode> = {
  'repeat-one': <MdiRepeatOne />,
  'repeat-list': <MdiRepeat />,
  'order-list': <MdiPlayListPlay />,
  'shuffle': <MdiShuffle />,
}

export function PlayerModeButton() {
  const {
    state,
    next,
  } = useStateList(playerMode)

  const icon = playerModeIcon[state]
  return (
    <Button onClick={next} icon={icon}>
    </Button>
  )
}

import { useToggle } from 'react-use'
import Button from '../button'
import { Modal } from '../modal'
import MdiPlaylistMusicOutline from '~icons/mdi/playlist-music-outline'

export function PlayerPlaylistButton() {
  const [show, toggle] = useToggle(false)

  return (
    <>
      <Button
        icon={<MdiPlaylistMusicOutline />}
        onClick={toggle}
      >
      </Button>
      <Modal show={show} onClose={() => toggle(false)}>
        <img src="/cover/The Clouds in Camarillo.jpg" alt="" />
      </Modal>
    </>

  )
}

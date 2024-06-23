import Button from '../button'
import { usePlayerStore } from '../../store/player'
import MdiSpeedometerSlow from '~icons/mdi/speedometer-slow'
import MdiSpeedometerMedium from '~icons/mdi/speedometer-medium'
import MdiSpeedometer from '~icons/mdi/speedometer'

const icons: Record<number, React.ReactNode> = {
  0.5: <MdiSpeedometerSlow />,
  1: <MdiSpeedometerMedium />,
  1.2: <MdiSpeedometer />,
}

export function PlayerSpeedButton() {
  const { speed, setSpeed } = usePlayerStore()
  const ic = icons[speed]

  function handleClick() {
    const nextSpeed = speed === 1.2 ? 1 : speed === 1 ? 0.5 : 1.2
    setSpeed(nextSpeed)
  }

  return (
    <Button
      icon={ic}
      onClick={handleClick}
    >
    </Button>

  )
}

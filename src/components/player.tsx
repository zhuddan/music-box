import Progress from './progress'
import MdiPlayCircleOutline from '~icons/mdi/play-circle-outline'
import MdiSkipNext from '~icons/mdi/skip-next'
import MdiSkipPrevious from '~icons/mdi/skip-previous'

export function Player() {
  return (
    <div className="fixed bottom-0 bg-primary right-0 left-0 flex">
      <div className="flex w-full items-center p-4 relative">
        <div className="rounded-full bg-gray-500 h-12 w-12"></div>
        <div className="flex flex-col ml-4 h-12 justify-between text-white">
          <p className="text-lg text-white">f*** xxx***</p>
          <p className="text-xs">张三</p>
        </div>
        <div className="flex-1"></div>
        <div className="flex text-white">
          <MdiSkipPrevious fontSize="2.4em"></MdiSkipPrevious>
          <MdiPlayCircleOutline fontSize="2.4em"></MdiPlayCircleOutline>
          <MdiSkipNext fontSize="2.4em"></MdiSkipNext>
        </div>
        <Progress />
      </div>
    </div>
  )
}

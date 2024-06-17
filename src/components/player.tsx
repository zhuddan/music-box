import type { PropsWithChildren } from 'react'
import { forwardRef, memo } from 'react'
import { faker } from '@faker-js/faker'
import { useKey } from 'react-use'
import { usePlayerStore } from '../store/player'
import Progress from './progress'
import MdiPlayCircleOutline from '~icons/mdi/play-circle-outline'
import MdiPauseCircleOutline from '~icons/mdi/pause-circle-outline'
import MdiSkipNext from '~icons/mdi/skip-next'
import MdiSkipPrevious from '~icons/mdi/skip-previous'

const cover = faker.image.urlLoremFlickr({ category: 'cats' })
export const Player = memo(() => {
  const { toggle, skip, isPlaying } = usePlayerStore()
  useKey(' ', () => {
    toggle()
  })
  useKey('ArrowLeft', () => {
    skip(-5)
  })
  useKey('ArrowRight', () => {
    skip(5)
  })

  return (
    <div className="fixed bottom-0 bg-primary right-0 left-0 flex">
      <div className="flex w-full items-center p-4 relative">
        <div className="rounded-full bg-gray-500 h-12 w-12">
          <img src={cover} alt="" className="h-full w-full rounded-full" />
        </div>
        <div className="flex flex-col ml-4 h-12 justify-between text-white">
          <p className="text-lg text-white">The Clouds in Camarillo</p>
          <p className="text-xs">Brazzaville - Topic</p>
        </div>
        <div className="flex-1"></div>
        <div className="flex text-white">
          <PreviousButton></PreviousButton>
          <PlayButton isPlaying={isPlaying} onClick={() => toggle()}></PlayButton>
          <NextButton></NextButton>
        </div>
        <Progress />
      </div>
    </div>
  )
})

type ButtonWrapperProps = PropsWithChildren<{ onClick?: React.MouseEventHandler }>

const ButtonWrapper = forwardRef<HTMLButtonElement, ButtonWrapperProps>(({ children, onClick }, ref) => {
  return (
    <button type="button" ref={ref} className="text-4xl" onClick={onClick}>
      { children }
    </button>
  )
})

function PlayButton({ isPlaying, onClick }: { isPlaying?: boolean, onClick?: React.MouseEventHandler }) {
  return (
    <ButtonWrapper onClick={onClick}>
      {
        isPlaying ? <MdiPauseCircleOutline /> : <MdiPlayCircleOutline />
      }
    </ButtonWrapper>
  )
}

function PreviousButton() {
  return (
    <ButtonWrapper>
      <MdiSkipPrevious>
      </MdiSkipPrevious>
    </ButtonWrapper>
  )
}

function NextButton() {
  return (
    <ButtonWrapper>
      <MdiSkipNext>
      </MdiSkipNext>
    </ButtonWrapper>
  )
}

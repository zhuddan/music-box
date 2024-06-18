import type { PropsWithChildren } from 'react'
import { forwardRef, memo } from 'react'
import { useKey } from 'react-use'
import { useNavigate } from 'react-router-dom'
import { usePlayerStore } from '../store/player'
import no_song_img from '../assets/no-song.png'
import Progress from './progress'
import MdiPlayCircleOutline from '~icons/mdi/play-circle-outline'
import MdiPauseCircleOutline from '~icons/mdi/pause-circle-outline'
import MdiSkipNext from '~icons/mdi/skip-next'
import MdiSkipPrevious from '~icons/mdi/skip-previous'

export const PlayerControl = memo(() => {
  const navigateTo = useNavigate()
  const {
    setIsPlaying,
    skip,
    toNextSong,
    toPrevSong,
    currentSong,
    isPlaying,
  } = usePlayerStore()

  useKey(' ', () => {
    toggle()
  })
  useKey('ArrowLeft', () => {
    skip(-5)
  })
  useKey('ArrowRight', () => {
    skip(5)
  })

  function toggle() {
    setIsPlaying(set => ({ isPlaying: !set.isPlaying }))
  }

  function handleClick() {
    if (!currentSong)
      return
    navigateTo(`/detail?id=${currentSong.id}`)
  }

  function handleClickPlayButton(e: React.MouseEvent<Element, MouseEvent>) {
    e.stopPropagation()
    toggle()
  }

  function handleClickPreviousButton(e: React.MouseEvent<Element, MouseEvent>) {
    e.stopPropagation()
    toPrevSong()
  }

  function handleClickNextButton(e: React.MouseEvent<Element, MouseEvent>) {
    e.stopPropagation()
    toNextSong()
  }
  return (
    <div
      className="fixed bottom-0 bg-primary right-0 left-0 flex"

    >
      <div className="flex w-full items-center p-4 relative box-border h-20">
        <div
          className="rounded-full bg-gray-500 md:size-12 size-10"
          onClick={handleClick}
        >
          <img
            src={currentSong?.cover || no_song_img}
            alt=""
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col ml-4 h-12 justify-between text-white">
          <p className="md:text-lg text-sm text-white">
            {currentSong?.name || '暂无歌曲'}
          </p>
          <p className="text-xs">
            {currentSong?.artist || '-'}
          </p>
        </div>
        <div className="flex-1"></div>
        <div className="flex text-white">
          <PreviousButton
            onClick={handleClickPreviousButton}
          >
          </PreviousButton>
          <PlayButton
            isPlaying={isPlaying}
            onClick={handleClickPlayButton}
          >
          </PlayButton>
          <NextButton
            onClick={handleClickNextButton}
          >
          </NextButton>
        </div>
        <Progress />
      </div>
    </div>
  )
})

type ButtonWrapperProps = PropsWithChildren<{ onClick?: React.MouseEventHandler }>

const ButtonWrapper = forwardRef<HTMLButtonElement, ButtonWrapperProps>(({ children, onClick }, ref) => {
  return (
    <button type="button" ref={ref} className="md:text-4xl text-2xl" onClick={onClick}>
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

function PreviousButton({ onClick }: { onClick?: React.MouseEventHandler }) {
  return (
    <ButtonWrapper onClick={onClick}>
      <MdiSkipPrevious>
      </MdiSkipPrevious>
    </ButtonWrapper>
  )
}

function NextButton({ onClick }: { onClick?: React.MouseEventHandler }) {
  return (
    <ButtonWrapper onClick={onClick}>
      <MdiSkipNext>
      </MdiSkipNext>
    </ButtonWrapper>
  )
}

import { useEffect, useMemo, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

type ModelType = 'top' | 'bottom' | 'center'
export function Modal({
  show,
  children,
  onClose,
  type = 'center',
}: React.PropsWithChildren<{
  show?: boolean
  onClose?: () => void
  type?: ModelType
}>) {
  const ref = useRef<HTMLDivElement>(null)
  const [className, setClassName] = useState('')
  const [maskClassName, setMaskClassName] = useState('')
  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({
    transitionProperty: 'opacity,transform',
  })
  const duration = 0
  useEffect(() => {
    if (show) {
      setClassName(type === 'center' ? 'scale-100' : 'translate-y-0')
      setMaskClassName('opacity-100 translate-y-0')
      setMaskStyle(style => ({
        ...style,
        transitionDuration: `${duration}ms, 0s`,
        transitionDelay: '0s, 0s',
      }))
    }
    else {
      setClassName('')
      setMaskClassName('')
      setMaskStyle(style => ({
        ...style,
        transitionDuration: `${duration}ms, 0s`,
        transitionDelay: `0s, ${duration}ms`,
      }))
    }
  }, [show, type])
  useClickAway(ref, () => {
    onClose?.()
  })
  const baseClass = useMemo(() => {
    let baseClass = ''
    if (type === 'bottom') {
      baseClass = 'bottom-0 translate-y-full'
    }
    else if (type === 'top') {
      baseClass = 'top-0 -translate-y-full'
    }
    else if (type === 'center') {
      baseClass = 'origin-center top-[50%] -translate-y-[50%] scale-0 my-auto'
    }
    return baseClass
  }, [type])

  return (
    <>
      <div
        className={`
          mask fixed z-10 inset-0
          bg-black bg-opacity-30
          opacity-0 translate-y-full 
          ${maskClassName}
        `}
        style={maskStyle}
      >
      </div>
      <div
        className={`
          modal fixed z-20 ${baseClass}
          transition-transform duration-${duration}
          ${className}
        `}
        ref={ref}
      >
        { children}
      </div>
    </>
  )
}

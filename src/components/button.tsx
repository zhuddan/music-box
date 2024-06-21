import { forwardRef } from 'react'
import './button.css'

export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large'
interface ButtonPropsBase {
  onClick?: React.MouseEventHandler
  icon?: React.ReactNode
  size?: ButtonSize
  className?: string
}

type ButtonProps = React.PropsWithChildren<ButtonPropsBase>

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    children,
    onClick,
    icon,
    size = undefined,
    className = '',
  },
  ref,
) => {
  const classNameList: string[] = [className]
  if (!size) {
    classNameList.push('text-2xl p-1')
  }
  else if (size === 'small') {
    classNameList.push('text-base p-1')
  }
  else if (size === 'tiny') {
    classNameList.push('text-sm p-1')
  }
  else if (size === 'large') {
    classNameList.push('text-4xl p-1')
  }
  return (
    <button
      type="button"
      ref={ref}
      className={`${classNameList.join(' ')} rounded-full  p-button inline-block`}
      onClick={onClick}
    >
      { icon || children }
    </button>
  )
})
export default Button

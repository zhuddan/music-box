import { forwardRef } from 'react'

interface ButtonPropsBase {
  onClick?: React.MouseEventHandler
  icon?: React.ReactNode
}

type ButtonProps = React.PropsWithChildren<ButtonPropsBase>

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    children,
    onClick,
    icon,
  },
  ref,
) => {
  return (
    <button
      type="button"
      ref={ref}
      className="md:text-4xl text-3xl"
      onClick={onClick}
    >
      { icon || children }
    </button>
  )
})
export default Button

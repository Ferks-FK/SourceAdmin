import classNames from "classnames"
import React from "react";

export type SpinnerSize = 'small' | 'base' | 'large'

interface Props {
  size?: SpinnerSize
  centered?: boolean
}

interface SpinnerProps extends React.FC<Props> {
  Size?: Record<'SMALL' | 'BASE' | 'LARGE', SpinnerSize>;
}

const SpinnerComponent = (props: Props) => (
  <div className={classNames('rounded-[50%] animate-spinner border-gray-400 border-t-white', {
    ['w-5 h-5 border-4']: props.size === 'small',
    ['w-8 h-8 border-4']: props.size === 'base' || props.size == undefined,
    ['w-16 h-16 border-[6px]']: props.size === 'large'
  })}/>
)

const Spinner: SpinnerProps = ({ centered, size }) => (
  centered ? (
    <div className={classNames('flex justify-center items-center', {
      ['m-20']: size === 'large',
      ['m-6']: size === 'small'
    })}>
      <SpinnerComponent size={size}/>
    </div>
  ) : (
    <SpinnerComponent size={size}/>
  )
)

export { Spinner }

import { Link } from '@inertiajs/react';
import { Options } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames';
import styles from "./style.module.css";

const Button = ({ shape, size, children, variant, className, ...props }) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles.primary,
        {
          [styles.secondary]: variant === Options.Variant.Secondary,
          [styles.square]: shape === Options.Shape.IconSquare,
          [styles.small] : size === Options.Size.Small,
          [styles.large] : size === Options.Size.Large,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

const TextButton = ({ className, ...props }) => (
  <Button className={classNames(styles.text, className)} {...props}/>
)

const DangerButton = ({ className, ...props }) => (
  <Button className={classNames(styles.danger, className)} {...props}/>
)

const IconButton = ({ className, icon, iconPosition, iconSize, ...props }) => (
  <Button className={classNames(className)} {...props}>
    <div className={classNames(
      'flex items-center', {
      'flex-row-reverse': iconPosition == 'right'
      })}
    >
      <FontAwesomeIcon icon={icon} size={iconSize}/>
    </div>
  </Button>
)

const IconAndLink = ({ className, icon, iconPosition, iconSize, to, children, ...props }) => {
  const buttonStyles = classNames('!p-0 flex items-center');

  return (
    <Button {...props} disabled={props.disabled} className={buttonStyles}>
      <Link href={to} className={classNames(styles.link, {
        'flex flex-row-reverse items-center': iconPosition == 'right',
        'cursor-not-allowed pointer-events-none': props.disabled
      })}>
        <FontAwesomeIcon icon={icon} size={iconSize} className='w-5'/>
        {children}
      </Link>
    </Button>
  )
}

const _Button = Object.assign(Button, {
  Sizes: Options.Size,
  Shapes: Options.Shape,
  Variants: Options.Variant,
  Text: TextButton,
  Danger: DangerButton,
  Icon: IconButton,
  IconLink: IconAndLink
})

export default _Button;

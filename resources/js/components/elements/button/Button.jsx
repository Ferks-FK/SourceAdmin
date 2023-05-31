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

const IconButton = ({ className, icon, iconPosition, iconSize, ...props }) => {
  const containerStyles = classNames('flex items-center', {
    'flex-row-reverse': iconPosition == 'right'
  });

  return (
    <Button className={classNames(className)} {...props}>
      <div className={containerStyles}>
        <FontAwesomeIcon icon={icon} size={iconSize}/>
      </div>
    </Button>
  )
}

const ExternalLinkButton = ({ className, to, children, ...props }) => {
  return (
    <Button className={classNames(className, '!p-0')} {...props}>
      <a href={to} target='_blank' className={classNames(styles.link, '!px-4 !py-2 block w-full')}>
        {children}
      </a>
    </Button>
  )
}

const InternalLinkButton = ({ className, to, children, ...props }) => {
  return (
    <Button className={classNames(className, '!p-0')} {...props}>
      <Link href={to} className={classNames(styles.link, '!px-4 !py-2 block w-full')}>
        {children}
      </Link>
    </Button>
  )
}

const IconAndLink = ({ className, icon, iconPosition, iconSize, to, children, ...props }) => {
  const buttonStyles = classNames('!p-0 flex items-center', className);
  const linkStyles = classNames(styles.link, {
    'flex flex-row-reverse items-center': iconPosition == 'right',
    'cursor-not-allowed pointer-events-none': props.disabled
  });

  return (
    <Button {...props} className={buttonStyles}>
      <Link href={to} className={linkStyles}>
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
  InternalLink: InternalLinkButton,
  ExternalLink: ExternalLinkButton,
  IconLink: IconAndLink
})

export default _Button;

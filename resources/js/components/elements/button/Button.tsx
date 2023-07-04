import { Link } from '@inertiajs/react';
import { Options, ButtonProps, IconButtonProps, LinkButtonProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames';
import styles from "./style.module.css";

const Button = ({ shape, size, children, variant, className, ...props }: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles.primary,
        {
          [styles.secondary]: variant === Options.Variant.Secondary,
          [styles.warning]: variant === Options.Variant.Warning,
          [styles.info]: variant === Options.Variant.Info,
          [styles.square]: shape === Options.Shape.IconSquare,
          [styles.small]: size === Options.Size.Small,
          [styles.large]: size === Options.Size.Large,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

const TextButton = ({ className, ...props }: ButtonProps) => (
  <Button className={classNames(styles.text, className, 'p-2')} {...props}/>
)

const DangerButton = ({ className, ...props }: ButtonProps) => (
  <Button className={classNames(styles.danger, className, 'p-2')} {...props}/>
)

const IconButton = ({ className, icon, iconPosition, iconSize, ...props }: IconButtonProps) => {
  const containerStyles = classNames('flex items-center', {
    'flex-row-reverse': iconPosition == Options.iconPosition.Right
  });

  return (
    <Button className={classNames(className, 'p-2')} {...props}>
      <div className={containerStyles}>
        <FontAwesomeIcon icon={icon} size={iconSize}/>
      </div>
    </Button>
  )
}

const ExternalLinkButton = ({ className, to, children, ...props }: LinkButtonProps) => {
  return (
    <Button className={classNames(className)} {...props}>
      <a href={to} target='_blank' className={classNames(styles.link)}>
        {children}
      </a>
    </Button>
  )
}

const InternalLinkButton = ({ className, linkClassName, to, children, ...props }: LinkButtonProps) => {
  return (
    <Button className={classNames(className)} {...props}>
      <Link href={to} className={classNames(styles.link, linkClassName)}>
        {children}
      </Link>
    </Button>
  )
}

const IconAndLink = ({ className, icon, iconPosition, iconSize, to, children, ...props }: IconButtonProps & LinkButtonProps) => {
  const buttonStyles = classNames('flex items-center', className);
  const linkStyles = classNames(styles.link, {
    'flex flex-row-reverse items-center': iconPosition == Options.iconPosition.Right,
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

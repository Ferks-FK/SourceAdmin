import { useTranslation } from "react-i18next";
import { Options, InputProps, InputSearchProps } from "./types";
import classNames from 'classnames';
import styles from "./style.module.css";

const Input = ({ size, variant, children, className, ...props }: InputProps) => {
  return (
    <input
      className={classNames(
        styles.input,
        styles.primary,
        {
          [styles.secondary]: variant === Options.Variant.Secondary,
          [styles.small]: size === Options.Size.Small,
          [styles.large]: size === Options.Size.Large
        },
        className
      )}
      {...props}
    >
      {children}
    </input>
  )
}

const InputText = ({ className, ...props }: InputProps) => (
  <Input type={'text'} className={classNames(className)} {...props}/>
)

const InputPassword = ({ className, ...props }: InputProps) => (
  <Input type={'password'} className={classNames(className)} {...props}/>
)

const InputEmail = ({ className, ...props }: InputProps) => (
  <Input type={'email'} className={classNames(className)} {...props}/>
)

const InputSearch = ({ className, searchQuery, minChars = 3, ...props }: InputSearchProps) => {
  const minCharsToSearch = minChars - searchQuery.length;
  const { t } = useTranslation();

  return (
    <div>
      <Input type={'search'} className={classNames(className)} {...props}/>
      {searchQuery.length >= 1 && (
        <div className={`${minCharsToSearch <= 0 && 'hidden'} text-red-400 text-sm text-center`}>
          {t('generic.min_characters', { minChars: minCharsToSearch })}
        </div>
      )}
    </div>
  )
}

const InputFile = ({ className, onChange, ...props }: InputProps) => (
  <Input type={'file'} className={classNames(className)} onChange={onChange} {...props}/>
)

const InputCheckBox = ({ className, ...props }: InputProps) => (
  <Input type={'checkbox'} className={classNames(styles.checkbox, className)} {...props}/>
)

const _Input = Object.assign(Input, {
  Sizes: Options.Size,
  Variants: Options.Variant,
  Password: InputPassword,
  Text: InputText,
  Email: InputEmail,
  Search: InputSearch,
  File: InputFile,
  CheckBox: InputCheckBox
})

export default _Input;

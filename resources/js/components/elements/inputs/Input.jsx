import { useState } from 'react';
import { useDebounce } from "@/helpers";
import { useTranslation } from "react-i18next";
import { Options } from "./types";
import classNames from 'classnames';
import styles from "./style.module.css";

const Input = ({ size, variant, children, className, ...props }) => {
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

const InputText = ({ className, ...props }) => (
  <Input type={'text'} className={classNames(className)} {...props}/>
)

const InputSearch = ({ className, onChange, minChars = 3, ...props }) => {
  const [ inputValue, setInputValue ] = useState('')
  const deboucedChange = useDebounce(onChange, 500)
  const handleChange = (event) => {
    deboucedChange(event.target.value)
    setInputValue(event.target.value);
  }
  const minCharsToSearch = minChars - inputValue.length;
  const { t } = useTranslation();

  return (
    <div>
      <Input type={'search'} onChange={handleChange} className={classNames(className)} {...props}/>
      {inputValue.length >= 1 && (
        <div className={`${minCharsToSearch <= 0 && 'hidden'} text-red-400 text-sm text-center`}>
          {t('generic.min_characters', { minChars: minCharsToSearch })}
        </div>
      )}
    </div>
  )
}

const InputFile = ({ className, onChange, ...props }) => (
  <Input type={'file'} className={classNames(className)} onChange={onChange} {...props}/>
)

const InputCheckBox = ({ className, ...props }) => (
  <Input type={'checkbox'} className={classNames(styles.checkbox, className)} {...props}/>
)

const _Input = Object.assign(Input, {
  Sizes: Options.Size,
  Variants: Options.Variant,
  Generic: Input,
  Text: InputText,
  Search: InputSearch,
  File: InputFile,
  CheckBox: InputCheckBox
})

export default _Input;

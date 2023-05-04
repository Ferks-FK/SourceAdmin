import { useDebounce } from "@/helpers";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Component = ({ className, onChange, ...props }) => {
  const [ inputValue, setInputValue ] = useState('')
  const deboucedChange = useDebounce(onChange, 500)
  const handleChange = (event) => {
    deboucedChange(event.target.value)
    setInputValue(event.target.value);
  }
  const minChars = 3 - inputValue.length;
  const { t } = useTranslation();
  
  return (
    <>
      <div>
        <input
          className={`w-full p-3 rounded-md outline-none bg-[#1e2327] text-white border-2 hover:border-neutral-400 transition-all duration-100 ease-in-out ${className ?? ''}`}
          onChange={handleChange}
          type="search"
          {...props}
        />
        {minChars <= 3 && (
          <div className={`${minChars <= 0 && 'hidden'} text-red-400 pl-1`}>
            {t('generic.min_characters', { minChars })}
          </div>
        )}
      </div>
    </>
  )
};

const InputSearch = Object.assign(Component, {})

export default InputSearch

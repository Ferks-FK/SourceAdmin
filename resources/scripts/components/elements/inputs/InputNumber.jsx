import { useDebounce } from "@/helpers";
import { useState } from "react";

const Component = ({ className, value, onChange, ...props }) => {
  const deboucedChange = useDebounce(onChange, 500)
  const [displayValue, setDisplayValue] = useState(value)
  const handleChange = (event) => {
    setDisplayValue(() => {
      if (event.target.value == 0) {
        return 1
      }

      return event.target.value
    })
    deboucedChange(event.target.value)
  }

  return (
    <input
      className={`w-full h-fit min-w-[3.5rem] max-w-[3.5rem] p-3 rounded-md outline-none bg-[#1e2327] text-white border-2 hover:border-neutral-400 transition-all duration-100 ease-in-out ${className ?? ''}`}
      value={displayValue || ''}
      onChange={handleChange}
      type="number"
      {...props}
  />
  )
};

const InputNumber = Object.assign(Component, {})

export default InputNumber

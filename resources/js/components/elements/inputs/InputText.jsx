const Component = ({ className, ...props }) => {
  return (
    <input
      className={`w-full p-3 rounded-md outline-none bg-[#1e2327] text-white border-2 hover:border-neutral-400 transition-all duration-100 ease-in-out ${className ?? ''}`}
      {...props}
  />
  )
};

const InputText = Object.assign(Component, {})

export default InputText

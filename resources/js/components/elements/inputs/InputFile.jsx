const Component = ({ name, id, onChange, value, className, ...props }) => {
  return (
    <input
      className={`w-full p-3 rounded-md outline-none bg-[#1e2327] text-white border-2 border-[#6b7280] hover:border-neutral-400 transition-all duration-100 ease-in-out cursor-pointer ${className ?? ''}`}
      type="file"
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
};

const InputFile = Object.assign(Component, {})

export default InputFile

function Select({ children, className, onChange, value, name, ...props }) {
  const SelectCustomStyles = {
    padding: "10px",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundPositionX: "calc(100% - 0.75rem)",
    backgroundPositionY: "center"
  }

  return (
    <select
      value={value}
      name={name}
      onChange={onChange}
      className={`shadow-none bg-no-repeat cursor-pointer block p-3 pr-8 rounded border w-full text-sm transition-all duration-150 ease-in-out border-slate-200 hover:border-slate-400 bg-[#1e2327] text-neutral-200 ${className ?? ''}`} style={SelectCustomStyles}
      {...props}
    >
      { children }
    </select>
  )
}

export { Select }

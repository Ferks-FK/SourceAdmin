
function Select({ children, onChange, value }) {
  const SelectCustomStyles = {
    padding: "10px",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundPositionX: "calc(100% - 0.75rem)",
    backgroundPositionY: "center"
  }

  return (
    <select value={value} onChange={onChange} className="shadow-none bg-no-repeat cursor-pointer block p-3 pr-8 rounded border w-full text-sm transition-colors duration-150 ease-linear bg-[#1e2327] text-neutral-200" style={SelectCustomStyles}>
      { children }
    </select>
  )
}

export { Select }

const Component = ({ className, children, size = 'base', ...props }) => {
  const trSize = (size) => {
    switch (size) {
      case 'sm':
        return 'h-10'
      case 'base':
        return 'h-14'
    }
  }

  return (
    <tr className={`${trSize(size)} cursor-pointer bg-[#1a1e22] border-b border-gray-700 hover:bg-lightDark ${className ?? ''}`} {...props}>
      {children}
    </tr>
  )
}

const TableRow = Object.assign(Component, {})

export default TableRow

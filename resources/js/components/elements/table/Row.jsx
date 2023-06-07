const Component = ({ className, children, size = 'sm', ...props }) => {
  const trSize = (size) => {
    switch (size) {
      case 'sm':
        return 'h-10'
      case 'base':
        return 'h-14'
    }
  }

  return (
    <tr className={`${trSize(size)} cursor-pointer bg-dark-neutral border-b border-gray-700 hover:bg-dark-secondary ${className ?? ''}`} {...props}>
      {children}
    </tr>
  )
}

const TableRow = Object.assign(Component, {})

export default TableRow

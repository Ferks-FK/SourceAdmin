const Component = ({ className, children, ...props }) => (
  <tr className={`cursor-pointer bg-[#1a1e22] border-b border-gray-700 hover:bg-lightDark ${className ?? ''}`} {...props}>
    {children}
  </tr>
)

const TableRow = Object.assign(Component, {})

export default TableRow

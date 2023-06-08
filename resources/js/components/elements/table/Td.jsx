const Component = ({ className, children, ...props }) => (
  <td className={`px-6 ${className ?? ''}`} {...props}>
    {children}
  </td>
)

const Td = Object.assign(Component, {})

export default Td
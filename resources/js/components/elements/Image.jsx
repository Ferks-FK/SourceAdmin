function Image({ children, className, ...props }) {
  return (
    <img {...props} className={`${className ?? ''}`}>
      {children}
    </img>
  )
}

export { Image }

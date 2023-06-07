
function Progress({ bgColor, completed }) {

  const ContainerStyles = {
    height: 10,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50
  }

  const barStyles = {
    height: '100%',
    width: `${completed}%`,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.5s ease-in-out',
  }

  return (
    <div style={ContainerStyles}>
      <div className={`${bgColor}`} style={barStyles}></div>
    </div>
  )
}

export { Progress }

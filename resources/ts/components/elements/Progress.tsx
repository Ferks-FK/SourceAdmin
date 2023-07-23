import { CSSProperties } from "react"

interface Props {
  bgColor: string,
  completed: number
}

function Progress({ bgColor, completed }: Props) {

  const ContainerStyles: CSSProperties = {
    height: 10,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50
  }

  const barStyles: CSSProperties = {
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

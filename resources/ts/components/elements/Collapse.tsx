import classNames from "classnames";
import { HTMLAttributes } from "react";
import { useRef, useState, useEffect } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  visible: boolean
}

const Collapse = ({ children, visible }: Props) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ height: visible ? containerHeight : 0 }}
      className={classNames('max-h-60 overflow-hidden transition-all duration-300 ease')}
    >
      {children}
    </div>
  )
}

export { Collapse }

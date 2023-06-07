import { useRef } from "react"

function Collapse({ children, visible }) {
  const contentRef = useRef(0);

  return (
    <div
      className="h-0 overflow-hidden transition-all duration-300 ease"
      ref={contentRef}
      style={visible ? { height: contentRef.current.scrollHeight == undefined ? '250px' : contentRef.current.scrollHeight } : { height: "0px" }}
    >
      {children}
    </div>
  )
}

export { Collapse }

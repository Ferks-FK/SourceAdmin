import { useRef } from "react"

function Collapse({ children, visible }) {
  const contentRef = useRef();

  return (
    <div
      className="h-0 overflow-hidden transition-all duration-300 ease"
      ref={contentRef}
      style={visible ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}
    >
      {children}
    </div>
  )
}

export { Collapse }

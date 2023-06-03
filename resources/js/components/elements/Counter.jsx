import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatSizeUnits } from "@/helpers";

function Counter({ from = 0, to, convertToHumanSizeUnit }) {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1.5,
      onUpdate(value) {
        ref.current.textContent = convertToHumanSizeUnit ? formatSizeUnits(value) : value.toFixed(0);
      }
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <p ref={ref}/>
  )
}

const CounterContainer = ({ title, to, convertToHumanSizeUnit = false }) => (
  <div className="flex">
    <Counter to={to} convertToHumanSizeUnit={convertToHumanSizeUnit}/>&nbsp;
    <p>{title}</p>
  </div>
)

export { Counter, CounterContainer }

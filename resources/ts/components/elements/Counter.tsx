import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatSizeUnits } from "@/helpers";;

interface Props {
  from?: number,
  to: number,
  convertToHumanSizeUnit?: boolean
}

type CounterProps = Props & {
  title: string
}

function Counter({ from, to, convertToHumanSizeUnit }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current === null) return

    const controls = animate(from, to, {
      duration: 1.5,
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = convertToHumanSizeUnit ? formatSizeUnits(value!) : value!.toFixed(0);
        }
      }
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <p ref={ref}/>
  )
}


const CounterContainer = ({ title, from = 0, to, convertToHumanSizeUnit = false }: CounterProps) => (
  <div className="flex">
    <Counter to={to} convertToHumanSizeUnit={convertToHumanSizeUnit} from={from}/>&nbsp;
    <p>{title}</p>
  </div>
)

export { Counter, CounterContainer }

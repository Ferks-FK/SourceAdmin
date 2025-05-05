import { motion, MotionProps } from "framer-motion";
import { FlashMessageRender } from "@/components/FlashMessageRender";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & MotionProps

function AnimationFade({ children }: Props) {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease: "easeInOut"}}
    >
      <FlashMessageRender/>
      {children}
    </motion.div>
  )
}

export { AnimationFade }

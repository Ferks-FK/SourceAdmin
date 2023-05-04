import { motion } from "framer-motion";

function AnimationFade({ children }) {
  return (
    <motion.div
      className="flex flex-col w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease: "easeInOut"}}
    >
      {children}
    </motion.div>
  )
}

export { AnimationFade }

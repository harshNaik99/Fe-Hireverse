// consts.ts
import type { Variants } from "framer-motion"


export const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  export const panelVariants: Variants = {
    hidden: {
      x: "100vw" as any
    },
    visible: {
      x: "0vw" as any,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      }
    },
    exit: {
      x: "100vw" as any,
      transition: { type: "tween", duration: 0.3 }
    }
  };
  
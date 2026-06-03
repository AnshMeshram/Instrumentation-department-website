import { motion as Motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </Motion.div>
  );
}

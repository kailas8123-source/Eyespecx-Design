import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const logoSrc = "/logo.png";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#090b10" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          data-testid="splash-screen"
        >
          <motion.div
            initial={{ scale: 0.72, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <img
              src={logoSrc}
              alt="Eyespecx"
              className="w-56 md:w-72 select-none"
              draggable={false}
            />

            {/* Shimmer loading bar */}
            <motion.div
              className="w-36 h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "rgba(255,255,255,0.85)" }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

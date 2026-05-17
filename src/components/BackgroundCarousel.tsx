import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const backgroundImages = [
  "/images/font/1.jpg",
  "/images/font/2.jpg",
  "/images/font/3.jpg",
  "/images/font/4.jpg",
  "/images/font/5.jpg",
  "/images/font/6.jpg",
  "/images/font/7.jpg",
  "/images/font/8.jpg",
  "/images/font/9.jpg",
  "/images/font/10.jpg",
  "/images/font/11.jpg"
];

export default function BackgroundCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentImage}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center ken-burns"
            style={{ backgroundImage: `url("${backgroundImages[currentImage]}")` }}
          />
          <div className="absolute inset-0 bg-brand-black/70 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-transparent to-brand-black" />
    </div>
  );
}

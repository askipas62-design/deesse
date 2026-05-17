import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const title = "UNE NUIT QUI NE RESSEMBLE À AUCUNE AUTRE";

const heroImages = [
  "/images/hero/1.jpg",
  "/images/hero/2.jpg",
  "/images/hero/3.jpg",
  "/images/hero/4.jpg",
  "/images/hero/5.jpg",
  "/images/hero/6.jpg",
  "/images/hero/7.jpg",
  "/images/hero/8.jpg",
  "/images/hero/9.jpg",
  "/images/hero/10.jpg",
  "/images/hero/11.jpg"
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Dynamic Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${heroImages[currentImage]}")` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl">
        <motion.h1 
          className="text-4xl md:text-7xl lg:text-8xl mb-8 leading-tight gold-gradient-text font-black uppercase tracking-tighter"
        >
          {title.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-sans text-brand-text-secondary text-lg md:text-xl mb-4 tracking-[0.2em] font-light max-w-2xl mx-auto uppercase"
        >
          Des soirées privées. Des expériences sans limite.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="font-cursive text-brand-gold text-4xl mb-12"
        >
          Un monde réservé à ceux qui osent vraiment.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/passes" className="gold-btn min-w-[280px] text-lg">
            JE VEUX MON PASS
          </Link>
        </motion.div>
      </div>

      {/* Floating Particles Simulation */}
      <div className="absolute inset-0 z-5 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50 + "px"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-brand-purple-glow rounded-full blur-[1px]"
          />
        ))}
      </div>
    </section>
  );
}

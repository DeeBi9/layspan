import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-ocean">
        <div className="absolute inset-0 bg-wave-pattern opacity-30"></div>
      </div>

      {/* Maritime Decorations */}
      <div className="maritime-decoration maritime-decoration-1">⚓</div>
      <div className="maritime-decoration maritime-decoration-2">🌊</div>
      <div className="maritime-decoration maritime-decoration-3">🧭</div>
      <div className="maritime-decoration maritime-decoration-4">⛵</div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          {"SoF Event Extractor".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className="mr-4 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xl md:text-2xl text-blue-100 mb-8"
        >
          Maritime Document Processing
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-lg text-blue-200 mb-12 max-w-3xl mx-auto"
        >
          Extract events, timestamps, and operations from Statement of Facts documents 
          in any format. Our intelligent system handles PDFs and Word docs with precision.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <Link to="/upload">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-maritime-primary px-8 py-4 text-lg font-semibold"
            >
              Start Processing
            </motion.button>
          </Link>
          <motion.a 
            href=""
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="btn-maritime-secondary px-8 py-4 text-lg font-semibold">
              View Demo
            </button>
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element floating-element-1">📄</div>
        <div className="floating-element floating-element-2">⏱️</div>
        <div className="floating-element floating-element-3">📊</div>
      </div>
    </section>
  );
};

export default Hero;
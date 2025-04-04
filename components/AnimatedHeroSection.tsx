"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import InterviewButton from './InterviewButton';
import { useEffect, useRef } from "react";

const AnimatedHeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (heading) {
      heading.style.backgroundSize = "200% 200%";
      heading.style.animation = "gradient 8s ease infinite";
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
      <section className={'card-cta sm:min-h-[50vh] py-16 flex items-center'}>
        <motion.div
          className={'flex flex-col max-w-lg gap-8'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            ref={headingRef}
            variants={itemVariants}
            className="text-4xl font-bold leading-relaxed bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 text-transparent bg-clip-text"
          >
            Get Interview-ready by AI powered Practise and Feedback
          </motion.h2>

          <motion.p className={'text-xl leading-relaxed'} variants={itemVariants}>
            Practise on real interview questions and get instant feedback
            from our AI-powered system to improve your interview skills.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <InterviewButton />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.2,
                type: "spring",
                stiffness: 200
              }}
              className="bg-gradient-to-r from-amber-200 to-amber-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center self-start sm:self-auto"
            >
              <span className="mr-1">✨</span> RECOMMENDED
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-sm:hidden flex items-center justify-center"
        >
          <Image 
            src={'/robot.png'} 
            alt={'robo-dude'} 
            width={500} 
            height={500} 
            className="object-contain"
          />
        </motion.div>
      </section>
    </>
  );
};

export default AnimatedHeroSection;
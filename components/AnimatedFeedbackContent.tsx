"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dayjs from "dayjs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const listItemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const AnimatedFeedbackContent = ({ 
  interview, 
  feedback 
}: { 
  interview: any; 
  feedback: any;
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <motion.div className="flex flex-row justify-center" variants={itemVariants}>
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </motion.div>

      <motion.div className="flex flex-row justify-center" variants={itemVariants}>
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <motion.span 
                className="text-primary-200 font-bold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1, type: "spring" }}
              >
                {feedback?.totalScore}
              </motion.span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.hr variants={itemVariants} />

      <motion.p 
        variants={itemVariants}
        className="leading-relaxed"
      >
        {feedback?.finalAssessment}
      </motion.p>

      {/* Interview Breakdown */}
      <motion.div className="flex flex-col gap-4" variants={itemVariants}>
        <motion.h2 variants={itemVariants}>Breakdown of the Interview:</motion.h2>
        {feedback?.categoryScores?.map((category: any, index: number) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
          >
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="flex flex-col gap-3" variants={itemVariants}>
        <motion.h3 variants={itemVariants}>Strengths</motion.h3>
        <motion.ul variants={itemVariants}>
          {feedback?.strengths?.map((strength: string, index: number) => (
            <motion.li 
              key={index}
              variants={listItemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 + (index * 0.1) }}
            >
              {strength}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div className="flex flex-col gap-3" variants={itemVariants}>
        <motion.h3 variants={itemVariants}>Areas for Improvement</motion.h3>
        <motion.ul variants={itemVariants}>
          {feedback?.areasForImprovement?.map((area: string, index: number) => (
            <motion.li 
              key={index}
              variants={listItemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 + (index * 0.1) }}
            >
              {area}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedFeedbackContent;
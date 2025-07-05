"use client";
import { cn } from "@/lib/utils";
import React from "react";

import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";


export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0 md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}





// --- SkeletonOne: AI Health Reports ---
const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {/* User's symptom query */}
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shrink-0" /> {/* User avatar color */}
        <p className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900 text-xs text-neutral-500 flex items-center px-2">
          What are the symptoms of common flu?
        </p>
      </motion.div>
      {/* AI's report response */}
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900 text-xs text-neutral-500 flex items-center px-2">
          Flu symptoms include fever, body aches, cough...
        </p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" /> {/* AI avatar color */}
      </motion.div>
      {/* Another user's query / follow-up */}
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shrink-0" />
        <p className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900 text-xs text-neutral-500 flex items-center px-2">
          Generate a health report for me.
        </p>
      </motion.div>
    </motion.div>
  );
};

// --- SkeletonTwo: Smart Medicine Suggestions ---
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const medicineSuggestions = [
    "Pain Relief (e.g., Ibuprofen)",
    "Antihistamines (for allergies)",
    "Cough Suppressants",
    "Multivitamins & Supplements",
    "Antacids (for indigestion)",
    "Topical Creams (for skin irritation)",
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-4" // Added padding to contain text better
    >
      {medicineSuggestions.map((text, i) => (
        <motion.div
          key={"skeleton-two-medicine-" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (90 - 50) + 50 + "%", // Adjusted max-width for better text fit
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-8 text-xs text-neutral-500 overflow-hidden" // Increased height, added overflow
        >
          <span className="truncate">{text}</span> {/* Truncate long text */}
        </motion.div>
      ))}
    </motion.div>
  );
};

// --- SkeletonThree: Precautions & Guidelines ---
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2 p-6 justify-center items-center text-center relative" // Added padding and center alignment
      style={{
        background:
          "linear-gradient(-45deg, #FF6F61, #FFD700, #4CAF50, #2196F3)", // Health-related vibrant gradient colors
        backgroundSize: "400% 400%",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div> {/* Semi-transparent overlay for text readability */}
      <motion.div className="h-full w-full rounded-lg flex flex-col justify-center items-center relative z-10"> {/* z-10 to bring text above overlay */}
        <h3 className="text-white text-lg font-bold mb-2">Important Health Guidelines</h3>
        <p className="text-white text-sm opacity-90 mb-1">Stay hydrated throughout the day.</p>
        <p className="text-white text-sm opacity-90 mb-1">Get at least 7-8 hours of sleep.</p>
        <p className="text-white text-sm opacity-90">Consult a doctor for severe symptoms.</p>
      </motion.div>
    </motion.div>
  );
};

// --- SkeletonFour: Specialized AI Doctor Agents ---
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      {/* AI Gynecologist */}
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        {/* Replaced img with a div for a circular placeholder */}
        <div className="rounded-full h-10 w-10 bg-gradient-to-r from-pink-500 to-purple-500 shrink-0" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Gynecologist AI
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Available
        </p>
      </motion.div>

      {/* AI Neurologist */}
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        {/* Replaced img with a div for a circular placeholder */}
        <div className="rounded-full h-10 w-10 bg-gradient-to-r from-indigo-500 to-blue-500 shrink-0" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Neurologist AI
        </p>
        <p className="border border-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Busy
        </p>
      </motion.div>

      {/* AI Orthopedics */}
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        {/* Replaced img with a div for a circular placeholder */}
        <div className="rounded-full h-10 w-10 bg-gradient-to-r from-green-500 to-teal-500 shrink-0" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Orthopedics AI
        </p>
        <p className="border border-blue-500 bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Specialized
        </p>
      </motion.div>
    </motion.div>
  );
};

// --- SkeletonFive: 24/7 Voice Assistant ---
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {/* User asking a question */}
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 items-start space-x-2 bg-white dark:bg-black"
      >
        {/* Replaced img with a div for a circular placeholder */}
        <div className="rounded-full h-10 w-10 bg-gradient-to-r from-red-400 to-red-600 shrink-0" />
        <p className="text-xs text-neutral-500">
          "Medi, what are the common symptoms of a cold?"
        </p>
      </motion.div>
      {/* Voice Assistant responding */}
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">"A cold typically involves a runny nose, sneezing, and a sore throat..."</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shrink-0" /> {/* Voice Assistant avatar color */}
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "AI Health Reports",
    description: (
      <span className="text-sm">
        Get instant, AI-generated reports based on your symptoms and complaints.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Smart Medicine Suggestions",
    description: (
      <span className="text-sm">
        Receive AI-recommended medications tailored to your condition.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Precautions & Guidelines",
    description: (
      <span className="text-sm">
        Get personalized health precautions and follow-up guidance.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Specialized AI Doctor Agents",
    description: (
      <span className="text-sm">
        Consult AI agents specialized in areas like gynecology, neurology, orthopedics, and more.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "24/7 Voice Assistant",
    description: (
      <span className="text-sm">
        Talk to Medi Voice AI anytime. No appointments needed—just speak, and get care.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
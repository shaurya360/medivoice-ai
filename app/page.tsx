"use client";


import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_component/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


// export default function HeroSectionOne() {
//   return (
//     <div className="relative flex flex-col items-center justify-center">
//       <Navbar />
//       <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
//         <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
//       </div>
//       <div className="px-4 py-10 md:py-20">
//         <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
//           {"Revolutionize Patient Care With AI Voice Assistant"
//             .split(" ")
//             .map((word, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
//                 animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                 transition={{
//                   duration: 0.3,
//                   delay: index * 0.1,
//                   ease: "easeInOut",
//                 }}
//                 className="mr-2 inline-block"
//               >
//                 {word}
//               </motion.span>
//             ))}
//         </h1>
//         <motion.p
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 0.8,
//           }}
//           className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
//         >
//           Provide 24/7 intelligent medical support using conversational AI. Triage symptoms, book appointments, and deliver empathetic care with voice-first automation.
//         </motion.p>
//         <Link href={'/sign-in'}>
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 1,
//           }}
//           className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
//         >
//           <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//             Explore Now
//           </button>
          
//         </motion.div>
//         </Link>
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 10,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 1.2,
//           }}
//           className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
//         >
//           <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
//             <img
//               src="https://assets.aceternity.com/pro/aceternity-landing.webp"
//               alt="Landing page preview"
//               className="aspect-[16/9] h-auto w-full object-cover"
//               height={1000}
//               width={1000}
//             />
//           </div>
//         </motion.div>
//       </div>
//       <FeatureBentoGrid/>
//     </div>
//   );
// }
export default function HeroSectionOne() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Navbar />
      {/* Decorative Lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Empower Healthcare with Medi Voice AI".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Medi Voice AI is your smart medical companion. Get personalized reports, medicine suggestions, and health precautions by talking to expert AI doctors for every part of the body — anytime, anywhere.
        </motion.p>

        <Link href={"/sign-in"} >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href='/dashboard'><button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Get Started 
            </button></Link>
            
          </motion.div>
        </Link>

        {/* <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="App preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div> */}
      </div>

      <FeatureBentoGrid />
    </div>
  );
}

const Navbar = () => {
  const {user} = useUser();
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-20 py-2 dark:border-neutral-800">
      <div className="ml-7">
        <Link href='/'><Image src={"/logo1.png"} alt="logo" width={140} height={600} /></Link>
      </div>
      {!user? 
      <Link href={'/sign-in'}>
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
      </Link>:
      <div className="flex gap-5  items-center">
        <UserButton/>
        <Link href='/dashboard'><Button>DashBoard</Button></Link>
      </div>
      }
      
    </nav>
    
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8 mt-12 rounded-t-xl shadow-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: About Medi Voice AI */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-bold text-purple-300 mb-4">Medi Voice AI</h3>
          <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
            Your intelligent health companion, providing instant AI-powered health reports, medicine suggestions, and 24/7 voice assistance.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm">
                AI Health Reports
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm">
                Medicine Suggestions
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm">
                Precautions & Guidelines
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm">
                AI Doctor Agents
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Legal & Contact */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 text-sm">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-gray-700 my-8" />

      {/* Bottom section: Copyright & Social Media */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
        <p className="mb-4 sm:mb-0 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Medi Voice AI. All rights reserved.
        </p>
        <div className="flex space-x-6">
          {/* Social Media Icons - using placeholder divs for simplicity */}
          <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-200">
            {/* Replace with actual SVG icons from Lucide React or similar */}
            <div className="h-6 w-6 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-xs">FB</span>
            </div>
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-200">
            <div className="h-6 w-6 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-xs">TW</span>
            </div>
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-200">
            <div className="h-6 w-6 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-xs">LI</span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};




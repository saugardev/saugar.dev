'use client'

import { motion, AnimatePresence} from 'framer-motion';

interface AnimatedTitleProps {
  title: string
}

export default function AnimatedTitle({ title }: AnimatedTitleProps) {
  return (
    <AnimatePresence>
      <motion.div
        transition={{duration: 0.3}}
        layoutId={title}
      >
        {title}
      </motion.div>
    </AnimatePresence>
  );
}
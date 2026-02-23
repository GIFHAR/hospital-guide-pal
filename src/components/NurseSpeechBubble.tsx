import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import nurseImg from '@/assets/nurse.jpeg';

interface NurseSpeechBubbleProps {
  message: string;
  showNurse?: boolean;
  nurseSize?: 'sm' | 'md' | 'lg';
}

const NurseSpeechBubble = ({ message, showNurse = true, nurseSize = 'md' }: NurseSpeechBubbleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayedText(message.slice(0, i));
      if (i >= message.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [message]);

  const sizeClasses = {
    sm: 'w-32 h-44',
    md: 'w-44 h-60',
    lg: 'w-52 h-72',
  };

  return (
    <div className="flex items-end gap-4">
      {showNurse && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex-shrink-0 ${sizeClasses[nurseSize]}`}
        >
          <img
            src={nurseImg}
            alt="Nurse Louise"
            className="w-full h-full object-contain object-bottom"
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="relative rounded-2xl bg-card border border-border p-4 max-w-xs mb-8"
        style={{ boxShadow: 'var(--tile-shadow)' }}
      >
        {/* Speech bubble tail */}
        <div
          className="absolute -left-2 bottom-6 w-4 h-4 bg-card border-l border-b border-border rotate-45"
        />
        <p className="text-sm text-foreground relative z-10 leading-relaxed">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-text-bottom"
            />
          )}
        </p>
      </motion.div>
    </div>
  );
};

export default NurseSpeechBubble;

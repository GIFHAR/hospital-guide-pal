import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import nurseImg from '@/assets/nurse-portrait.png';

interface NurseSpeechBubbleProps {
  message: string;
}

const NurseSpeechBubble = ({ message }: NurseSpeechBubbleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    setShowBubble(false);

    const bubbleDelay = setTimeout(() => {
      setShowBubble(true);
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setDisplayedText(message.slice(0, i));
        if (i >= message.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 30);
    }, 600);

    return () => clearTimeout(bubbleDelay);
  }, [message]);

  return (
    <div className="flex-shrink-0 flex flex-col justify-end relative" style={{ width: '200px' }}>
      {/* Speech bubble */}
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-20 rounded-2xl bg-card border border-border px-4 py-3 mb-2"
          style={{ boxShadow: '0 4px 20px -4px hsla(210, 10%, 20%, 0.12)' }}
        >
          <p className="text-xs text-foreground leading-relaxed">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-3 bg-primary ml-0.5 align-text-bottom"
              />
            )}
          </p>
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
        </motion.div>
      )}

      {/* Nurse image - crop to show just the nurse character */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[200px] h-[380px] overflow-hidden"
      >
        <img
          src={nurseImg}
          alt="Nurse Louise"
          className="h-full w-auto object-cover object-left"
        />
      </motion.div>
    </div>
  );
};

export default NurseSpeechBubble;

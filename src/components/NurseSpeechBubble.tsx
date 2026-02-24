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
  <>
    {/* Nurse image (tetap di posisi sekarang) */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[160px] h-[260px] overflow-hidden mt-16"
    >
      <img
        src={nurseImg}
        alt="Nurse Louise"
        className="h-full w-auto object-cover object-left"
      />
    </motion.div>

    {/* Subtitle bubble di bawah layar */}
    {showBubble && (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    className="
      fixed bottom-8 left-[25%] -translate-x-1/2 z-50
      w-[90%] max-w-4xl
      rounded-xl px-2 py-1
      shadow-2xl text-center
      shadow-[#A9C7DB]/30
    "
    style={{
        backgroundColor: '#F7F5E9',
        color: '#4A7794',
      }}

  >
    <p className="text-2xl font-semibold leading-relaxed">
      {displayedText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-1 h-6 bg-white ml-2 align-text-bottom"
        />
      )}
    </p>
  </motion.div>
)}
  </>
);
};

export default NurseSpeechBubble;

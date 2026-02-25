import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
// import nurseImg from '@/assets/nurse-portrait.png';
import { useNurseTTS } from '@/hooks/useNurseTTS';
import nurseVideo from '@/assets/nurse-talking-2.mp4';

interface NurseSpeechBubbleProps {
  message: string;
  enabled: boolean;
}

const NurseSpeechBubble = ({ message, enabled }: NurseSpeechBubbleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const { speak, stop } = useNurseTTS({
    lang: 'en-US',    // subtitle kamu bahasa Inggris
    rate: 0.98,       // lebih natural daripada 1.0
    pitch: 1.05,
    preferredVoiceHints: ['Google', 'Microsoft', 'Samantha', 'Natural', 'Neural'],
  });

  const stopTypingNow = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTyping(false);
  };
  useEffect(() => {
    if (!enabled) {
      stop();         // ✅ stop saat toggle OFF
      return;
    }
    // ✅ baca full subtitle (bukan per huruf)
    speak(message);
  }, [enabled, message]);


  useEffect(() => {
    // stop semua timer yang sebelumnya
    stopTypingNow();

    // kalau OFF: stop + hide bubble (pilih behavior ini biar jelas)
    if (!enabled) {
      setShowBubble(false);
      setDisplayedText('');
      return;
    }

    // start typing
    setDisplayedText('');
    setIsTyping(true);
    setShowBubble(false);

    timeoutRef.current = window.setTimeout(() => {
      setShowBubble(true);
      let i = 0;

      intervalRef.current = window.setInterval(() => {
        i += 1;
        setDisplayedText(message.slice(0, i));

        if (i >= message.length) {
          stopTypingNow(); // clear interval + setIsTyping(false)
        }
      }, 30);
    }, 600);

    return () => {
      stopTypingNow();
    };
  }, [message, enabled]);

  if (!enabled) return null;

  return (
    <>
    
      {/* Nurse video */}
     
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[260px] h-[420px] mt-6 ml-6"
      >
        <video
          ref={(el) => {
            if (!el) return;

            // stop video kalau toggle OFF
            if (!enabled) {
              el.pause();
              return;
            }

            // mulai video saat enabled ON
            el.play().catch(() => {});
            // pause saat TTS selesai (duration video, jadi stop bareng selesai ngomong)
            el.onloadedmetadata = () => {
              // restart dari awal setiap subtitle baru
              el.currentTime = 0;
            };

            // estimasi durasi bicara -> pause video
            const words = message.trim().split(/\s+/).filter(Boolean).length;
            const wpm = 160 * 0.98; // kira2 sesuai rate kamu
            const ms = Math.max(1200, (words / wpm) * 60_000);

            window.setTimeout(() => {
              el.pause();
            }, ms);
          }}
          src={nurseVideo}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-contain"
        />
      </motion.div>

      {/* Bubble */}
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
          style={{ backgroundColor: '#F7F5E9', color: '#4A7794' }}
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
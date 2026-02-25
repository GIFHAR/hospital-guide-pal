import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import NurseSpeechBubble from '@/components/NurseSpeechBubble';
import toiletIcon from '@/assets/05_restroom/restroom.png';

const Restroom = () => {
  const navigate = useNavigate();

  return (
    <LayoutShell showNurseToggle>
      <PageTransition>
        <div className="w-full max-w-5xl mx-auto flex items-end gap-6">
          {/* Nurse + bubble */}
          <NurseSpeechBubble message="Here’s how to reach the nearest restroom from your room. Follow the steps on the screen." />

          {/* Content */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center gap-2">
              <img 
                src={toiletIcon} 
                alt="Toilet" 
                className="w-12 h-12 object-contain" 
              />
              <h2 className="text-3xl font-bold text-foreground">Restroom</h2>
            </div>

            {/* Main info card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl bg-secondary p-8"
            >
              <div className="rounded-3xl bg-secondary p-8 leading-relaxed text-[22px] text-foreground/90">
                <p className="mb-5">
                  Your room is on the first floor.
                  <br />
                  There are four restrooms on this floor.
                </p>

                <p className="mb-4 font-semibold">
                  To get to the nearest restroom from your room, follow these simple steps:
                </p>

                <ol className="list-decimal pl-7 space-y-2 font-semibold">
                  <li>Step outside your room and turn right.</li>
                  <li>Walk along the corridor and pass three other patient rooms.</li>
                  <li>
                    After you pass room 9, you&apos;ll find the restroom on your left—just look for
                    the restroom sign.
                  </li>
                </ol>
              </div>
            </motion.div>

            {/* Go back button (style like screenshot) */}
            <button
              onClick={() => navigate(-1)}
              className="self-start flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-sm hover:shadow transition"
            >
              <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-primary-foreground" />
              </span>
              <span className="text-lg font-semibold text-foreground">Go Back</span>
            </button>
          </div>
        </div>
      </PageTransition>
    </LayoutShell>
  );
};

export default Restroom;
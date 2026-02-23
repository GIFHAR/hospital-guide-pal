import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, ArrowLeft } from 'lucide-react';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import NurseSpeechBubble from '@/components/NurseSpeechBubble';

const facilities = [
  { name: 'Restroom', description: 'Located on every floor near the elevators.' },
  { name: 'Pharmacy', description: 'Ground floor, open 8:00–18:00 weekdays.' },
  { name: 'Stores', description: 'Small convenience shop near the main entrance.' },
];

const Facilities = () => {
  const navigate = useNavigate();

  return (
    <LayoutShell>
      <PageTransition>
        <div className="w-full max-w-4xl mx-auto flex items-center gap-8">
          {/* Nurse with speech bubble */}
          <NurseSpeechBubble
            message="Here are the facilities available at the hospital. You'll find restrooms on every floor, a pharmacy on the ground floor, and a convenience store near the main entrance. Let me know if you need anything else!"
            nurseSize="md"
          />

          <div className="flex-1 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Facilities</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-card p-6 border border-border"
              style={{ boxShadow: 'var(--tile-shadow)' }}
            >
              <div className="flex flex-col gap-4">
                {facilities.map((f) => (
                  <div
                    key={f.name}
                    className="rounded-xl bg-secondary p-4 border border-border"
                  >
                    <h3 className="font-semibold text-foreground">{f.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <button
              onClick={() => navigate('/mystay/info-guidance')}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>
      </PageTransition>
    </LayoutShell>
  );
};

export default Facilities;

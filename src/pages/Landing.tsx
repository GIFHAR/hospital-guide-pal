import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Footprints, MessageCircle, Eye, Ear, ArrowRight, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import { useAppStore } from '@/store/useAppStore';

const assistances = [
  { id: 'mobility', label: 'Mobility Assistance', icon: Footprints },
  { id: 'communication', label: 'Communication Assistance', icon: MessageCircle },
  { id: 'vision', label: 'Vision Assistance', icon: Eye },
  { id: 'hearing', label: 'Hearing Assistance', icon: Ear },
];

const Landing = () => {
  const navigate = useNavigate();
  const { selectedAssistances, toggleAssistance, language, setLanguage } = useAppStore();
  const [justEnabled, setJustEnabled] = useState(false);
  const canContinue = selectedAssistances.length > 0;

  useEffect(() => {
    if (canContinue) {
      setJustEnabled(true);
      const t = setTimeout(() => setJustEnabled(false), 1000);
      return () => clearTimeout(t);
    }
  }, [canContinue]);

  const handleToggle = (id: string, label: string) => {
    const isSelected = selectedAssistances.includes(id);
    toggleAssistance(id);
    toast(isSelected ? `${label} removed` : `${label} selected`, { duration: 2000 });
  };

  return (
    <LayoutShell>
      <PageTransition>
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Welcome To The Tablet!</h1>
            <p className="text-muted-foreground mt-1">Configure tablet access based on patient condition</p>
            <p className="text-sm text-muted-foreground mt-2">Pick one or more to continue</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            {assistances.map((a) => {
              const selected = selectedAssistances.includes(a.id);
              return (
                <motion.button
                  key={a.id}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -3 }}
                  onClick={() => handleToggle(a.id, a.label)}
                  className={`card-tile flex flex-col items-center justify-center gap-3 min-h-[130px]
                    ${selected ? 'card-tile-selected' : 'card-tile-unselected'}`}
                >
                  <a.icon className={`w-8 h-8 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-medium text-sm">{a.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center justify-between w-full mt-4">
            {/* Language selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Select Language:</span>
              <button
                onClick={() => setLanguage('UK')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                  ${language === 'UK' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              >
                🇬🇧 UK
              </button>
              <button
                onClick={() => setLanguage('DK')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                  ${language === 'DK' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              >
                🇩🇰 DK
              </button>
              <button
                onClick={() => toast('More languages coming soon')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground flex items-center gap-1"
              >
                More <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Continue */}
            <motion.button
              disabled={!canContinue}
              onClick={() => navigate('/home')}
              className={`btn-continue flex items-center gap-2 ${justEnabled ? 'glow-pulse' : ''}`}
              whileTap={canContinue ? { scale: 0.96 } : {}}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </PageTransition>
    </LayoutShell>
  );
};

export default Landing;

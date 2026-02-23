import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Footprints, MessageSquare, Eye, Ear, ArrowRight, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import { useAppStore } from '@/store/useAppStore';

const assistances = [
  { id: 'mobility', label: 'Mobility Assistance', icon: Footprints },
  { id: 'communication', label: 'Communication Assistance', icon: MessageSquare },
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
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome To The Tablet!</h1>
            <p className="text-muted-foreground mt-1 text-lg">Configure tablet access based on patient condition</p>
            <p className="text-sm text-muted-foreground mt-2">Pick one or more to continue</p>
          </div>

          {/* 2x2 grid - horizontal cards matching screenshot */}
          <div className="grid grid-cols-2 gap-5 w-full">
            {assistances.map((a) => {
              const selected = selectedAssistances.includes(a.id);
              return (
                <motion.button
                  key={a.id}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -2 }}
                  onClick={() => handleToggle(a.id, a.label)}
                  className={`flex items-center gap-5 rounded-2xl p-5 transition-all duration-200 cursor-pointer
                    ${selected
                      ? 'bg-hospital-selected border-2 border-hospital-selected-border'
                      : 'bg-card border-2 border-border'
                    }`}
                  style={{ boxShadow: 'var(--tile-shadow)' }}
                >
                  <a.icon className={`w-12 h-12 flex-shrink-0 ${selected ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.5} />
                  <span className="font-bold text-lg text-foreground">{a.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center justify-between w-full mt-4">
            {/* Language selector */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Select Language:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage('UK')}
                  className={`text-2xl p-1 rounded-lg transition-all ${language === 'UK' ? 'ring-2 ring-primary' : ''}`}
                >
                  🇬🇧
                </button>
                <button
                  onClick={() => setLanguage('DK')}
                  className={`text-2xl p-1 rounded-lg transition-all ${language === 'DK' ? 'ring-2 ring-primary' : ''}`}
                >
                  🇩🇰
                </button>
                <button
                  onClick={() => toast('More languages coming soon')}
                  className="w-9 h-9 rounded-full bg-primary/60 text-primary-foreground flex items-center justify-center text-xs font-bold"
                >
                  <span>More</span>
                </button>
              </div>
            </div>

            {/* Continue */}
            {/* Continue */}
            <motion.button
              type="button"
              onClick={() => navigate('/home')}
              className={`flex items-center gap-3 rounded-full px-8 py-3 font-semibold text-lg transition-all border-2 border-border bg-card text-foreground hover:shadow-lg
                ${justEnabled ? 'glow-pulse' : ''}`}
              whileTap={{ scale: 0.96 }}
            >
              Continue
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-primary-foreground" />
              </span>
            </motion.button>
          </div>
        </div>
      </PageTransition>
    </LayoutShell>
  );
};

export default Landing;

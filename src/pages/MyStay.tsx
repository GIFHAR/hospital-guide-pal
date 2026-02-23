import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, FileText, Phone, ArrowLeft, Home as HomeIcon } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import CardTile from '@/components/CardTile';
import { useAppStore } from '@/store/useAppStore';
import { useGuidedSteps } from '@/hooks/useGuidedSteps';

const tiles = [
  { id: 'InfoGuidance', label: 'Info and Guidance', icon: Info, route: '/mystay/info-guidance' },
  { id: 'MySP', label: 'MySP', icon: FileText, route: null },
  { id: 'ChatOrCall', label: 'Chat or Call', icon: Phone, route: null },
];

const MyStay = () => {
  const navigate = useNavigate();
  const { nurseAssistanceEnabled, setNurseAssistance } = useAppStore();
  const { highlightTarget } = useGuidedSteps();
  const [dimmedTiles, setDimmedTiles] = useState<string | null>(null);

  const handleTileClick = (tile: typeof tiles[0]) => {
    if (tile.route) {
      setDimmedTiles(tile.id);
      setTimeout(() => navigate(tile.route!), 350);
    } else {
      toast('Coming soon');
    }
  };

  const handleToggleNurse = () => {
    const next = !nurseAssistanceEnabled;
    setNurseAssistance(next);
    toast(next ? 'Nurse assistance enabled' : 'Nurse assistance turned off');
  };

  return (
    <LayoutShell>
      <PageTransition>
        <div className="w-full max-w-4xl mx-auto flex items-center gap-8">
          {/* Nurse illustration */}
          <div className="flex-shrink-0 w-48 h-64 rounded-2xl bg-secondary flex items-center justify-center">
            <span className="text-6xl">👩‍⚕️</span>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-2">
              <HomeIcon className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">MyStay</h2>
            </div>

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-card p-6 border border-border"
              style={{ boxShadow: 'var(--tile-shadow)' }}
            >
              {/* Toggle */}
              <div className="flex justify-end items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">Turn off nurse assistance</span>
                <button
                  onClick={handleToggleNurse}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    nurseAssistanceEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-card shadow"
                    animate={{ left: nurseAssistanceEnabled ? 22 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-3 gap-4">
                {tiles.map((tile) => (
                  <CardTile
                    key={tile.id}
                    icon={<tile.icon className="w-8 h-8" />}
                    label={tile.label}
                    highlighted={highlightTarget === tile.label}
                    dimmed={dimmedTiles !== null && dimmedTiles !== tile.id}
                    onClick={() => handleTileClick(tile)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Back */}
            <button
              onClick={() => navigate('/home')}
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

export default MyStay;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Thermometer, Gamepad2 } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import CardTile from '@/components/CardTile';
import { useAppStore } from '@/store/useAppStore';
import { useGuidedSteps } from '@/hooks/useGuidedSteps';
import nurseImg from '@/assets/nurse.jpeg';

const tiles = [
  { id: 'MyStay', label: 'MyStay', icon: Bed, route: '/mystay' },
  { id: 'MyComfort', label: 'MyComfort', icon: Thermometer, route: null },
  { id: 'ThingsToDo', label: 'Things to Do', icon: Gamepad2, route: null },
];

const Home = () => {
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
          <div className="flex-shrink-0 w-48 h-64">
            <img src={nurseImg} alt="Nurse Louise" className="w-full h-full object-contain object-bottom" />
          </div>

          {/* Main panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 rounded-3xl bg-card p-6 border border-border"
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

            {/* Tiles row */}
            <div className="grid grid-cols-3 gap-4 mb-4">
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

            {/* Ask a Nurse */}
            <motion.button
              whileTap={nurseAssistanceEnabled ? { scale: 0.98 } : {}}
              disabled={!nurseAssistanceEnabled}
              onClick={() => toast('Contacting Nurse Maria...')}
              className={`w-full rounded-2xl p-4 font-semibold text-center transition-all
                ${nurseAssistanceEnabled
                  ? 'bg-primary text-primary-foreground hover:brightness-110'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
            >
              Ask a Nurse Maria
            </motion.button>
          </motion.div>
        </div>
      </PageTransition>
    </LayoutShell>
  );
};

export default Home;

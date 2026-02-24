import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Layers, Play, Headset } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import CardTile from '@/components/CardTile';
import NurseSpeechBubble from '@/components/NurseSpeechBubble';
import { useAppStore } from '@/store/useAppStore';
import { useGuidedSteps } from '@/hooks/useGuidedSteps';
import houseIcon from '@/assets/01_home/house.png';
import pillowsIcon from '@/assets/01_home/pillows.png';
import playIcon from '@/assets/01_home/Play.png';
import callsIcon from '@/assets/01_home/Calls.png';

const tiles = [
  { id: 'MyStay', label: 'MyStay', icon: houseIcon, route: '/mystay' },
  { id: 'MyComfort', label: 'MyComfort', icon: pillowsIcon, route: null },
  { id: 'ThingsToDo', label: 'Things to Do', icon: playIcon, route: null },
];

const Home = () => {
  const navigate = useNavigate();
  const { nurseAssistanceEnabled } = useAppStore();
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

  return (
    <LayoutShell showNurseToggle>
      <PageTransition>
        <div className="app-container w-full max-w-5xl mx-auto flex items-end gap-4">
          {/* Nurse with speech bubble */}
          <NurseSpeechBubble
            message="Hello! I'm Nurse Louise. Welcome to your tablet. Tap 'MyStay' to explore your stay information, comfort settings, and more!"
          />

          {/* Main panel */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-secondary p-6"
            >
              {/* Tiles row */}
              <div className="app-grid grid-cols-3 gap-4 mb-4">
                {tiles.map((tile) => (
                  <CardTile
                    key={tile.id}                    
                    icon={<img src={tile.icon} className="w-20 h-20 object-contain" />}
                    label={tile.label}
                    highlighted={highlightTarget === tile.label}
                    dimmed={dimmedTiles !== null && dimmedTiles !== tile.id}
                    onClick={() => handleTileClick(tile)}
                    className="min-h-[140px] justify-center"
                  />
                ))}
              </div>

              {/* Ask a Nurse */}
              <motion.button
                whileTap={nurseAssistanceEnabled ? { scale: 0.98 } : {}}
                disabled={!nurseAssistanceEnabled}
                onClick={() => toast('Contacting Nurse Maria...')}
                className={`w-full rounded-2xl p-5 font-bold text-4xl flex items-center justify-center gap-4 text-center transition-all
                  ${nurseAssistanceEnabled
                    ? 'bg-card text-foreground hover:shadow-md border border-border'
                    : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
                  }`}
              >
                <img
                  src={callsIcon} 
                  alt="Call Nurse" 
                  className="w-20 h-20 object-contain" 
                />
                Ask a Nurse Maria
              </motion.button>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </LayoutShell>
  );
};

export default Home;

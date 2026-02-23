import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import CardTile from '@/components/CardTile';
import NurseSpeechBubble from '@/components/NurseSpeechBubble';
import { useGuidedSteps } from '@/hooks/useGuidedSteps';
import cardInfo from '@/assets/card-info.png';
import cardHealth from '@/assets/card-health.png';
import cardContact from '@/assets/card-contact.png';

const tiles = [
  {
    id: 'InfoGuidance',
    label: 'Info and Guidance',
    description: 'Department, Hospital, and Facilities',
    image: cardInfo,
    route: '/mystay/info-guidance',
  },
  {
    id: 'MySP',
    label: 'MySP',
    description: 'View MySP Information',
    image: cardHealth,
    route: null,
  },
  {
    id: 'ChatOrCall',
    label: 'Chat or Call',
    description: 'Messages and Video Calls',
    image: cardContact,
    route: null,
  },
];

const MyStay = () => {
  const navigate = useNavigate();
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
        <div className="w-full max-w-5xl mx-auto flex items-end gap-6">
          {/* Nurse with speech bubble */}
          <NurseSpeechBubble
            message="Welcome to MyStay! Here you can find information about your department, view your care plan, or contact your care team. Tap 'Info and Guidance' to learn more."
          />

          <div className="flex-1 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-2">
              <HomeIcon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              <h2 className="text-2xl font-bold text-foreground">MyStay</h2>
            </div>

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-secondary p-6"
            >
              <div className="grid grid-cols-3 gap-4">
                {tiles.map((tile) => (
                  <CardTile
                    key={tile.id}
                    image={tile.image}
                    label={tile.label}
                    description={tile.description}
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
              className="flex items-center gap-2 text-sm font-medium text-foreground self-start"
            >
              <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <ArrowLeft className="w-4 h-4 text-primary-foreground" />
              </span>
              Go Back
            </button>
          </div>
        </div>
      </PageTransition>
    </LayoutShell>
  );
};

export default MyStay;

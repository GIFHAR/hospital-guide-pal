import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import CardTile from '@/components/CardTile';
import NurseSpeechBubble from '@/components/NurseSpeechBubble';
import { useGuidedSteps } from '@/hooks/useGuidedSteps';
import cardInfo from '@/assets/card-info.png';
import cardHealth from '@/assets/card-health.png';
import cardContact from '@/assets/card-contact.png';
import infoIcon from '@/assets/03_info/info.png';
import cardioIcon from '@/assets/03_info/cardio.png';
import regionHIcon from '@/assets/03_info/regionH.png';
import facilityIcon from '@/assets/03_info/facility.png';

const tiles = [
  {
    id: 'Cardiology',
    label: 'Department of Cardiology',
    description: 'About the Department and Instruction',
    image: cardioIcon,
    route: null,
  },
  {
    id: 'Hospitals',
    label: 'Nordsjællands Hospitals',
    description: 'Website, Practical, Laboratory, and Discharged',
    image: regionHIcon,
    route: null,
  },
  {
    id: 'Facilities',
    label: 'Facilities',
    description: 'Restroom, Pharmacy, and Stores',
    image: facilityIcon,
    route: '/mystay/info-guidance/facilities',
  },
];

const InfoGuidance = () => {
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
            enabled={true}
            message="This is the Info and Guidance section. You can learn about your department, explore hospital resources, or check available facilities. Tap 'Facilities' to see what's nearby!"
          />

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={infoIcon} 
                alt="Info" 
                className="w-12 h-12 object-contain" 
              />
              <h2 className="text-3xl font-bold text-foreground">Info and Guidance</h2>
            </div>

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

export default InfoGuidance;

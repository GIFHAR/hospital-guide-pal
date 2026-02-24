import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import CardTile from '@/components/CardTile';
import NurseSpeechBubble from '@/components/NurseSpeechBubble';
import cardInfo from '@/assets/card-info.png';
import cardHealth from '@/assets/card-health.png';
import cardContact from '@/assets/card-contact.png';
import facilityIcon from '@/assets/04_facility/facility.png';
import toiletIcon from '@/assets/04_facility/restroom.png';
import pharmaIcon from '@/assets/04_facility/pharma.png';
import storeIcon from '@/assets/04_facility/store.png';

const facilities = [
  {
    id: 'Restroom',
    label: 'Restroom',
    description: 'Navigate the location near me',
    image: toiletIcon,
  },
  {
    id: 'Pharmacy',
    label: 'Pharmacy',
    description: 'Navigate the location near me',
    image: pharmaIcon,
  },
  {
    id: 'Stores',
    label: 'Stores',
    description: 'Restaurant and Convenience Store',
    image: storeIcon,
  },
];

const Facilities = () => {
  const navigate = useNavigate();
  const [dimmedTiles, setDimmedTiles] = useState<string | null>(null);

  const handleTileClick = (facility: typeof facilities[0]) => {
    setDimmedTiles(facility.id);
    toast(`Opening ${facility.label}...`);
    setTimeout(() => setDimmedTiles(null), 500);
  };

  return (
    <LayoutShell showNurseToggle>
      <PageTransition>
        <div className="w-full max-w-5xl mx-auto flex items-end gap-6">
          {/* Nurse with speech bubble */}
          <NurseSpeechBubble
            message="Here are the facilities available at the hospital. You can find restrooms on every floor, a pharmacy, and stores nearby. Tap any option to navigate to the location!"
          />

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={facilityIcon} 
                alt="Facility" 
                className="w-12 h-12 object-contain" 
              />
              <h2 className="text-3xl font-bold text-foreground">Facilities</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-secondary p-6"
            >
              <div className="grid grid-cols-3 gap-4">
                {facilities.map((f) => (
                  <CardTile
                    key={f.id}
                    image={f.image}
                    label={f.label}
                    description={f.description}
                    dimmed={dimmedTiles !== null && dimmedTiles !== f.id}
                    onClick={() => handleTileClick(f)}
                  />
                ))}
              </div>
            </motion.div>

            <button
              onClick={() => navigate('/mystay/info-guidance')}
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

export default Facilities;

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Building2, Landmark, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import LayoutShell from '@/components/LayoutShell';
import PageTransition from '@/components/PageTransition';
import CardTile from '@/components/CardTile';
import { useGuidedSteps } from '@/hooks/useGuidedSteps';

const tiles = [
  { id: 'Cardiology', label: 'Department of Cardiology', icon: Building2, route: null },
  { id: 'Hospitals', label: 'Nordsjællands Hospitals', icon: Landmark, route: null },
  { id: 'Facilities', label: 'Facilities', icon: Info, route: '/mystay/info-guidance/facilities' },
];

const InfoGuidance = () => {
  const navigate = useNavigate();
  const { highlightTarget } = useGuidedSteps();

  const handleTileClick = (tile: typeof tiles[0]) => {
    if (tile.route) {
      navigate(tile.route);
    } else {
      toast('Coming soon');
    }
  };

  return (
    <LayoutShell>
      <PageTransition>
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Info and Guidance</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-card p-6 border border-border"
            style={{ boxShadow: 'var(--tile-shadow)' }}
          >
            <div className="grid grid-cols-3 gap-4">
              {tiles.map((tile) => (
                <CardTile
                  key={tile.id}
                  icon={<tile.icon className="w-8 h-8" />}
                  label={tile.label}
                  highlighted={highlightTarget === tile.label}
                  onClick={() => handleTileClick(tile)}
                />
              ))}
            </div>
          </motion.div>

          <button
            onClick={() => navigate('/mystay')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </PageTransition>
    </LayoutShell>
  );
};

export default InfoGuidance;

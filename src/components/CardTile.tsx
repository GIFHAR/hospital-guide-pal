import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardTileProps {
  icon: ReactNode;
  label: string;
  selected?: boolean;
  highlighted?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
  className?: string;
}

const CardTile = ({ icon, label, selected, highlighted, dimmed, onClick, className = '' }: CardTileProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className={`card-tile flex flex-col items-center justify-center gap-3 text-center min-h-[140px] w-full
        ${selected ? 'card-tile-selected' : 'card-tile-unselected'}
        ${highlighted ? 'tooltip-highlight' : ''}
        ${dimmed ? 'opacity-40 blur-[1px]' : ''}
        ${className}
      `}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <div className="text-primary">{icon}</div>
      <span className="font-medium text-sm text-foreground">{label}</span>
    </motion.button>
  );
};

export default CardTile;

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardTileProps {
  icon?: ReactNode;
  image?: string;
  label: string;
  description?: string;
  selected?: boolean;
  highlighted?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
  className?: string;
}

const CardTile = ({ icon, image, label, description, selected, highlighted, dimmed, onClick, className = '' }: CardTileProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className={`card-tile flex flex-col items-center text-left w-full p-4
        ${selected ? 'card-tile-selected' : 'card-tile-unselected'}
        ${highlighted ? 'tooltip-highlight' : ''}
        ${dimmed ? 'opacity-40 blur-[1px]' : ''}
        ${className}
      `}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {image && (
        <div className="w-full flex justify-center mb-3">
          <img src={image} alt={label} className="w-24 h-24 object-contain" />
        </div>
      )}
      {icon && !image && (
        <div className="text-primary mb-3">{icon}</div>
      )}
      <span className="font-bold text-base text-foreground">{label}</span>
      {description && (
        <span className="text-xs text-muted-foreground mt-1 leading-snug">{description}</span>
      )}
    </motion.button>
  );
};

export default CardTile;

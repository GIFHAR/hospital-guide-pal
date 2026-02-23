import { Settings, Power } from 'lucide-react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';

interface LayoutShellProps {
  children: ReactNode;
  showNurseToggle?: boolean;
}

const LayoutShell = ({ children, showNurseToggle = false }: LayoutShellProps) => {
  const { nurseAssistanceEnabled, setNurseAssistance } = useAppStore();

  const handleToggleNurse = () => {
    const next = !nurseAssistanceEnabled;
    setNurseAssistance(next);
    toast(next ? 'Nurse assistance enabled' : 'Nurse assistance turned off');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Header band */}
      <header className="header-band flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3">
        <img
          src="/hospital-logo.png"
          alt="Hospital Logo"
          className="h-10 w-auto"
        />
      </div>

        <div className="flex items-center gap-4">
          {showNurseToggle && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleNurse}
                className={`w-14 h-7 rounded-full transition-colors relative flex items-center ${
                  nurseAssistanceEnabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <motion.div
                  className="absolute w-6 h-6 rounded-full bg-card shadow flex items-center justify-center"
                  animate={{ left: nurseAssistanceEnabled ? 30 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Power className="w-3.5 h-3.5 text-destructive" />
                </motion.div>
              </button>
              <span className="text-sm font-bold text-foreground leading-tight max-w-[120px]">Turn off nurse assistance</span>
            </div>
          )}
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Settings className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
};

export default LayoutShell;

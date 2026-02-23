import { Settings } from 'lucide-react';
import { ReactNode } from 'react';

interface LayoutShellProps {
  children: ReactNode;
}

const LayoutShell = ({ children }: LayoutShellProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Header band */}
      <header className="header-band flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-foreground text-sm">Nordsjællands</p>
            <p className="text-muted-foreground text-xs">Hospital</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
};

export default LayoutShell;

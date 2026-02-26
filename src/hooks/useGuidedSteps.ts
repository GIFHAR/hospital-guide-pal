import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const GUIDED_STEPS: Record<string, { message: string; step: number }> = {
  '/home': { message: 'Step 1: Tap MyStay', step: 1 },
  '/mystay': { message: 'Step 2: Tap Info and Guidance', step: 2 },
  '/mystay/info-guidance': { message: 'Step 3: Tap Facilities', step: 3 },
  '/mystay/info-guidance/facilities': { message: 'Step 4: Tap Restroom', step: 4 },
};

export const useGuidedSteps = () => {
  const location = useLocation();
  const currentStep = GUIDED_STEPS[location.pathname];

  useEffect(() => {
    if (currentStep) {
      const timeout = setTimeout(() => {
        toast.info(currentStep.message, { duration: 4000 });
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  return {
    highlightTarget: currentStep ? getHighlightTarget(location.pathname) : null,
  };
};

function getHighlightTarget(pathname: string): string | null {
  switch (pathname) {
    case '/home': return 'MyStay';
    case '/mystay': return 'Info & Guidance';
    case '/mystay/info-guidance': return 'Facilities';
    case '/mystay/info-guidance/facilities': return 'Restroom';
    default: return null;
  }
}

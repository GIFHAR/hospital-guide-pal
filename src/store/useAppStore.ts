import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  selectedAssistances: string[];
  language: string;
  nurseAssistanceEnabled: boolean;
  toggleAssistance: (id: string) => void;
  setLanguage: (lang: string) => void;
  setNurseAssistance: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedAssistances: [],
      language: 'UK',
      nurseAssistanceEnabled: true,
      toggleAssistance: (id) =>
        set((state) => ({
          selectedAssistances: state.selectedAssistances.includes(id)
            ? state.selectedAssistances.filter((a) => a !== id)
            : [...state.selectedAssistances, id],
        })),
      setLanguage: (lang) => set({ language: lang }),
      setNurseAssistance: (enabled) => set({ nurseAssistanceEnabled: enabled }),
    }),
    { name: 'hospital-app-store' }
  )
);

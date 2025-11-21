import { createStore } from "zustand/vanilla";

type FilterState = {
  name: string;
  dateRange: string;
  "income.exclude": string;
  "income.types": string[];
  "allocation.donationItem": string[];
  "allocation.location": string[];
};

const defaultFilters: FilterState = {
  name: "",
  dateRange: "",
  "income.exclude": "yes",
  "income.types": [],
  "allocation.donationItem": [],
  "allocation.location": [],
};

type FilterKeys = keyof FilterState;

type AppState = {
  currentFilters: FilterState;
  draftFilters: Partial<FilterState>;
  updateFilter: (key: FilterKeys, value: any) => void;
  saveFilters: () => void;
  clearDraft: () => void;
};

export const store = createStore<AppState>((set) => ({
  currentFilters: defaultFilters,
  draftFilters: {},
  updateFilter: (path: FilterKeys, value: any) =>
    set((state) => {
      return { draftFilters: { ...state.draftFilters, [path]: value } };
    }),
  saveFilters: () => {
    set((state) => ({
      currentFilters: { ...state.currentFilters, ...state.draftFilters },
      draftFilters: {},
    }));
  },
  clearDraft: () => {
    set(() => ({ draftFilters: {} }));
  },
}));

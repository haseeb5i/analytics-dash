import { createStore } from "zustand/vanilla";
import { setDeepValue } from "./utils";

type FilterState = {
  name: string;
  dateTime: string;
  income: {
    types: string[];
  };
  allocation: {
    donationItem: string[];
    location: string[];
  };
};

const defaultFilters: FilterState = {
  name: "",
  dateTime: "",
  income: {
    types: [],
  },
  allocation: {
    donationItem: [],
    location: [],
  },
};

type AppState = {
  currentFilters: FilterState;
  draftFilters: FilterState | null;
  updateFilter: (path: string, value: any) => void;
  saveFilters: () => void;
  clearDraft: () => void;
};

export const store = createStore<AppState>((set) => ({
  currentFilters: defaultFilters,
  draftFilters: null,
  updateFilter: (path: string, value: any) =>
    set((state) => {
      // Create a clone of currentFilters when starting a draft so we don't
      // accidentally mutate the shared default/current object.
      const base = state.draftFilters ? state.draftFilters : JSON.parse(JSON.stringify(state.currentFilters));
      setDeepValue(base, path, value);
      return { draftFilters: base } as Partial<AppState>;
    }),
  saveFilters: () => {
    set((state) => ({
      currentFilters: state.draftFilters || state.currentFilters,
      draftFilters: null,
    }));
  },
  clearDraft: () => {
    set(() => ({ draftFilters: null }));
  },
}));

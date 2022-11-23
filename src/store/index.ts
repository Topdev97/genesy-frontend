import create from "zustand";
interface ITezosState {
  activeAddress: string;
  setActiveAddress: { (_activeAddress: string): void };
}
export const useTezosCollectStore = create<ITezosState>((set, get) => ({
  activeAddress: "",
  setActiveAddress: (_activeAddress: string) => {
    set((state: any) => ({
      ...state,
      activeAddress: _activeAddress,
    }));
  }
}));

import { create } from "zustand"

interface TemporadaState {
  altaPercentage: string;
  bajaPercentage: string;
  setAltaPercentage: (value: string) => void;
  setBajaPercentage: (value: string) => void;
}

const getInitialAlta = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("altaPercentage") ?? "20";
  }
  return "20";
};

const getInitialBaja = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("bajaPercentage") ?? "0";
  }
  return "0";
};

export const useTemporadaStore = create<TemporadaState>((set) => ({
  altaPercentage: getInitialAlta(),
  bajaPercentage: getInitialBaja(),

  setAltaPercentage: (value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("altaPercentage", value);
    }
    set({ altaPercentage: value });
  },

  setBajaPercentage: (value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bajaPercentage", value);
    }
    set({ bajaPercentage: value });
  },
}));

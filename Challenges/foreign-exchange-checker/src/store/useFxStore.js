import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFxStore = create(
  persist(
    (set, get) => ({
      // State
      amount: 1000,
      fromCurrency: "USD",
      toCurrency: "EUR",
      rates: null, // { EUR: 0.8530, GBP: 0.7366, ... }
      favorites: [], // array of pair strings, e.g. ['USD/EUR']
      conversionLog: [], // array of { id, timestamp, from, to, amount, result }
      activeTab: "history", // 'history' | 'compare' | 'favorites' | 'log'
      chartRange: "1m", // '1d' | '1w' | '1m' | '3m' | '1y' | '5y'
      activeTab: "history",
      chartRange: "1m",

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      setChartRange: (range) => set({ chartRange: range }),
      setAmount: (amount) => set({ amount }),
      setFromCurrency: (currency) => set({ fromCurrency: currency }),
      setToCurrency: (currency) => set({ toCurrency: currency }),
      setRates: (rates) => set({ rates }),
      toggleFavorite: (pair) =>
        set((state) => ({
          favorites: state.favorites.includes(pair)
            ? state.favorites.filter((p) => p !== pair)
            : [...state.favorites, pair],
        })),
      addLogEntry: (entry) =>
        set((state) => ({
          conversionLog: [entry, ...state.conversionLog],
        })),
      clearLog: () => set({ conversionLog: [] }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setChartRange: (range) => set({ chartRange: range }),
    }),
    {
      name: "fx-checker-storage", // localStorage key
      partialize: (state) => ({
        favorites: state.favorites,
        conversionLog: state.conversionLog,
        fromCurrency: state.fromCurrency,
        toCurrency: state.toCurrency,
        amount: state.amount,
        activeTab: state.activeTab,
        chartRange: state.chartRange,
      }),

      deleteLogEntry: (id) =>
        set((state) => ({
          conversionLog: state.conversionLog.filter((entry) => entry.id !== id),
        })),
    },
  ),
);

export default useFxStore;

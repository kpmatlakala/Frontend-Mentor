import { create } from "zustand";
import { persist } from "zustand/middleware";

// List of currencies we actually display
const RELEVANT_CURRENCIES = [
  "EUR",
  "GBP",
  "JPY",
  "CHF",
  "CAD",
  "AUD",
  "INR",
  "CNY",
  "BDT",
  "NZD",
  "TRY",
  "ZAR",
  "KRW",
  "SEK",
  "NOK",
];

const useFxStore = create(
  persist(
    (set, get) => ({
      // --- State ---
      amount: 1000,
      fromCurrency: "USD",
      toCurrency: "EUR",
      rates: null,
      availableCurrencies: null,
      favorites: [],
      conversionLog: [],
      activeTab: "history",
      chartRange: "1m",
      isLoading: false,
      error: null,
      lastFetched: null,
      historyData: null,
      lastFetchedRange: null,
      allRates: null, // full object { quote: rate, ... } for all currencies

      // --- Async API Actions ---

      fetchCurrencies: async () => {
        try {
          console.log("🔄 Fetching currencies...");
          const response = await fetch(
            "https://api.frankfurter.dev/v2/currencies",
          );
          if (!response.ok) throw new Error("Failed to fetch currencies");
          const data = await response.json();
          const currenciesMap = {};
          data.forEach((currency) => {
            currenciesMap[currency.iso_code] = currency.name;
          });
          set({ availableCurrencies: currenciesMap });
          console.log(
            "✅ Currencies loaded:",
            Object.keys(currenciesMap).length,
          );
        } catch (error) {
          console.error("❌ Currencies error:", error);
          set({ error: error.message });
        }
      },

      fetchAllRates: async () => {
        const { fromCurrency, isLoading } = get();
        if (isLoading) return;
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `https://api.frankfurter.dev/v2/rates?base=${fromCurrency}`,
          );
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          const ratesMap = {};
          data.forEach((item) => {
            ratesMap[item.quote] = item.rate;
          });
          set({ allRates: ratesMap, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      fetchRates: async () => {
        const { fromCurrency, isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true, error: null });
        try {
          console.log(`🔄 Fetching rates for ${fromCurrency}...`);
          // Try to filter with quotes, but we'll also filter client‑side
          const quotesParam = RELEVANT_CURRENCIES.join(",");
          const response = await fetch(
            `https://api.frankfurter.dev/v2/rates?base=${fromCurrency}&quotes=${quotesParam}`,
          );
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();

          // data is an array: [ { date, base, quote, rate }, ... ]
          // Filter to only keep relevant currencies (client‑side fallback)
          const filtered = data.filter((item) =>
            RELEVANT_CURRENCIES.includes(item.quote),
          );

          const ratesMap = {};
          filtered.forEach((item) => {
            ratesMap[item.quote] = item.rate;
          });

          console.log(
            "✅ Rates loaded:",
            Object.keys(ratesMap).length,
            "currencies",
          );
          set({
            rates: ratesMap,
            isLoading: false,
            lastFetched: Date.now(),
          });
        } catch (error) {
          console.error("❌ Rates error:", error);
          set({ error: error.message, isLoading: false });
        }
      },

      fetchHistory: async (range) => {
        const { fromCurrency, toCurrency } = get();

        // ✅ Never default to 5y – start with a smaller range
        const effectiveRange = range === "5y" ? "1y" : range;

        const now = new Date();
        let startDate = new Date();

        switch (effectiveRange) {
          case "1d":
            startDate.setDate(now.getDate() - 1);
            break;
          case "1w":
            startDate.setDate(now.getDate() - 7);
            break;
          case "1m":
            startDate.setMonth(now.getMonth() - 1);
            break;
          case "3m":
            startDate.setMonth(now.getMonth() - 3);
            break;
          case "1y":
            startDate.setFullYear(now.getFullYear() - 1);
            break;
          default:
            startDate.setMonth(now.getMonth() - 1); // 1m fallback
        }

        const start = startDate.toISOString().split("T")[0];
        const end = now.toISOString().split("T")[0];

        console.log(
          `🔄 Fetching history for ${fromCurrency}/${toCurrency} (${start} - ${end})...`,
        );

        set({ isLoading: true, error: null });
        try {
          const url = `https://api.frankfurter.dev/v2/rates?from=${start}&to=${end}&base=${fromCurrency}&quotes=${toCurrency}`;
          console.log("📡 Requesting:", url);
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          console.log("📦 Raw history response (first 3):", data.slice(0, 3));

          const historyData = data.map((item) => ({
            date: item.date,
            rate: item.rate,
          }));

          console.log("✅ History loaded:", historyData.length, "data points");
          set({ historyData, isLoading: false });
          return historyData;
        } catch (error) {
          console.error("❌ History error:", error);
          set({ error: error.message, historyData: [], isLoading: false });
          return [];
        }
      },

      // --- Sync Actions ---
      setActiveTab: (tab) => set({ activeTab: tab }),
      setChartRange: (range) => set({ chartRange: range }),
      setAmount: (amount) => set({ amount }),
      setFromCurrency: (currency) => {
        set({ fromCurrency: currency });
        get().fetchRates();
      },
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

      deleteLogEntry: (id) =>
        set((state) => ({
          conversionLog: state.conversionLog.filter((entry) => entry.id !== id),
        })),

      refreshRatesIfStale: async () => {
        const { lastFetched } = get();
        if (!lastFetched || Date.now() - lastFetched > 60000) {
          await get().fetchRates();
        }
      },
    }),
    {
      name: "fx-checker-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        conversionLog: state.conversionLog,
        fromCurrency: state.fromCurrency,
        toCurrency: state.toCurrency,
        amount: state.amount,
        activeTab: state.activeTab,
        chartRange: state.chartRange,
      }),
    },
  ),
);

export default useFxStore;

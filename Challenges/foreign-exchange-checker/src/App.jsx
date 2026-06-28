import { useEffect } from "react";
import Header from "./components/layout/Header";
import Ticker from "./components/layout/Ticker";
import Converter from "./components/converter/Converter";
import Tabs from "./components/tabs/Tabs";
import TabPanels from "./components/tabs/TabPanels";
import useFxStore from "./store/useFxStore";

function App() {
  const fetchCurrencies = useFxStore((state) => state.fetchCurrencies);
  const fetchRates = useFxStore((state) => state.fetchRates);
  const refreshRatesIfStale = useFxStore((state) => state.refreshRatesIfStale);
  const fetchHistory = useFxStore((state) => state.fetchHistory);
  const activeTab = useFxStore((state) => state.activeTab);
  const chartRange = useFxStore((state) => state.chartRange);
  const fetchAllRates = useFxStore((state) => state.fetchAllRates);
  const fromCurrency = useFxStore((state) => state.fromCurrency);
  const allRates = useFxStore((state) => state.allRates);
  const rates = useFxStore((state) => state.rates);
  const historyData = useFxStore((state) => state.historyData);

  // Initial data fetch – currencies and rates
  useEffect(() => {
    fetchCurrencies();
    fetchRates();
  }, [fetchCurrencies, fetchRates]);

  // Fetch history when History tab is active
  useEffect(() => {
    if (activeTab === "history") {
      fetchHistory(chartRange);
    }
  }, [activeTab, chartRange, fetchHistory]);

  // Auto-refresh rates every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshRatesIfStale();
    }, 60000);
    return () => clearInterval(interval);
  }, [refreshRatesIfStale]);

  useEffect(() => {
    if (activeTab === "compare" || activeTab === "favorites") {
      fetchAllRates();
    }
  }, [activeTab, fromCurrency, fetchAllRates]);

  // Debug logs
  useEffect(() => {
    if (rates) {
      console.log(
        "✅ Rates in store:",
        Object.keys(rates).length,
        "currencies",
      );
    }
  }, [rates]);

  useEffect(() => {
    if (historyData && historyData.length > 0) {
      console.log("✅ History data loaded:", historyData.length, "points");
    }
  }, [historyData]);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-50 font-mono">
      <Header />
      <Ticker />
      <main className="max-w-[1080px] mx-auto p-4 sm:px-8 sm:py-12 flex flex-col gap-6 sm:gap-8">
        <Converter />
        <div className="flex flex-col gap-4 sm:gap-5">
          <Tabs />
          <TabPanels />
        </div>
      </main>
    </div>
  );
}

export default App;

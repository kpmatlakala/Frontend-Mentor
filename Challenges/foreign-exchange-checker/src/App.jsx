import Header from "./components/layout/Header";
import Ticker from "./components/layout/Ticker";
import Converter from "./components/converter/Converter";
import Tabs from "./components/tabs/Tabs";
import TabPanels from "./components/tabs/TabPanels";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-50 font-mono">
      <Header />
      <Ticker />
      <main className="max-w-[1100px] mx-auto px-8 py-12 flex flex-col gap-8">
        <Converter />
        <div className="flex flex-col gap-5">
          <Tabs />
          <TabPanels />
        </div>
      </main>
    </div>
  );
}

export default App;

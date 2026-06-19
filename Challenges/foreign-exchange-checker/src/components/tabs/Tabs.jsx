import useFxStore from '../../store/useFxStore';

export default function Tabs() {
  const activeTab = useFxStore(state => state.activeTab);
  const setActiveTab = useFxStore(state => state.setActiveTab);
  const favorites = useFxStore(state => state.favorites);
  const conversionLog = useFxStore(state => state.conversionLog);

  const tabs = [
    { id: 'history', label: 'HISTORY' },
    { id: 'compare', label: 'COMPARE' },
    { id: 'favorites', label: 'FAVORITES', badge: favorites.length },
    { id: 'log', label: 'LOG', badge: conversionLog.length },
  ];

  return (
    <nav role="tablist" aria-label="Dashboard sections" className="border-b border-neutral-600 flex gap-2 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`
              h-10 px-4 flex items-center gap-2 font-mono text-base leading-5 tracking-wide
              border-b-2 transition-all duration-200
              focus:shadow-[0px_0px_0px_4px_rgba(206,247,57,1.00)]
              focus:outline-none focus:rounded-sm
              ${isActive 
                ? 'border-lime-500 text-neutral-50' 
                : 'border-transparent text-neutral-50 hover:border-neutral-500'
              }
            `}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="w-5 h-5 bg-lime-800 rounded-full flex items-center justify-center text-lime-500 text-[10px] font-mono leading-[10px]">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
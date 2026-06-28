import { useState, useRef, useEffect } from 'react';
import useFxStore from '../../store/useFxStore';

export default function Tabs() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeTab = useFxStore((state) => state.activeTab);
  const setActiveTab = useFxStore((state) => state.setActiveTab);
  const favorites = useFxStore((state) => state.favorites);
  const conversionLog = useFxStore((state) => state.conversionLog);

  const tabs = [
    { id: 'history', label: 'HISTORY' },
    { id: 'compare', label: 'COMPARE' },
    { id: 'favorites', label: 'FAVORITES', badge: favorites.length },
    { id: 'log', label: 'LOG', badge: conversionLog.length },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when tab changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [activeTab]);

  const currentTabLabel = tabs.find((t) => t.id === activeTab)?.label || 'HISTORY';

  return (
    <>
      {/* Mobile dropdown */}
      <div className="block sm:hidden w-full relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full px-3 py-2 bg-neutral-700 rounded-lg outline outline-1 outline-neutral-400 flex justify-between items-center"
        >
          <span className="text-neutral-50 text-base font-mono">{currentTabLabel}</span>
          <img
            src="/assets/images/icon-chevron-down.svg"
            alt=""
            className={`w-4 h-4 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-20 mt-1 w-full bg-neutral-700 rounded-lg shadow-lg outline outline-1 outline-neutral-400 overflow-hidden">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-2 text-left font-mono hover:bg-neutral-600 transition-colors flex items-center gap-2 ${
                    isActive ? 'text-lime-500' : 'text-neutral-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className="ml-auto w-5 h-5 bg-lime-800 rounded-full inline-flex items-center justify-center text-lime-500 text-[10px]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop tabs */}
      <nav
        role="tablist"
        aria-label="Dashboard sections"
        className="hidden sm:flex border-b border-neutral-600 gap-2 overflow-x-auto"
      >
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
    </>
  );
}
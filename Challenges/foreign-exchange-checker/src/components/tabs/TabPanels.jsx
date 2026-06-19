import useFxStore from '../../store/useFxStore';
import HistoryPanel from '../history/HistoryPanel';
import CompareList from '../compare/CompareList';
import FavoritesList from '../favorites/FavoritesList';
import LogList from '../log/LogList';

export default function TabPanels() {
  const activeTab = useFxStore(state => state.activeTab);

  return (
    <div>
      <section 
        role="tabpanel" 
        id="panel-history" 
        aria-labelledby="tab-history"
        hidden={activeTab !== 'history'}
        className={activeTab === 'history' ? '' : 'hidden'}
      >
        <HistoryPanel />
      </section>

      <section 
        role="tabpanel" 
        id="panel-compare" 
        aria-labelledby="tab-compare"
        hidden={activeTab !== 'compare'}
        className={activeTab === 'compare' ? '' : 'hidden'}
      >
        <CompareList />
      </section>

      <section 
        role="tabpanel" 
        id="panel-favorites" 
        aria-labelledby="tab-favorites"
        hidden={activeTab !== 'favorites'}
        className={activeTab === 'favorites' ? '' : 'hidden'}
      >
        <FavoritesList />
      </section>

      <section 
        role="tabpanel" 
        id="panel-log" 
        aria-labelledby="tab-log"
        hidden={activeTab !== 'log'}
        className={activeTab === 'log' ? '' : 'hidden'}
      >
        <LogList />
      </section>
    </div>
  );
}
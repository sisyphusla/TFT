import React, { useState } from 'react';
import ProPlayer from './porplayer'
import List from './list'
import './tabs.scss'

function TabsComponent() {
  const [activeTab, setActiveTab] = useState('A');

  return (
    <div className='tabsContainer'>
      <div className="tabs">
        <button
          className={activeTab === 'A' ? 'active' : ''}
          onClick={() => setActiveTab('A')}>
          <h1>
            台服S10分組衝分賽
          </h1>
        </button>
        <button
          className={activeTab === 'B' ? 'active' : ''}
          onClick={() => setActiveTab('B')}>
          <h1>
            台服TFT天梯前五十排名
          </h1>
        </button>
      </div>
      {activeTab === 'A' && <List />}
      {activeTab === 'B' && <ProPlayer />}
    </div>
  );
}

export default TabsComponent;
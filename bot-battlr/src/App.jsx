import React from "react";
import { useState,useEffect } from "react";

import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";
import SortBar from "./SortBar";
import BotSpecs from "./BotSpecs";

function App() {
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [bots, setBots] = useState([]);
  const [displayedBots, setDisplayedBots] = useState([]);
  const [view, setView] = useState('collection');
  const [selectedBot, setSelectedBot] = useState(null);
  
  const handleEnlistBot = (bot) => {
    if (!enlistedBots.some(b => b.id === bot.id)) {
      setEnlistedBots([...enlistedBots, bot]);
    }
  };

  const handleReleaseBot = (bot) => {
    setEnlistedBots(enlistedBots.filter(b => b.id !== bot.id));
  };

  const handleDischargeBot = async (botId) => {
    try {
      await fetch(`http://localhost:3000/bots/${botId}`, {
        method: 'DELETE',
      });
      setEnlistedBots(enlistedBots.filter(b => b.id !== botId));
    } catch (error) {
      console.error('Error discharging bot:', error);
    }
  };
  const handleSortChange = (criteria) => {
    if (!criteria) {
      setDisplayedBots([...bots]);
      return;
    }
    
    const sortedBots = [...displayedBots].sort((a, b) => b[criteria] - a[criteria]);
    setDisplayedBots(sortedBots);
  };

  const handleFilterChange = (selectedClasses) => {
    if (selectedClasses.length === 0) {
      setDisplayedBots([...bots]);
      return;
    }
    
    const filteredBots = bots.filter(bot => 
      selectedClasses.includes(bot.bot_class)
    );
    setDisplayedBots(filteredBots);
  };
  const handleBotSelect = (bot) => {
    setSelectedBot(bot);
    setView('details');
  };

  const handleEnlist = (bot) => {
    if (!enlistedBots.some(b => b.id === bot.id)) {
      setEnlistedBots([...enlistedBots, bot]);
    }
    setView('collection');
  };

  const handleBack = () => {
    setView('collection');
  };

  return (
    <div className="App">
      <YourBotArmy
        enlistedBots={enlistedBots}
        onReleaseBot={handleReleaseBot}
        onDischargeBot={handleDischargeBot}
      />
     
      {view === 'details' && selectedBot ? (
        <BotSpecs 
          bot={selectedBot} 
          onEnlist={handleEnlist} 
          onBack={handleBack} 
        />
      ) : (
        <BotCollection 
        onEnlistBot={handleEnlistBot}
        enlistedBots={enlistedBots}
        onDischargeBot={handleDischargeBot}
          onBotSelect={handleBotSelect}
         
        />
      )}

      <SortBar 
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default App
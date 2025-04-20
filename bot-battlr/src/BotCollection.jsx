import React, { useState, useEffect } from 'react';
import BotCard from './BotCard';

function BotCollection({ onEnlistBot, enlistedBots, onDischargeBot }) {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bots from server
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('http://localhost:3000/bots');
        if (!response.ok) {
          throw new Error('Failed to fetch bots');
        }
        const data = await response.json();
        setBots(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  // Handle bot discharge (delete from server and update state)
  const handleDischarge = async (botId) => {
    try {
      const response = await fetch(`http://localhost:3000/bots/${botId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to discharge bot');
      }
      
      setBots(bots.filter(bot => bot.id !== botId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading bots...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bot-collection">
      <h2>Available Bots</h2>
      <div className="bot-grid">
        {bots.map(bot => (
          <BotCard
            key={bot.id}
            bot={bot}
            onEnlist={() => onEnlistBot(bot)}
            isEnlisted={enlistedBots.some(b => b.id === bot.id)}
            onDischarge={() => handleDischarge(bot.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
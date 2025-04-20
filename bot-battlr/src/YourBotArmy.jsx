import React from 'react';
import BotCard from './BotCard';

function YourBotArmy({ enlistedBots, onReleaseBot, onDischargeBot }) {
  // Calculate total army stats
  const totalStats = enlistedBots.reduce(
    (acc, bot) => {
      acc.health += bot.health;
      acc.damage += bot.damage;
      acc.armor += bot.armor;
      return acc;
    },
    { health: 0, damage: 0, armor: 0 }
  );

  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      
      {enlistedBots.length === 0 ? (
        <div className="empty-army-message">
          <p>Your army is empty! Click on bots to enlist them.</p>
        </div>
      ) : (
        <>
          <div className="army-stats">
            <h3>Army Stats</h3>
            <div className="stat-row">
              <span>Total Health: {totalStats.health}</span>
              <span>Total Damage: {totalStats.damage}</span>
              <span>Total Armor: {totalStats.armor}</span>
            </div>
            <div className="stat-row">
              <span>Bots Count: {enlistedBots.length}</span>
            </div>
          </div>

          <div className="bot-grid">
            {enlistedBots.map(bot => (
              <BotCard
                key={bot.id}
                bot={bot}
                onEnlist={() => onReleaseBot(bot)}
                isEnlisted={true}
                onDischarge={() => onDischargeBot(bot.id)}
                showRelease={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default YourBotArmy;
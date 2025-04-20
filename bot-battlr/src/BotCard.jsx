import React from 'react';

function BotCard({ bot, onEnlist, isEnlisted, onDischarge, showRelease = false }) {
  return (
    <div className={`bot-card ${isEnlisted ? 'enlisted' : ''}`}>
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p>{bot.catchphrase}</p>
      <div className="bot-stats">
        <span>Health:{bot.health}</span>
        <span>Damage:{bot.damage}</span>
        <span>Amor:{bot.armor}</span>
        <span>Class: {bot.bot_class}</span>
      </div>
      <div className="bot-actions">
        {showRelease ? (
          <button onClick={onEnlist} className="release-btn">
            Release
          </button>
        ) : (
          <button onClick={onEnlist} disabled={isEnlisted}>
            {isEnlisted ? 'Enlisted' : 'Enlist'}
          </button>
        )}
        <button className="delete-btn" onClick={onDischarge}>
          x
        </button>
      </div>
    </div>
  );
}

export default BotCard;
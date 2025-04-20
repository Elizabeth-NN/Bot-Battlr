import React from 'react';
import { useNavigate } from 'react-router-dom';

function BotSpecs({ bot, onEnlist, onBack }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); // Fallback to browser history if no onBack prop
    }
  };

  return (
    <div className="bot-specs">
      <button onClick={handleGoBack} className="back-button">
        ← Back to List
      </button>
      
      <div className="bot-details">
        <div className="bot-image">
          <img src={bot.avatar_url} alt={bot.name} />
        </div>
        
        <div className="bot-info">
          <h2>{bot.name}</h2>
          <p className="catchphrase">"{bot.catchphrase}"</p>
          
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Class:</span>
              <span className="spec-value">{bot.bot_class}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Health:</span>
              <span className="spec-value">{bot.health}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Damage:</span>
              <span className="spec-value">{bot.damage}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Armor:</span>
              <span className="spec-value">{bot.armor}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Created:</span>
              <span className="spec-value">
                {new Date(bot.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={() => onEnlist(bot)} className="enlist-button">
          Enlist to Army
        </button>
      </div>
    </div>
  );
}

export default BotSpecs;
import React, { useState } from 'react';

function SortBar({ onSortChange, onFilterChange }) {
  const [sortCriteria, setSortCriteria] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);

  const botClasses = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);
    onSortChange(criteria);
  };

  const handleClassFilterChange = (botClass) => {
    let newSelectedClasses;
    if (selectedClasses.includes(botClass)) {
      newSelectedClasses = selectedClasses.filter(c => c !== botClass);
    } else {
      newSelectedClasses = [...selectedClasses, botClass];
    }
    setSelectedClasses(newSelectedClasses);
    onFilterChange(newSelectedClasses);
  };

  return (
    <div className="sort-bar">
      <div className="sort-section">
        <h3>Sort Bots By:</h3>
        <select 
          value={sortCriteria} 
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="">-- Select --</option>
          <option value="health">Health</option>
          <option value="damage">Damage</option>
          <option value="armor">Armor</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>Filter By Class:</h3>
        <div className="class-filters">
          {botClasses.map(botClass => (
            <label key={botClass} className="filter-label">
              <input
                type="checkbox"
                checked={selectedClasses.includes(botClass)}
                onChange={() => handleClassFilterChange(botClass)}
              />
              {botClass}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SortBar;
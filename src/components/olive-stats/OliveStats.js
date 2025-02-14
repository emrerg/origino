import React, { useState } from 'react';
import './OliveStats.css';

const OliveStats = () => {
  const [isAcidityOpen, setAcidityOpen] = useState(false);
  const [isPolyphenolsOpen, setPolyphenolsOpen] = useState(false);

  const toggleAcidity = () => setAcidityOpen(!isAcidityOpen);
  const togglePolyphenols = () => setPolyphenolsOpen(!isPolyphenolsOpen);

  return (
    <div className="olive-stats">
      <div className="accordion">
        <div className="accordion-header" onClick={toggleAcidity}>
          Free Acidity
        </div>
        {isAcidityOpen && (
          <div className="accordion-content">
            <p>The less the better...</p>
            <ul>
              <li>0% - Premium Quality</li>
              <li>0.35% - Most boutique olive oils</li>
              <li>0.4% - Required for "Extra Virgin" label</li>
              <li>0.8% - Most supermarket olive oils</li>
            </ul>
          </div>
        )}
      </div>
      <div className="accordion">
        <div className="accordion-header" onClick={togglePolyphenols}>
          Polyphenols
        </div>
        {isPolyphenolsOpen && (
          <div className="accordion-content">
            <p>The more the better...</p>
            <ul>
              <li>280mg/kg - Required value to claim health benefits</li>
              <li>250mg/kg - Most boutique olive oils</li>
              <li>0mg/lt - Most supermarket olive oils</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OliveStats;

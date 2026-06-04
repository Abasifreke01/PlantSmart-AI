import { useState } from 'react';

const PredictionResult = ({ results, isPredicting }) => {
  const [selectedCrop, setSelectedCrop] = useState(null);

  if (isPredicting) {
    return (
      <div className="empty-state">
        <div className="empty-icon" style={{ animation: 'bounce 1s infinite' }}>🤖</div>
        <h3>Running AI Models...</h3>
        <p>Analyzing environmental patterns to find the perfect matches for your location.</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🌱</div>
        <h3>Awaiting Data</h3>
        <p>Enter your data on the left to discover your top 20 optimal crops.</p>
      </div>
    );
  }

  const handleCardClick = (cropItem) => {
    setSelectedCrop(cropItem);
  };

  const closeModal = () => {
    setSelectedCrop(null);
  };

  return (
    <div className="results-container">
      <h2 className="results-title">Top 20 Recommended Crops</h2>
      <p style={{textAlign: 'center', marginBottom: '2rem', color: 'var(--text-light)'}}>Click on a crop to view best practices.</p>
      
      <div className="results-grid">
        {results.map((item, index) => (
          <div className="crop-card clickable" key={index} onClick={() => handleCardClick(item)}>
            <div className="crop-rank">#{index + 1}</div>
            <div className="crop-icon">{item.icon}</div>
            <h3 className="crop-name">{item.crop}</h3>
            <div className="crop-score">
              <div className="score-bar" style={{ width: `${item.score}%`, backgroundColor: item.score > 80 ? '#2ecc71' : item.score > 60 ? '#f1c40f' : '#e74c3c' }}></div>
              <span>{item.score}% Match</span>
            </div>
            <p className="crop-desc">{item.description}</p>
          </div>
        ))}
      </div>

      {selectedCrop && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <div className="modal-header">
              <span className="modal-icon">{selectedCrop.icon}</span>
              <h2>{selectedCrop.crop} Best Practices</h2>
            </div>
            <div className="practices-list">
              <ul>
                {selectedCrop.bestPractices.map((practice, i) => (
                  <li key={i}><strong>Tip {i+1}:</strong> {practice}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionResult;

import { useState } from 'react';

const AnalyticsDashboard = ({ history, onReload, onClear, onDeleteItem }) => {
  const [confirmClear, setConfirmClear] = useState(false);

  // Fallback if history is empty
  if (!history || history.length === 0) {
    return (
      <div className="empty-state glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <div className="empty-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
        <h3>No Data Available</h3>
        <p>Run some crop predictions in the Predictor tab to generate analytics data.</p>
      </div>
    );
  }

  // Calculate statistics
  const totalPredictions = history.length;

  // Most recommended crop calculation
  const cropCounts = {};
  let totalScoreSum = 0;
  let avgN = 0, avgP = 0, avgK = 0, avgTemp = 0, avgHum = 0, avgPh = 0, avgRain = 0;

  history.forEach(item => {
    // Crop counts
    const cropName = item.topCrop.crop;
    cropCounts[cropName] = (cropCounts[cropName] || 0) + 1;

    // Score sum
    totalScoreSum += item.topCrop.score;

    // Averages
    avgN += item.inputs.n || 0;
    avgP += item.inputs.p || 0;
    avgK += item.inputs.k || 0;
    avgTemp += item.inputs.temperature || 0;
    avgHum += item.inputs.humidity || 0;
    avgPh += parseFloat(item.inputs.ph) || 0;
    avgRain += item.inputs.rainfall || 0;
  });

  const averageScore = Math.round(totalScoreSum / totalPredictions);
  avgN = Math.round(avgN / totalPredictions);
  avgP = Math.round(avgP / totalPredictions);
  avgK = Math.round(avgK / totalPredictions);
  avgTemp = Math.round((avgTemp / totalPredictions) * 10) / 10;
  avgHum = Math.round(avgHum / totalPredictions);
  avgPh = Math.round((avgPh / totalPredictions) * 10) / 10;
  avgRain = Math.round(avgRain / totalPredictions);

  // Find most frequent crop
  let topCropName = 'None';
  let topCropIcon = '🌱';
  let maxCount = 0;
  Object.keys(cropCounts).forEach(name => {
    if (cropCounts[name] > maxCount) {
      maxCount = cropCounts[name];
      topCropName = name;
      // Find the icon in history items
      const found = history.find(item => item.topCrop.crop === name);
      if (found) topCropIcon = found.topCrop.icon;
    }
  });

  // Sort crops by frequency for ranking list
  const rankedCrops = Object.keys(cropCounts).map(name => {
    const found = history.find(item => item.topCrop.crop === name);
    return {
      name,
      icon: found ? found.topCrop.icon : '🌱',
      count: cropCounts[name],
      percentage: Math.round((cropCounts[name] / totalPredictions) * 100)
    };
  }).sort((a, b) => b.count - a.count);

  // Format date helper
  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' + 
             date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div className="analytics-container fade-in-animation">
      {/* KPI Cards Grid */}
      <div className="analytics-kpi-grid">
        <div className="kpi-card glass-panel">
          <div className="kpi-icon">📈</div>
          <div className="kpi-content">
            <span className="kpi-label">Total Predictions</span>
            <span className="kpi-value">{totalPredictions}</span>
          </div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon">{topCropIcon}</div>
          <div className="kpi-content">
            <span className="kpi-label">Top Recommended Crop</span>
            <span className="kpi-value">{topCropName} <small style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-light)' }}>({maxCount}x)</small></span>
          </div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon">🎯</div>
          <div className="kpi-content">
            <span className="kpi-label">Avg Suitability Match</span>
            <span className="kpi-value">{averageScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Charts & Visualizations Grid */}
      <div className="analytics-details-grid">
        {/* Environmental averages */}
        <div className="details-panel glass-panel">
          <h3>📊 Average Soil & Climate Profile</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
            Mean environmental metrics recorded across all query coordinates and manual submissions.
          </p>

          <div className="chart-bar-group">
            <div className="chart-bar-label">
              <span>Nitrogen (N)</span>
              <span>{avgN} / 140 mg/kg</span>
            </div>
            <div className="bar-bg"><div className="bar-fill n-bar" style={{ width: `${(avgN / 140) * 100}%` }}></div></div>
          </div>

          <div className="chart-bar-group">
            <div className="chart-bar-label">
              <span>Phosphorus (P)</span>
              <span>{avgP} / 145 mg/kg</span>
            </div>
            <div className="bar-bg"><div className="bar-fill p-bar" style={{ width: `${(avgP / 145) * 100}%` }}></div></div>
          </div>

          <div className="chart-bar-group">
            <div className="chart-bar-label">
              <span>Potassium (K)</span>
              <span>{avgK} / 205 mg/kg</span>
            </div>
            <div className="bar-bg"><div className="bar-fill k-bar" style={{ width: `${(avgK / 205) * 100}%` }}></div></div>
          </div>

          <div className="chart-bar-group" style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
            <div className="chart-bar-label">
              <span>Temperature</span>
              <span>{avgTemp}°C / 50°C</span>
            </div>
            <div className="bar-bg"><div className="bar-fill temp-bar" style={{ width: `${(avgTemp / 50) * 100}%` }}></div></div>
          </div>

          <div className="chart-bar-group">
            <div className="chart-bar-label">
              <span>Humidity</span>
              <span>{avgHum}% / 100%</span>
            </div>
            <div className="bar-bg"><div className="bar-fill hum-bar" style={{ width: `${avgHum}%` }}></div></div>
          </div>

          <div className="chart-bar-group">
            <div className="chart-bar-label">
              <span>pH Level</span>
              <span>{avgPh} / 14</span>
            </div>
            <div className="bar-bg"><div className="bar-fill ph-bar" style={{ width: `${(avgPh / 14) * 100}%` }}></div></div>
          </div>

          <div className="chart-bar-group">
            <div className="chart-bar-label">
              <span>Rainfall</span>
              <span>{avgRain}mm / 300mm</span>
            </div>
            <div className="bar-bg"><div className="bar-fill rain-bar" style={{ width: `${(avgRain / 300) * 100}%` }}></div></div>
          </div>
        </div>

        {/* Recommended Crops breakdown list */}
        <div className="details-panel glass-panel">
          <h3>🌾 Crop Recommendation Share</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
            Percentage of predictions in which each crop emerged as the top recommendation.
          </p>

          <div className="crop-share-list" style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {rankedCrops.map((crop, idx) => (
              <div className="crop-share-item" key={idx} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{crop.icon}</span> {crop.name}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
                    {crop.percentage}% ({crop.count}x)
                  </span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${crop.percentage}%`, background: 'var(--primary)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical logs table */}
      <div className="details-panel glass-panel" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: 0 }}>📋 Historical Prediction Log</h3>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-light)' }}>
              Detailed audit trail of past soil configurations, weather queries, and primary outputs.
            </p>
          </div>

          {!confirmClear ? (
            <button 
              type="button" 
              className="btn-danger" 
              onClick={() => setConfirmClear(true)}
              style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem', margin: 0 }}
            >
              🗑️ Clear All History
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                type="button" 
                className="btn-danger" 
                onClick={() => {
                  onClear();
                  setConfirmClear(false);
                }}
                style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem', margin: 0 }}
              >
                Confirm Delete
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setConfirmClear(false)}
                style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem', margin: 0 }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="table-scroll-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Location</th>
                <th>NPK (mg/kg)</th>
                <th>Climate (Temp/Hum/Rain)</th>
                <th>Soil pH</th>
                <th>Top Recommendation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td>{formatDate(item.timestamp)}</td>
                  <td>
                    <span className="location-badge">{item.location || 'Manual Input'}</span>
                  </td>
                  <td>
                    <span className="npk-badge n-badge">N: {item.inputs.n}</span>
                    <span className="npk-badge p-badge">P: {item.inputs.p}</span>
                    <span className="npk-badge k-badge">K: {item.inputs.k}</span>
                  </td>
                  <td>
                    {item.inputs.temperature}°C / {item.inputs.humidity}% / {item.inputs.rainfall}mm
                  </td>
                  <td>{item.inputs.ph}</td>
                  <td>
                    <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>{item.topCrop.icon}</span> {item.topCrop.crop} 
                      <small style={{ fontWeight: 'normal', color: 'var(--text-light)' }}>({item.topCrop.score}%)</small>
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button 
                        type="button" 
                        className="btn-action-table btn-reload"
                        title="Reload configuration into predictor form"
                        onClick={() => onReload(item.inputs, item.location)}
                      >
                        🔄 Reload
                      </button>
                      <button 
                        type="button" 
                        className="btn-action-table btn-delete-row"
                        title="Delete this record"
                        onClick={() => onDeleteItem(item.id || idx)}
                        style={{ background: '#fadbd8', color: '#c0392b' }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

import { useState, useEffect } from 'react';
import EnvironmentalForm from './components/EnvironmentalForm';
import PredictionResult from './components/PredictionResult';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { predictTop20Crops } from './utils/aiLogic';
import logo from './assets/logo.jpg';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('predictor');
  const [results, setResults] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [reloadInputs, setReloadInputs] = useState(null);

  // Initialize history state from localStorage (starts empty by default)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('plantsmart_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed;
      } catch (e) {
        console.error("Failed to parse history from localStorage", e);
        return [];
      }
    }
    return [];
  });

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem('plantsmart_history', JSON.stringify(history));
  }, [history]);

  const handlePredict = (data) => {
    setIsPredicting(true);
    // Simulate slight delay for "AI" thinking effect
    setTimeout(() => {
      const topCrops = predictTop20Crops(data);
      setResults(topCrops);
      setIsPredicting(false);

      // Save to prediction history
      const topCrop = topCrops[0] 
        ? { crop: topCrops[0].crop, icon: topCrops[0].icon, score: topCrops[0].score }
        : { crop: 'Unknown', icon: '🌱', score: 0 };

      const newRecord = {
        id: 'rec-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        timestamp: new Date().toISOString(),
        location: data.location || 'Manual Entry',
        inputs: {
          n: data.n,
          p: data.p,
          k: data.k,
          temperature: data.temperature,
          humidity: data.humidity,
          ph: data.ph,
          rainfall: data.rainfall
        },
        topCrop
      };

      setHistory(prev => [newRecord, ...prev]);
    }, 1200); 
  };

  // Reload history item back into input form and run prediction
  const handleReload = (inputs, location) => {
    setReloadInputs({ ...inputs, location });
    setActiveTab('predictor');
    
    // Automatically trigger prediction for loaded data
    setIsPredicting(true);
    setTimeout(() => {
      const topCrops = predictTop20Crops(inputs);
      setResults(topCrops);
      setIsPredicting(false);
    }, 800);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="PlantSmart AI Logo" className="app-logo" />
        </div>
        <h1>PlantSmart AI</h1>
        <p>Discover the optimal crop for your land based on environmental data.</p>
      </header>

      {/* Segmented Tab Navigation */}
      <div className="tab-navigation glass-panel">
        <button 
          type="button"
          className={`tab-btn ${activeTab === 'predictor' ? 'active' : ''}`}
          onClick={() => setActiveTab('predictor')}
        >
          🔮 Crop Predictor
        </button>
        <button 
          type="button"
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Insights & Analytics
        </button>
      </div>

      {activeTab === 'predictor' ? (
        <main className="main-content">
          <section className="glass-panel form-panel">
            <h2>Environmental Data</h2>
            <EnvironmentalForm 
              key={reloadInputs ? `reload-${reloadInputs.n}-${reloadInputs.p}-${reloadInputs.k}-${reloadInputs.location}` : 'default'}
              onPredict={handlePredict} 
              isPredicting={isPredicting} 
              reloadInputs={reloadInputs}
            />
          </section>

          <section className="glass-panel results-panel">
            <PredictionResult results={results} isPredicting={isPredicting} />
          </section>
        </main>
      ) : (
        <AnalyticsDashboard 
          history={history} 
          onReload={handleReload} 
          onClear={handleClearHistory}
          onDeleteItem={handleDeleteItem}
        />
      )}

      <footer className="footer glass-panel">
        <h2>Contact Us</h2>
        <p>Have questions or need custom agricultural AI solutions?</p>
        <a href="mailto:ecoalliancegreensolutions@gmail.com" className="contact-email">
          ✉️ ecoalliancegreensolutions@gmail.com
        </a>
      </footer>
    </div>
  );
}

export default App;

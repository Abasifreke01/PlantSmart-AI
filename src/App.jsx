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

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('plantsmart_history');

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse history:', error);
      }
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      'plantsmart_history',
      JSON.stringify(history)
    );
  }, [history]);

  const handlePredict = (data) => {
    setIsPredicting(true);

    setTimeout(() => {
      const topCrops = predictTop20Crops(data);

      setResults({
        location: data.location,
        recommendations: topCrops,
        summary: topCrops.length
          ? `Based on environmental conditions in ${
              data.location || 'your selected area'
            }, the most suitable crop is ${
              topCrops[0].crop
            }.`
          : null
      });

      setIsPredicting(false);

      const topCrop = topCrops[0]
        ? {
            crop: topCrops[0].crop,
            icon: topCrops[0].icon,
            score: topCrops[0].score
          }
        : {
            crop: 'Unknown',
            icon: '🌱',
            score: 0
          };

      const newRecord = {
        id:
          'rec-' +
          Date.now() +
          '-' +
          Math.random().toString(36).substring(2, 7),

        timestamp: new Date().toISOString(),

        location: data.location || 'Unknown Location',

        climateProfile: {
          temperature: data.temperature,
          humidity: data.humidity,
          rainfall: data.rainfall
        },

        soilProfile: {
          n: data.n,
          p: data.p,
          k: data.k,
          ph: data.ph
        },

        topCrop,
        recommendations: topCrops
      };

      setHistory((prev) => [newRecord, ...prev]);
    }, 1200);
  };

  const handleReload = (
    inputs,
    location
  ) => {
    setReloadInputs({
      ...inputs,
      location
    });

    setActiveTab('predictor');

    setIsPredicting(true);

    setTimeout(() => {
      const topCrops =
        predictTop20Crops(inputs);

      setResults({
        location,
        recommendations: topCrops,
        summary: topCrops.length
          ? `Based on environmental conditions in ${location}, the most suitable crop is ${topCrops[0].crop}.`
          : null
      });

      setIsPredicting(false);
    }, 800);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteItem = (id) => {
    setHistory((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <img
            src={logo}
            alt="PlantSmart AI Logo"
            className="app-logo"
          />
        </div>

        <h1>PlantSmart AI</h1>

        <p>
          Find the best crops to cultivate
          in your location using AI-powered
          environmental and climate
          analysis.
        </p>
      </header>

      <div className="tab-navigation glass-panel">
        <button
          type="button"
          className={`tab-btn ${
            activeTab === 'predictor'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setActiveTab('predictor')
          }
        >
          🌾 Best Crops for My Area
        </button>

        <button
          type="button"
          className={`tab-btn ${
            activeTab === 'analytics'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setActiveTab('analytics')
          }
        >
          🗺️ Location Insights
        </button>
      </div>

      {activeTab === 'predictor' ? (
        <main className="main-content">
          <section className="glass-panel form-panel">
            <h2>
              Location & Farm Conditions
            </h2>

            <EnvironmentalForm
              key={
                reloadInputs
                  ? `reload-${reloadInputs.n}-${reloadInputs.p}-${reloadInputs.k}-${reloadInputs.location}`
                  : 'default'
              }
              onPredict={handlePredict}
              isPredicting={isPredicting}
              reloadInputs={reloadInputs}
            />
          </section>

          <section className="glass-panel results-panel">
            <PredictionResult
              results={results}
              isPredicting={
                isPredicting
              }
            />
          </section>
        </main>
      ) : (
        <AnalyticsDashboard
          history={history}
          onReload={handleReload}
          onClear={
            handleClearHistory
          }
          onDeleteItem={
            handleDeleteItem
          }
        />
      )}

      <footer className="footer glass-panel">
        <h2>Contact Us</h2>

        <p>
          Helping farmers identify
          climate-suitable and
          profitable crops using
          AI-powered location analysis.
        </p>

        <a
          href="mailto:ecoalliancegreensolutions@gmail.com"
          className="contact-email"
        >
          ✉️
          ecoalliancegreensolutions@gmail.com
        </a>
      </footer>
    </div>
  );
}

export default App;

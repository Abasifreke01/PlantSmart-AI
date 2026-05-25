import React, { useState } from 'react';
import EnvironmentalForm from './components/EnvironmentalForm';
import PredictionResult from './components/PredictionResult';
import { predictTop10Crops } from './utils/aiLogic';
import './index.css';

function App() {
  const [results, setResults] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  const handlePredict = (data) => {
    setIsPredicting(true);
    // Simulate slight delay for "AI" thinking effect
    setTimeout(() => {
      const topCrops = predictTop10Crops(data);
      setResults(topCrops);
      setIsPredicting(false);
    }, 1200); 
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>PlantSmart AI</h1>
        <p>Discover the optimal crop for your land based on environmental data.</p>
      </header>

      <main className="main-content">
        <section className="glass-panel form-panel">
          <h2>Environmental Data</h2>
          <EnvironmentalForm onPredict={handlePredict} isPredicting={isPredicting} />
        </section>

        <section className="glass-panel results-panel">
          <PredictionResult results={results} isPredicting={isPredicting} />
        </section>
      </main>

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

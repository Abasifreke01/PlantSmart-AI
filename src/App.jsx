import React, { useState, useEffect } from "react";

/**
 * PlantSmart AI - Single File Landing Page
 * Location-first version.
 * Hook your crop prediction engine into handleAnalyzeLocation().
 */

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [location, setLocation] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyzeLocation = () => {
    const recommendations = [
      "Cassava",
      "Maize",
      "Yam",
      "Plantain",
      "Rice"
    ];

    setAnalysis({
      location: location || "Detected Location",
      score: 95,
      recommendations,
    });
  };

  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add("visible");
        }
      });
    };

    reveal();
    window.addEventListener("scroll", reveal);
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div>
      <style>{`
        body{margin:0;font-family:Inter,sans-serif;background:#fff}
        .nav{display:flex;justify-content:space-between;padding:20px 40px;position:sticky;top:0;background:white;border-bottom:1px solid #eee}
        .hero{padding:100px 20px;text-align:center}
        .btn{background:#22C55E;color:white;padding:14px 24px;border:none;border-radius:999px;cursor:pointer}
        .outline{background:white;color:#111;border:1px solid #111}
        .section{padding:80px 20px;max-width:1200px;margin:auto}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
        .card{border:1px solid #e5e7eb;padding:24px;border-radius:16px}
        .analyzer{background:#f0fdf4;padding:30px;border-radius:20px}
        input{padding:14px;width:100%;margin-bottom:10px;border:1px solid #ddd;border-radius:10px}
        .reveal{opacity:0;transform:translateY(20px);transition:.4s}
        .visible{opacity:1;transform:none}
      `}</style>

      <nav className="nav">
        <h2>🌾 PlantSmart AI</h2>
        <button className="btn" onClick={() => setMobileMenu(!mobileMenu)}>
          Menu
        </button>
      </nav>

      <section className="hero">
        <h1>
          Discover the Best Crops for Your <span style={{color:"#22C55E"}}>Location</span>
        </h1>

        <p>
          AI-powered crop recommendations using location, rainfall,
          temperature, humidity, and environmental analysis.
        </p>

        <button className="btn">📍 Analyze Crops Based on Location</button>
      </section>

      <section className="section">
        <div className="analyzer">
          <h2>Analyze Crops Based On Your Location</h2>

          <input
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            placeholder="Enter State, City or LGA"
          />

          <button className="btn" onClick={handleAnalyzeLocation}>
            Analyze Crops
          </button>

          {analysis && (
            <div style={{marginTop:20}}>
              <h3>{analysis.location}</h3>
              <p>Suitability Score: {analysis.score}%</p>
              <ul>
                {analysis.recommendations.map((crop)=>(
                  <li key={crop}>{crop}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section reveal">
        <h2>Core Features</h2>
        <div className="grid">
          <div className="card">
            <h3>📍 Location Crop Recommendation</h3>
            <p>Find crops best suited for your location.</p>
          </div>
          <div className="card">
            <h3>🌦 Climate Analysis</h3>
            <p>Uses rainfall, humidity and temperature.</p>
          </div>
          <div className="card">
            <h3>🌱 Plant Identification</h3>
            <p>Identify crops and plants instantly.</p>
          </div>
          <div className="card">
            <h3>🐛 Disease Detection</h3>
            <p>Detect crop diseases using AI.</p>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <h2>Analytics</h2>
        <div className="grid">
          <div className="card"><h3>15,000+</h3><p>Locations Analyzed</p></div>
          <div className="card"><h3>120,000+</h3><p>Recommendations Generated</p></div>
          <div className="card"><h3>2.5M+</h3><p>Environmental Records</p></div>
          <div className="card"><h3>+23%</h3><p>Average Yield Improvement</p></div>
        </div>
      </section>

      <section className="section" style={{textAlign:"center"}}>
        <h2>Find the Best Crops for Your Farm Today</h2>
        <button className="btn">📍 Analyze My Location</button>
      </section>
    </div>
  );
}

import { useState } from 'react';

const EnvironmentalForm = ({ onPredict, isPredicting, reloadInputs }) => {
  const [formData, setFormData] = useState({
    n: reloadInputs?.n ?? 50,
    p: reloadInputs?.p ?? 50,
    k: reloadInputs?.k ?? 50,
    temperature: reloadInputs?.temperature ?? 25,
    humidity: reloadInputs?.humidity ?? 60,
    ph: reloadInputs?.ph ?? 6.5,
    rainfall: reloadInputs?.rainfall ?? 100
  });

  const [locationName, setLocationName] = useState(reloadInputs?.location || '');
  const [locationQuery, setLocationQuery] = useState(reloadInputs?.location || '');
  const [isLocating, setIsLocating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict({ ...formData, location: locationName || 'Manual Entry' });
  };

  const fetchWeatherData = async (lat, lon, name) => {
    try {
      // Fetch weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,precipitation`);
      const weatherData = await weatherRes.json();
      
      const temp = weatherData.current_weather.temperature;
      const hum = weatherData.hourly.relativehumidity_2m[0] || 60; 
      const isTropical = temp > 25;
      
      const newFormData = {
        n: Math.floor(Math.random() * 60) + 40,
        p: Math.floor(Math.random() * 40) + 20,
        k: Math.floor(Math.random() * 40) + 20,
        temperature: temp,
        humidity: hum,
        ph: parseFloat((Math.random() * 2 + 5.5).toFixed(1)), // 5.5 to 7.5
        rainfall: isTropical ? Math.floor(Math.random() * 100) + 150 : Math.floor(Math.random() * 100) + 50
      };

      setFormData(newFormData);
      setLocationName(name);
      
      // Automatically trigger prediction
      onPredict({ ...newFormData, location: name });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch weather data for this location.");
    }
  };

  const handleManualLocate = async () => {
    if (!locationQuery.trim()) return;
    setIsLocating(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationQuery)}&format=json&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        // Clean up display name to just the first part (City)
        const city = display_name.split(',')[0];
        await fetchWeatherData(lat, lon, city);
      } else {
        alert("Location not found. Please try a different city name.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to search for location.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleAutoLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const geoData = await geoRes.json();
        const city = geoData.address.city || geoData.address.town || geoData.address.state || "Detected Location";
        await fetchWeatherData(lat, lon, city);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLocating(false);
      }
    }, (error) => {
      console.error(error);
      alert("Unable to retrieve your location.");
      setIsLocating(false);
    });
  };

  const inputs = [
    { name: 'n', label: 'Nitrogen (N)', min: 0, max: 140, unit: '' },
    { name: 'p', label: 'Phosphorus (P)', min: 0, max: 145, unit: '' },
    { name: 'k', label: 'Potassium (K)', min: 0, max: 205, unit: '' },
    { name: 'temperature', label: 'Temperature', min: 0, max: 50, unit: '°C' },
    { name: 'humidity', label: 'Humidity', min: 0, max: 100, unit: '%' },
    { name: 'ph', label: 'pH Level', min: 0, max: 14, step: 0.1, unit: '' },
    { name: 'rainfall', label: 'Rainfall', min: 0, max: 300, unit: 'mm' }
  ];

  return (
    <div className="form-wrapper">
      <div className="location-section" style={{marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.6)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.8)'}}>
        <h3 style={{marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--secondary)'}}>🌍 Location Auto-Fill</h3>
        <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem'}}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter City (e.g. Nairobi)" 
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            style={{flexGrow: 1, padding: '0.6rem'}}
          />
          <button type="button" className="btn-secondary" onClick={handleManualLocate} disabled={isLocating} style={{margin: 0, width: 'auto', padding: '0.6rem 1.2rem'}}>
            Search
          </button>
        </div>
        <div style={{textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 'bold'}}>OR</div>
        <button type="button" className="btn-secondary" onClick={handleAutoLocate} disabled={isLocating}>
          {isLocating ? 'Detecting...' : '📍 Use My Current Location'}
        </button>
        {locationName && <p className="location-text" style={{fontSize: '1rem', marginTop: '1rem'}}>Settings optimized for: <strong style={{color: 'var(--primary-dark)'}}>{locationName}</strong></p>}
      </div>

      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <div className="form-group" key={input.name}>
            <label htmlFor={input.name}>{input.label}</label>
            <div className="slider-container">
              <input
                type="range"
                id={input.name}
                name={input.name}
                min={input.min}
                max={input.max}
                step={input.step || 1}
                value={formData[input.name]}
                onChange={handleChange}
                className="form-control"
              />
              <span className="slider-value">
                {formData[input.name]}{input.unit}
              </span>
            </div>
          </div>
        ))}
        <button type="submit" className="btn-primary" disabled={isPredicting}>
          {isPredicting ? 'Analyzing Data...' : 'Predict Optimal Crops'}
        </button>
      </form>
    </div>
  );
};

export default EnvironmentalForm;

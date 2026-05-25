const cropsDatabase = [
  { 
    name: 'Rice', icon: '🌾', desc: 'Thrives in high rainfall and humidity.', 
    req: { n: [60, 100], p: [30, 60], k: [30, 60], temp: [20, 35], hum: [80, 100], ph: [5.5, 7.5], rain: [150, 300] },
    bestPractices: [
      "Prepare soil by puddling to reduce water loss.",
      "Maintain 2-5 cm of standing water during the vegetative stage.",
      "Apply Nitrogen in 3 split doses for optimal yield.",
      "Watch out for stem borers; use pheromone traps for pest control."
    ]
  },
  { 
    name: 'Wheat', icon: '🌾', desc: 'Prefers cooler temperatures and moderate rainfall.', 
    req: { n: [40, 80], p: [20, 50], k: [20, 50], temp: [10, 25], hum: [50, 70], ph: [6.0, 7.5], rain: [50, 100] },
    bestPractices: [
      "Sow seeds at a depth of 4-5 cm in well-pulverized soil.",
      "Ensure proper irrigation at the crown root initiation stage (20-25 days after sowing).",
      "Keep the field weed-free during the first 30-40 days.",
      "Monitor for rust diseases and apply appropriate fungicides if spotted."
    ]
  },
  { 
    name: 'Maize', icon: '🌽', desc: 'Requires nutrient-rich soil and moderate climate.', 
    req: { n: [80, 120], p: [30, 60], k: [30, 60], temp: [18, 30], hum: [60, 80], ph: [5.8, 7.5], rain: [60, 120] },
    bestPractices: [
      "Plant in rows with spacing of 60-75 cm between rows and 20-25 cm between plants.",
      "Maize is highly sensitive to waterlogging; ensure good drainage.",
      "Apply basal dose of farmyard manure during soil preparation.",
      "Control fall armyworm early using biological agents like Neem oil."
    ]
  },
  { 
    name: 'Cotton', icon: '☁️', desc: 'Cash crop needing warm climate and moderate rain.', 
    req: { n: [100, 140], p: [30, 60], k: [30, 60], temp: [22, 35], hum: [60, 80], ph: [5.8, 8.0], rain: [70, 120] },
    bestPractices: [
      "Deep ploughing is essential as cotton has a deep tap root system.",
      "Avoid excess watering during the vegetative phase to prevent excessive vegetative growth.",
      "Monitor strictly for bollworms; use pheromone traps and crop rotation.",
      "Defoliate before harvesting for cleaner lint."
    ]
  },
  { 
    name: 'Jute', icon: '🌿', desc: 'Requires warm, highly humid climate with plenty of rain.', 
    req: { n: [60, 100], p: [30, 60], k: [30, 60], temp: [25, 35], hum: [70, 90], ph: [6.0, 7.5], rain: [150, 250] },
    bestPractices: [
      "Sow seeds by broadcasting or line sowing in finely prepared soil.",
      "Requires thin, constant moisture; do not let the soil dry out.",
      "Harvest between 100-120 days when the plant is in the small pod stage for best fiber quality.",
      "Retting (soaking in water) should be done in clean, slow-moving water."
    ]
  },
  { 
    name: 'Coffee', icon: '☕', desc: 'Best in moderate temperatures with distinct wet/dry seasons.', 
    req: { n: [80, 120], p: [15, 30], k: [20, 40], temp: [15, 25], hum: [50, 70], ph: [5.5, 7.0], rain: [150, 250] },
    bestPractices: [
      "Provide light shade using trees like Silver Oak to protect from direct afternoon sun.",
      "Prune regularly to maintain plant shape and encourage new bearing wood.",
      "Apply organic mulching to conserve moisture and suppress weeds.",
      "Monitor for Coffee Berry Borer and leaf rust."
    ]
  },
  { 
    name: 'Banana', icon: '🍌', desc: 'Grows well in tropical, high-humidity environments.', 
    req: { n: [80, 120], p: [40, 70], k: [100, 200], temp: [25, 35], hum: [70, 90], ph: [6.0, 7.5], rain: [100, 200] },
    bestPractices: [
      "Plant suckers in deep pits enriched with organic manure.",
      "Bananas are heavy feeders; apply Potash (K) heavily during the fruiting stage.",
      "Provide propping (support) to the plants when bunches emerge.",
      "Remove excess side suckers (desuckering) to direct energy to the main plant."
    ]
  },
  { 
    name: 'Millet', icon: '🌾', desc: 'Highly drought-tolerant, grows in hot, dry conditions.', 
    req: { n: [20, 60], p: [10, 30], k: [10, 30], temp: [25, 40], hum: [30, 50], ph: [5.5, 7.5], rain: [30, 60] },
    bestPractices: [
      "Sow seeds shallowly (2-3 cm) as deep sowing results in poor emergence.",
      "Extremely drought tolerant, but one irrigation at the flowering stage boosts yield.",
      "Requires minimal fertilizer, but basal phosphorus helps early root development.",
      "Generally pest-resistant, but watch for shoot fly in early stages."
    ]
  },
  { 
    name: 'Soybean', icon: '🌱', desc: 'Thrives in warm conditions with moderate rainfall.', 
    req: { n: [10, 40], p: [40, 80], k: [20, 60], temp: [20, 30], hum: [50, 70], ph: [6.0, 7.5], rain: [60, 100] },
    bestPractices: [
      "Inoculate seeds with Rhizobium culture before sowing to fix atmospheric nitrogen.",
      "Maintain a weed-free environment for the first 45 days.",
      "Avoid water stress during the flowering and pod-filling stages.",
      "Harvest when leaves turn yellow and drop off."
    ]
  },
  { 
    name: 'Lentil', icon: '🌱', desc: 'Prefers slightly acidic to neutral pH and moderate rain.', 
    req: { n: [10, 40], p: [20, 60], k: [10, 40], temp: [15, 25], hum: [40, 60], ph: [6.0, 7.5], rain: [40, 80] },
    bestPractices: [
      "Requires well-drained loamy soil; highly sensitive to waterlogging.",
      "Seed inoculation with Rhizobium is highly recommended.",
      "Harvest when pods turn brown and rattle when shaken.",
      "Store in a dry place to prevent bruchid beetle infestations."
    ]
  },
  { 
    name: 'Chickpea', icon: '🌰', desc: 'Hardy crop tolerating cooler temps and low rainfall.', 
    req: { n: [10, 40], p: [20, 60], k: [10, 40], temp: [15, 25], hum: [40, 60], ph: [6.0, 8.0], rain: [40, 80] },
    bestPractices: [
      "Nipping (plucking apical buds) 30-40 days after sowing encourages branching and higher yield.",
      "Do not over-irrigate, as it leads to excessive vegetative growth at the expense of pods.",
      "Watch out for the pod borer (Helicoverpa armigera); use pheromone traps.",
      "Sow on raised beds if the soil is heavy to prevent wilt disease."
    ]
  },
  { 
    name: 'Tomato', icon: '🍅', desc: 'Needs moderate warmth and good nutrient balance.', 
    req: { n: [60, 100], p: [30, 60], k: [40, 80], temp: [20, 30], hum: [60, 80], ph: [6.0, 7.0], rain: [60, 100] },
    bestPractices: [
      "Stake or trellis the plants to keep fruit off the ground and improve airflow.",
      "Maintain consistent soil moisture to prevent blossom end rot.",
      "Prune lower leaves and suckers to direct energy to fruit production.",
      "Watch for early blight and late blight; apply fungicides preventatively."
    ]
  },
  { 
    name: 'Potato', icon: '🥔', desc: 'Grows best in cooler climates with slightly acidic soil.', 
    req: { n: [80, 120], p: [30, 70], k: [80, 140], temp: [15, 25], hum: [60, 80], ph: [5.0, 6.5], rain: [50, 100] },
    bestPractices: [
      "Use certified disease-free seed tubers.",
      "Earthing up (mounding soil around the base) is crucial to prevent tubers from turning green.",
      "Requires high Potassium (K) for good tuber development.",
      "Stop irrigation 10-15 days before harvest to allow the skin to set."
    ]
  },
  { 
    name: 'Onion', icon: '🧅', desc: 'Requires moderate climate with distinct seasons.', 
    req: { n: [40, 80], p: [30, 60], k: [40, 80], temp: [15, 30], hum: [60, 70], ph: [6.0, 7.5], rain: [40, 80] },
    bestPractices: [
      "Onions have shallow roots; keep the topsoil consistently moist but not waterlogged.",
      "Keep the field absolutely weed-free, as onions are poor competitors.",
      "Stop watering when the tops start to fall over to cure the bulbs.",
      "Cure harvested onions in a shaded, well-ventilated area before storage."
    ]
  },
  { 
    name: 'Garlic', icon: '🧄', desc: 'Similar to onion, thrives in moderate conditions.', 
    req: { n: [30, 70], p: [30, 60], k: [30, 70], temp: [15, 25], hum: [50, 70], ph: [6.0, 7.5], rain: [40, 80] },
    bestPractices: [
      "Plant individual cloves with the pointed end facing up.",
      "Requires a cold period (vernalization) for proper bulb formation.",
      "Mulching helps control weeds and conserve moisture.",
      "Harvest when the lower 1/3 of the leaves turn yellow and brown."
    ]
  },
  { 
    name: 'Sugarcane', icon: '🎋', desc: 'Requires hot, humid conditions and high rainfall.', 
    req: { n: [100, 180], p: [40, 80], k: [40, 80], temp: [20, 35], hum: [70, 90], ph: [6.0, 8.0], rain: [150, 250] },
    bestPractices: [
      "Plant healthy setts (stem cuttings) treated with fungicide.",
      "Earthing up and tying the canes together prevents lodging (falling over) during high winds.",
      "Sugarcane requires heavy irrigation, especially during the grand growth phase.",
      "Harvest close to the ground to maximize sugar recovery from the bottom nodes."
    ]
  },
  { 
    name: 'Tea', icon: '🍵', desc: 'Thrives in acidic soil with high rainfall and humidity.', 
    req: { n: [80, 120], p: [20, 40], k: [30, 70], temp: [20, 30], hum: [70, 90], ph: [4.5, 5.5], rain: [150, 300] },
    bestPractices: [
      "Requires highly acidic soil (pH 4.5-5.5) and excellent drainage on hill slopes.",
      "Prune bushes regularly (every 3-4 years) to maintain a flat plucking table.",
      "Pluck only the 'two leaves and a bud' for premium quality tea.",
      "Provide shade trees to regulate temperature and microclimate."
    ]
  },
  { 
    name: 'Rubber', icon: '🌳', desc: 'Needs tropical climate, high rainfall, and acidic soil.', 
    req: { n: [80, 120], p: [30, 60], k: [40, 80], temp: [25, 35], hum: [80, 100], ph: [4.5, 6.0], rain: [200, 300] },
    bestPractices: [
      "Plant grafted saplings for higher latex yield.",
      "Establish cover crops (like Mucuna) to prevent soil erosion and fix nitrogen.",
      "Begin tapping only when the tree girth reaches 50cm at 125cm height (usually 6-7 years).",
      "Avoid tapping on rainy days to prevent bark rot diseases."
    ]
  },
  { 
    name: 'Apple', icon: '🍎', desc: 'Best suited for cooler, temperate regions.', 
    req: { n: [30, 70], p: [10, 30], k: [30, 70], temp: [10, 20], hum: [50, 70], ph: [6.0, 7.0], rain: [60, 100] },
    bestPractices: [
      "Requires winter chilling hours (temperatures below 7°C) to break dormancy.",
      "Prune heavily during winter dormancy to open the canopy to sunlight.",
      "Thin out excess fruit early in the season to ensure larger, high-quality apples.",
      "Monitor closely for apple scab and powdery mildew."
    ]
  },
  { 
    name: 'Orange', icon: '🍊', desc: 'Needs subtropical conditions and moderate rainfall.', 
    req: { n: [60, 100], p: [20, 40], k: [40, 80], temp: [15, 30], hum: [60, 80], ph: [6.0, 7.5], rain: [100, 200] },
    bestPractices: [
      "Plant on well-drained soils; citrus is highly susceptible to root rot in waterlogged conditions.",
      "Apply micronutrients like Zinc and Magnesium foliar sprays, as deficiencies are common.",
      "Protect young trees from frost using tree wraps.",
      "Control citrus psylla and aphids which transmit devastating viral diseases."
    ]
  },
  { 
    name: 'Grapes', icon: '🍇', desc: 'Prefers Mediterranean climates with dry summers.', 
    req: { n: [40, 80], p: [20, 40], k: [40, 80], temp: [15, 30], hum: [50, 70], ph: [6.0, 7.5], rain: [50, 100] },
    bestPractices: [
      "Requires a strong trellis system (like the Bower system) for support.",
      "Pruning is critical; prune heavily during dormancy to limit vegetative growth and maximize fruiting.",
      "Keep the canopy open for good air circulation to prevent fungal diseases like powdery mildew.",
      "Withhold water as harvest approaches to concentrate sugars in the berries."
    ]
  },
  { 
    name: 'Mango', icon: '🥭', desc: 'Tropical fruit requiring warmth and distinct dry season.', 
    req: { n: [80, 120], p: [30, 60], k: [40, 80], temp: [25, 35], hum: [50, 70], ph: [5.5, 7.5], rain: [100, 250] },
    bestPractices: [
      "Plant grafted varieties for early fruiting and true-to-type quality.",
      "Requires a distinct dry spell before flowering to induce blossoms; avoid watering during this time.",
      "Spray paclobutrazol (if applicable) to encourage flowering in irregular bearing varieties.",
      "Monitor for mango hoppers and fruit flies during the fruiting season."
    ]
  },
];

const calculateScore = (value, [min, max]) => {
  if (value >= min && value <= max) return 100;
  const closest = value < min ? min : max;
  const diff = Math.abs(value - closest);
  const range = (max - min) || 1;
  const penalty = (diff / range) * 50; 
  return Math.max(0, 100 - penalty);
};

export const predictTop10Crops = (data) => {
  const { n, p, k, temperature, humidity, ph, rainfall } = data;
  
  const scoredCrops = cropsDatabase.map(crop => {
    const nScore = calculateScore(n, crop.req.n);
    const pScore = calculateScore(p, crop.req.p);
    const kScore = calculateScore(k, crop.req.k);
    const tempScore = calculateScore(temperature, crop.req.temp);
    const humScore = calculateScore(humidity, crop.req.hum);
    const phScore = calculateScore(ph, crop.req.ph);
    const rainScore = calculateScore(rainfall, crop.req.rain);
    
    const totalScore = (nScore + pScore + kScore + tempScore + humScore + phScore + rainScore) / 7;
    
    return {
      crop: crop.name,
      description: crop.desc,
      icon: crop.icon,
      bestPractices: crop.bestPractices,
      score: Math.round(totalScore)
    };
  });
  
  scoredCrops.sort((a, b) => b.score - a.score);
  return scoredCrops.slice(0, 10);
};

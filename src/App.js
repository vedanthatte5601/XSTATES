import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getCountries = async () => {
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    } catch (err) {
      console.error("Error Fetching countries:", err);
    }
  };

  const getStates = async () => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.error("Error Fetching states:", err);
    }
  };

  const getCities = async () => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (err) {
      console.error("Error Fetching cities:", err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCities();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setStates([]);
            setCities([]);
            setSelectedState("");
            setSelectedCity("");
          }}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {states &&
            states.map((state) => {
              return (
                <option key={state} value={state}>
                  {state}
                </option>
              );
            })}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="dropdown"
          disabled={!selectedState || cities.length === 0}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities &&
            cities.map((city) => {
              return (
                <option key={city} value={city}>
                  {city}
                </option>
              );
            })}
        </select>
      </div>
      {selectedCity && (
        <h2 className="result answer">
          You selected <span className="highlight">{selectedCity}</span>
          <span className="fade answer">
            {", "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
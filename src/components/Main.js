import React from "react";
import { useState } from "react";
import "./Main.css";
import "../background.jpg";

export default function Main() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(null);

  const api = "e7ba6d0efbedb88405103d95f0c9166a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric`;

  const fetchWeather = async () => {
    const response = await fetch(url + `&appid=${api}`);
    const resJson = await response.json();
    setData(resJson);
    if (response.ok === false) {
      setData(null);
    }
  };

  function getLocation() {
   
    function success(pos) {
      const crd = pos.coords;
      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric`;
      const fetchWeatherCord = async () => {
        const response = await fetch(url2 + `&appid=${api}`);
        const resJson = await response.json();
        setData(resJson);
        if (response.ok === false) {
          setData(null);
        }
      };
      fetchWeatherCord();
      
    }
    navigator.geolocation.getCurrentPosition(success);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };
  

  
  return (
    <>
      <div className="main-container">
        <div className="search-bar-container">
          <input
            className="search-bar"
            onChange={(event) => setSearchInput(event.target.value)}
            type="text"
            name="name"
            value={searchInput}
            onKeyDown={handleKeyDown}
            placeholder="Enter Location"
          ></input>
          
        </div>
        {data === null ? (
          <div className="no-result">
            <h3>
              Enter location to get weather.<br></br>
              <span onClick={getLocation}
        >or Click here fetch location.</span>
            </h3>
          </div>
        ) : (
          <div className="weather-data-container">
            <div className="weather-data-top">
              <h2>{data.name}</h2>
              <h1>{Math.round(data.main.temp)} °C</h1>
              <p>Min {Math.round(data.main.temp_min)} °C</p>
              <p>Max {Math.round(data.main.temp_max)} °C</p>
              <h3 className="side-text">{data.weather[0].main}</h3>
              <i>
                <h3 className="side-text">{data.weather[0].description}</h3>
              </i>
            </div>
            <div className="weather-data-bottom">
              <div className="bottom">
                <div>
                  <p>Feels like</p>
                  <h4>{Math.round(data.main.feels_like)} °C</h4>
                </div>
                <div>
                  <p>Humidity</p>
                  <h4>{data.main.humidity}%</h4>
                </div>
                <div>
                  <p>Wind</p>
                  <h4>{data.wind.speed}m/s</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

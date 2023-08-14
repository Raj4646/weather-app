import React from "react";
import { useState } from "react";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(null);
  
    const api = "e7ba6d0efbedb88405103d95f0c9166a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric`;
    const fetchWeather = async () => {
      const response = await fetch(url + `&appid=${api}`);
      const resJson = await response.json();
      setData(resJson);
    }
    
    
    const handleKeyDown =  event =>{
      if(event.key === 'Enter'){
        fetchWeather();
      }
    }
    
  return (
    <div>
    <input
      onChange={event => setSearchInput(event.target.value)}
      type="text"
      name="name"
      value={searchInput}
      onKeyDown={handleKeyDown}
    ></input>
    {data===null? <p>No result</p> :
      <>
      <p>{data.name}</p>
      <h1>{data.main.temp}</h1>;
      </>
     }
    </div>
  );
}

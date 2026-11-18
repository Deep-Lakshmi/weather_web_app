import {useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SearchBox({updateInfo}){
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  // const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  // const API_KEY = "4e36c1c9cc71465eabf144928260305";


  let getWeatherInfo = async () => {
  let response = await fetch(
    `http://localhost:5000/api/weather/${city}`
  );

  let jsonResponse = await response.json();

  return {
    city: jsonResponse.city,
    temp: jsonResponse.temperature,
    humidity: jsonResponse.humidity,
    weather: jsonResponse.description,
    tempMin: jsonResponse.temperature,
    tempMax: jsonResponse.temperature,
    feelsLike: jsonResponse.temperature,
  };
};

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
    console.log(city);
   
    let newInfo = await getWeatherInfo();
    updateInfo(newInfo);
     setCity("");
     setError(false);
    }catch(err){
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
      <TextField 
      id="city" 
      label="City Name" 
      variant="outlined"
       required value={city}
       onChange={handleChange}
       />
      <br /> <br />
       <Button variant="contained" type="submit">Search</Button>
       {error && <p style={{color:"red"}}>No such place exists!</p>}
      </form>
    </div>
  );
} 

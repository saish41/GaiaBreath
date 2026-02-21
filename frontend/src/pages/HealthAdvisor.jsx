import { useState } from "react";
import "./HealthAdvisor.css";

function HealthAdvisor(){

  const [inputs,setInputs]=useState({
    temperature:"",
    humidity:"",
    pm2_5:"",
    pm10:"",
    no2:"",
    co:"",
    so2:"",
    age:""
  });

  const [result,setResult]=useState(null);
  const [loading,setLoading]=useState(false);

  const handleChange=e=>{
    setInputs({...inputs,[e.target.name]:e.target.value});
  };

  const analyze=async()=>{
    setLoading(true);

    const res=await fetch("http://127.0.0.1:5000/api/aqi/predict",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({
        temperature:+inputs.temperature,
        humidity:+inputs.humidity,
        pm2_5:+inputs.pm2_5,
        pm10:+inputs.pm10,
        no2:+inputs.no2,
        co:+inputs.co,
        so2:+inputs.so2,
        age:+inputs.age
      })
    });

    const data=await res.json();
    setResult(data);
    setLoading(false);
  };

  return(
    <div className="advisor-page">

      <h2>AQI Health Advisor</h2>

      <div className="advisor-inputs">
        {Object.keys(inputs).map(k=>(
          <input
            key={k}
            name={k}
            placeholder={k}
            value={inputs[k]}
            onChange={handleChange}
          />
        ))}
      </div>

      <button onClick={analyze}>
        {loading?"Analyzing...":"Analyze"}
      </button>

      {result && (
        <div className="advisor-result">
          <h3>{result.final_risk}</h3>
          <p>{result.suggestion}</p>
        </div>
      )}

    </div>
  );
}

export default HealthAdvisor;
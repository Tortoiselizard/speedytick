import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState({
    hours:"",
    minutes: "",
    seconds: ""
  })

  function handleTime(event) {
    setTime(time => ({
      ...time,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div>
      <div>
        <input name='hours' value={time.hours} onChange={handleTime} placeholder={"00"}/> :
        <input name='minutes' value={time.minutes} onChange={handleTime} placeholder={"00"}/> :
        <input name='seconds' value={time.seconds} onChange={handleTime} placeholder={"00"}/>
      </div>
      <div>
        <button>Editar</button>
        <button>Reiniciar</button>
        <button>Iniciar</button>
      </div>
    </div>
  );
}

export default App;

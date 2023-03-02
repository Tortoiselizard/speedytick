import React from 'react';
import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const nintervalID = useRef(0)
  const currentTime = useRef({
    hours: time.hours,
    minutes: time.minutes,
    seconds: time.seconds
  })

  function handleTime(event) {
    setTime(time => ({
      ...time,
      [event.target.name]: Number(event.target.value)
    }))
  }

  function updateTime() {
    currentTime.current.seconds--
    if (currentTime.current.hours || currentTime.current.minutes || currentTime.current.seconds) {
      setTime(time=> ({...time, seconds: currentTime.current.seconds}))
    } else {
      stop()
    }
  } 

  function start() {
    currentTime.current = time
    updateTime()
    nintervalID.current = setInterval(updateTime, 1000)
  }

  function stop() {
    clearInterval(nintervalID.current)
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
        <button onClick={stop}>Detener</button>
        <button onClick={start}>Iniciar</button>
      </div>
    </div>
  );
}

export default App;

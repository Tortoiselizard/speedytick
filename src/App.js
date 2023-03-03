import React from 'react';
import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: ""
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
      [event.target.name]: event.target.value
    }))
  }

  function updateTime() {
    currentTime.current.seconds--
    const goOn = changeTime()
    if (!goOn) stop()
  }

  function changeTime() {
    if (currentTime.current.seconds >= 0) {
      setTime(time=> ({...time, seconds: `${currentTime.current.seconds}`}))
      return true
    } else {
      if (currentTime.current.minutes > 0) {
        currentTime.current = {
          hours:currentTime.current.hours,
          minutes: --currentTime.current.minutes,
          seconds:59
        }
        setTime(time=> ({...time,
          minutes:`${currentTime.current.minutes}`,
          seconds: `${currentTime.current.seconds}`})
        )
        return true
      }
      if (currentTime.current.hours > 0) {
        currentTime.current = {
          hours: --currentTime.current.hours,
          minutes:59,
          seconds:59
        }
        setTime({
          hours: `${currentTime.current.hours}`,
          minutes:`${currentTime.current.minutes}`,
          seconds: `${currentTime.current.seconds}`}
        )
        return true
      }
      return false
    }
  }

  function start() {
    currentTime.current = {
      hours: Number(time.hours),
      minutes: Number(time.minutes),
      seconds: Number(time.seconds)
    }
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

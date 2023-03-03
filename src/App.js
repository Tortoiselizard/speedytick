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
  const initialTime = useRef(time)
  const buttonStart = useRef()
  const buttonStop = useRef()
  const buttonReset = useRef()
  const disabled = useRef(false)

  function handleTime(event) {
    setTime(time => ({
      ...time,
      [event.target.name]: event.target.value
    }))
    initialTime.current = {...time,
      [event.target.name]: event.target.value
    }
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
    disableTags()
    nintervalID.current = setInterval(updateTime, 1000)
  }

  function stop() {
    clearInterval(nintervalID.current)
    disableTags()
  }

  function reset() {
    setTime(initialTime.current)
  }

  function disableTags() {
    disabled.current = !disabled.current
    const inputHours = document.querySelector("input[name='hours']")
    inputHours.disabled = disabled.current
    const inputMinutes = document.querySelector("input[name='minutes']")
    inputMinutes.disabled = disabled.current
    const inputSeconds = document.querySelector("input[name='seconds']")
    inputSeconds.disabled = disabled.current
    buttonStart.current.disabled = disabled.current
    buttonReset.current.disabled = disabled.current
    buttonStop.current.disabled = !disabled.current
  }

  return (
    <div>
      <div>
        <input name='hours' value={time.hours} onChange={handleTime} placeholder={"00"} /> :
        <input name='minutes' value={time.minutes} onChange={handleTime} placeholder={"00"} /> :
        <input name='seconds' value={time.seconds} onChange={handleTime} placeholder={"00"} />
      </div>
      <div>
        <button name='reset' onClick={reset} ref={buttonReset}>Reiniciar</button>
        <button name='stop' onClick={stop} ref={buttonStop}>Detener</button>
        <button name='start' onClick={start} ref={buttonStart}>Iniciar</button>
      </div>
    </div>
  );
}

export default App;

import './App.css'
import Pomodoro from './components/Pomodoro'

function App() {
  return (
    <>
      <div className='container'>
        <Pomodoro 
          pomodoroTime={3660} 
          shortRestTime={300} 
          longRestTime={900}
          cycles={4}
        />
      </div>
    </>
  )
}

export default App;
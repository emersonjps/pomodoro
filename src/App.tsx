import './App.css'
import Pomodoro from './components/Pomodoro'

function App() {
  return (
    <>
      <div className='container'>
        <Pomodoro 
          pomodoroTime={1500} 
          shortRestTime={300} 
          longRestTime={600}
          cycles={4}
        />
      </div>
    </>
  )
}

export default App;
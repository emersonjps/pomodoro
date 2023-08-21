import './App.css'
import List from './components/List';
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
        <List/>
      </div>
    </>
  )
}

export default App;
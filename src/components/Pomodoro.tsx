import { useState } from 'react';
import useInterval from '../hooks/use-interval';
import Button from './Button';
import Timer from './Timer';
import mp3Working from './sounds/working.mp3';
import mp3Paused from './sounds/pauseTime.mp3';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}


function Pomodoro(props: Props) {
  const  [mainTime, setMainTime] = useState(props.pomodoroTime);
  const  [timeCounting, setTimeCounting] = useState(false);
  const  [working, setWorking] = useState(false);
  const  [resting, setResting] = useState(false);


  const startWorking = () => {
    const audio = new Audio(mp3Working);
    audio.play();
  };

  const startTime = () => {
    const audio = new Audio(mp3Paused);
    audio.play();
  };

  useInterval(()=>{
    setMainTime(mainTime - 1)
  }, timeCounting ? 1000 : null);

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false)
    setMainTime(props.pomodoroTime);
  }
  
  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false)

    if (long) {
      setMainTime(props.longRestTime)
    } else {
      setMainTime(props.shortRestTime)
    }
  }

  return (
      <div className={working ? 'pomodoro working' : 'pomodoro'}>
        <h2>You are: working</h2>
        <Timer mainTime={mainTime} />
        <div className='controls'>
          <Button 
            text='Work' 
            onClick={()=> {
              configureWork();
              startWorking();
            }} 
          />
          <Button 
            text='Rest' 
            onClick={()=>{
              configureRest(false);
              startTime();
          }}
          />
          <Button
            clasName={!working && !resting ? 'hidden' : ''}
            text={timeCounting ? 'Pause' : "Play"}  
            onClick={()=> setTimeCounting(!timeCounting)} 
          />
        </div>
        <div className='details'>
          <p>testando..</p>
        </div>
      </div>
  )
}


export default Pomodoro;

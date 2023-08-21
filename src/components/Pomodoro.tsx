import { useCallback, useEffect, useState } from 'react';
import useInterval from '../hooks/use-interval';
import { secondsToTime } from '../utils/seconds-to-time';
import Button from './Button';
import Timer from './Timer';
import mp3Paused from './sounds/pauseTime.mp3';
import mp3Working from './sounds/working.mp3';
import mp3Alert from './sounds/alarm-clock-short-6402.mp3';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}


function Pomodoro(props: Props) {
  const  [addClass, setAddClass] = useState(false);
  const  [mainTime, setMainTime] = useState(props.pomodoroTime);
  const  [timeCounting, setTimeCounting] = useState(false);
  const  [working, setWorking] = useState(false);
  const  [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true));

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startWorking = new Audio(mp3Working);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startTimer = new Audio(mp3Paused);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const alertTimer = new Audio(mp3Alert);

  useInterval(()=>{
    setMainTime(mainTime - 1);
    if (working) setFullWorkingTime(fullWorkingTime + 1);
    if (mainTime === 8) alertTimer.play();
  }, timeCounting ? 1000 : null);

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false)
    setMainTime(props.pomodoroTime);
    startWorking.play();
    },[props.pomodoroTime, startWorking]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true)
      startTimer.play();

      if (long) {
        setMainTime(props.longRestTime)
      } else {
        setMainTime(props.shortRestTime)
      }
  }, [startTimer, props.longRestTime, props.shortRestTime]);

  useEffect(() => {

    if (working) setAddClass(true);
    if (resting) setAddClass(false);

    if (mainTime > 0 ) return;

    if ( working && cyclesQtdManager.length > 0 ) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if ( working && cyclesQtdManager.length <= 0 ) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true))
      setCompletedCycles(completedCycles + 1);
    }

    if ( working ) setNumberOfPomodoros(numberOfPomodoros + 1);
    if ( resting ) configureWork();

  }, 
  [working, resting, mainTime, configureRest, setCyclesQtdManager, cyclesQtdManager, numberOfPomodoros, configureWork, props.cycles, completedCycles, addClass]);
  
  return (
      <div className={addClass ? 'pomodoro working' : 'pomodoro'}>
        <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
        <Timer mainTime={mainTime} />
        <div className='controls'>
          <Button 
            text='Work' 
            onClick={()=> configureWork() } 
          />
          <Button 
            text='Rest' 
            onClick={()=> configureRest(false) }
          />
          <Button
            clasName={!working && !resting ? 'hidden' : ''}
            text={timeCounting ? 'Pause' : "Play"}  
            onClick={()=> setTimeCounting(!timeCounting)} 
          />
        </div>
        <div className='details'>
          <p>Ciclos concluídos: {completedCycles}</p>
          <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
          <p>Pomodoros concluídos: {numberOfPomodoros}</p>
        </div>
      </div>
  )
}


export default Pomodoro;

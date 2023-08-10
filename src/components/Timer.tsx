import { secondsToTime } from "../utils/seconds-to-time";

interface Props {
  mainTime: number;
}

export default function Timer(props: Props): JSX.Element {
  return (
    <div className="timer">{secondsToTime(props.mainTime)}</div>
    )
}
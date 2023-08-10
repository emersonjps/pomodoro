
interface Props {
  text: string;
  onClick?: ()=> void;
  clasName?: string
}

export default function Button(props: Props): JSX.Element {
  return (
    <button onClick={props.onClick} className={props.clasName}>{props.text}</button>
  )
}
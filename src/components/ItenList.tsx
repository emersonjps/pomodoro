import { useState } from "react";

interface props {
  text: string
}

export default function ItenList({text}: props) {
  const [show, setShow] = useState(true)

  function removeIten() {
    return setShow(false)
  }
  
  return (
    <div className={show ? 'iten-list' : 'hidden' }>
      {text} 
      <div className="controls-btn">
        <button className="btn-remove" onClick={removeIten}>Excluir</button>
      </div>
    </div>
  )
}
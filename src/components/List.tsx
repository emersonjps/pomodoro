import  { useState } from 'react';
import ItenList from "./ItenList";

interface ListItem {
  text: string;
}

export default function List() {
  const [text, setText] = useState('');
  const [items, setItems] = useState<ListItem[]>([]);

  function insertTask() {
    if (text.trim() !== '') {
      setItems([...items, { text }]);
      setText('');
    }
  }

  return (
    <>
      <div className="list">
        <h1>Lista</h1>

        <input
          className="add-iten"
          type="text"
          placeholder="task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={insertTask}>adicionar</button>

        {items.map((item, index) => (
          <ItenList key={index} text={item.text} />
        ))}
      </div>
    </>
  );
}

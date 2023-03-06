import Dropdown from './components/Dropdown';
import './App.css';
import { useState } from 'react';
function App() {
  const [data] = useState(["hello", "world"])
  return (
    <div className="App">
      <Dropdown listId={"options"} options={data} placeholder="search" />
      <Dropdown listId={"options2"} options={["option 1", "option 2"]} placeholder="pick a favorite"/>
    </div>
  );
}

export default App;

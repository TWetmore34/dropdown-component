import Dropdown from './components/Dropdown';
import DropdownCustom from './components/DropdownCustom';
import './App.css';
import { useState } from 'react';
function App() {
  const [data] = useState(["hello", "world"])
  return (
    <div className="App">
      <Dropdown listId={"options"} options={data} placeholder="search" />
      <DropdownCustom options={data} placeholder={"search"}>
      </DropdownCustom>
    </div>
  );
}

export default App;

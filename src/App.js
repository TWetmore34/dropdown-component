import Dropdown from './components/Dropdown';
import './App.css';
import { useState } from 'react';
function App() {
  const [data] = useState(["hello", "world"])
  return (
    <div className="App">
      <Dropdown options={data} placeholder="search" />
    </div>
  );
}

export default App;

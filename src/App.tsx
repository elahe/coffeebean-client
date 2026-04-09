
import { useEffect, useState } from 'react';
import './App.css'
import { getCoffees } from './services/coffee.service';

function App() {
  const [coffees, setCoffees] =useState([])
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getCoffees();
      setCoffees(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);
  return (
    <div>
      <h1>Coffee App ☕</h1>
      {coffees.map((coffee:any)=>(
        <div key={coffee.id}>
          <div>{coffee.name}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
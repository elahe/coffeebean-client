
import { useEffect, useState } from 'react';
import './App.css'
import { getCoffees } from './services/coffee.service';
import { Route, Routes } from 'react-router';
import CoffeePage from './pages/CoffeePage';
import HomePage from './pages/HomePage';

function App() {
  const [coffees, setCoffees] = useState([])
  
  const fetchData = async () => {
    try {
      const res = await getCoffees();
      setCoffees(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage coffees={coffees} setCoffees={setCoffees} fetchData={fetchData}/>} />
        <Route path='/coffeeDetail/:id' element={<CoffeePage coffees={coffees}/>}/>
      </Routes>
    </>
  );
}

export default App;
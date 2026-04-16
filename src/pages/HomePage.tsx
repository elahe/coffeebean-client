
import { Link, useParams } from "react-router";
import type { Coffee } from "../types/coffee";
import AddCoffeeForm from "../components/AddCoffeeForm";
import API from "../services/api";
import { useState } from "react";



type props = {
    coffees : Coffee[];
    setCoffee :React.Dispatch<React.SetStateAction<Coffee[]>>;
    fetchData: () => Promise<void>;
}




export default function HomePage({coffees, setCoffee,fetchData}: props) {
    // editing
    const [selectedCoffee,setSelectedCofffee] = useState<null|number>(null)

    const deleteCoffee = async(id: number) =>{
    try {
        await API.delete(`/coffees/${id}`)
        fetchData()
        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
        <div>HomePage</div>
        <div>
            <h1>Coffee App ☕</h1>
            {coffees.map((coffee:any)=>(
            <div key={coffee.id}>
                <Link to={`/coffeeDetail/${coffee.id}`}><div>
                    {coffee.name}
                </div></Link>
                <div>
                        <button onClick={()=>{deleteCoffee(coffee.id)}}>delete</button>
                        <button onClick={()=>{setSelectedCofffee(coffee.id)
                            
                        }}>edit</button>
                </div>
                
            </div>
            ))}
        </div>
        <AddCoffeeForm coffees={coffees} setCoffee={setCoffee} fetchData={fetchData} setSelectedCofffee={setSelectedCofffee} selectedCoffee={selectedCoffee}/>
    </>
  )
}

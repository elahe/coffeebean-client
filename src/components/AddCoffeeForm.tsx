import { useState } from "react";
import type { Coffee } from "../types/coffee";
import API from "../services/api";

type props = {
    coffees : Coffee[];
    setCoffee :React.Dispatch<React.SetStateAction<Coffee[]>>;
    fetchData: () => Promise<void>;
    setSelectedCofffee: React.Dispatch<React.SetStateAction<number | null>>;
    selectedCoffee: number | null;
}

export default function AddCoffeeForm({coffees, setCoffee, fetchData, selectedCoffee, setSelectedCofffee}: props) {
    const [name,setName ]= useState("")
    const [origin,setOrigin ]= useState("")
    const [roast,setRoast]= useState("")
    const [recipes,setRecipes ]= useState("")

    const body ={
        name:name,
        origin:origin,
        roast:roast,
        recipes:recipes
    }
    const editedBody ={
        name,
        origin,
        roast,
        recipes
    }
    
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        try {
            await API.post("/coffees",body)
            fetchData()
            
            setName("")
            setOrigin("")
            setRoast("")
            setRecipes("")

        } catch (error) {
            console.log(error)
        }

    }
    const editCoffee = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            await API.put(`/coffees/${selectedCoffee}`,editedBody)
            setSelectedCofffee(null);
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
        <form onSubmit={selectedCoffee === null ? handleSubmit : editCoffee}>
            <input className="border border-black p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="border border-black p-2 rounded" value={origin} onChange={(e) => setOrigin(e.target.value)} />
            <input className="border border-black p-2 rounded" value={roast} onChange={(e) => setRoast(e.target.value)} />
            <input className="border border-black p-2 rounded" value={recipes} onChange={(e) => setRecipes(e.target.value)} />

            <button type="submit">
                {selectedCoffee === null ? "add" : "save"}
            </button>
        </form>
    </>
  )
}

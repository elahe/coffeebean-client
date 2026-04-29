
import { Link, useParams } from "react-router";
import type { Coffee } from "../types/coffee";
import AddCoffeeForm from "../components/AddCoffeeForm";
import API from "../services/api";
import { useState } from "react";
import coffeepic from "../assets/coffeepic.png"
import { HeartIcon, PencilIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";



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
        <div className="bg-cover h-screen w-screen bg-center" style={{ backgroundImage: `url(${coffeepic})` }}>
            <div className="h-full flex flex-col justify-center items-start  px-10">
                <div className="bg-white/80 rounded-full px-4 py-2">
                    brewbook
                </div>
                <h1 className="text-[#3a2418] text-5xl font-bold">
                    A cozy little notebook <br />
                    for the coffees you love.
                </h1>
                <p className="text-[#35271dbf] text-xl">
                    Save your favourite beans, jot down brew recipes, and brew them just right.
                </p>

            </div>
        </div>

        <div>
            <div className="bg-[#f7ece5] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {/* <h1>Coffee App ☕</h1> */}
                {coffees.map((coffee:any)=>(
                <div key={coffee.id} className="rounded-lg border-[#f9f7f2] border m-2">
                    <Link to={`/coffeeDetail/${coffee.id}`}>
                        <div className="py-4 px-2">
                            {coffee.name}
                        </div>
                    </Link>
                    <div className="bg-[#f6f1eb] py-4 px-2 flex justify-end">
                            <button onClick={()=>{deleteCoffee(coffee.id)}} className="flex items-center hover:bg-green-100 py-1 px-2">
                                <TrashIcon className="w-4"/>
                                <span>delete</span>
                            </button>
                            <button onClick={()=>{setSelectedCofffee(coffee.id)}} className="flex items-center hover:bg-green-100 py-1 px-2 my-2">
                                <PencilIcon className="w-4"/>
                                <span>edit</span>
                            </button>
                    </div>
                    
                    
                </div>
                ))}
            </div>
        </div>
        <AddCoffeeForm coffees={coffees} setCoffee={setCoffee} fetchData={fetchData} setSelectedCofffee={setSelectedCofffee} selectedCoffee={selectedCoffee}/>
    </>
  )
}

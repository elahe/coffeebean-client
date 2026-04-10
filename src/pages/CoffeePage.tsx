import { useParams } from "react-router-dom";
import type { Coffee } from "../types/coffee";
import { useEffect, useState } from "react";
import API from "../services/api";

type Props = {
  coffees: Coffee[];
};

export default function CoffeePage({ coffees }: Props) {
    //coffee
  const { id } = useParams();
  const coffeeId = Number(id);
  const coffee = coffees.find((c) => c.id === coffeeId);

  //recipe
  const [recipe, setRecipe] = useState([])
  useEffect(()=>{
    const getRecippe = async() =>{
        try {
            const response = await API.get(`/recipe/${coffeeId}`)
            setRecipe(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    getRecippe()
  },[])

  if (!coffee) return <div>Loading...</div>;

  return (
    <>
        {recipe.map((eachRecipe)=>{
            return <div key={eachRecipe.id}>
                {eachRecipe.method}
            </div>

        })}
      <h1>{coffee.name}</h1>
      <h2>{coffee.origin}</h2>
      <h2>{coffee.roast}</h2>
    </>
  );
}
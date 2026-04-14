import { useParams } from "react-router-dom";
import type { Coffee } from "../types/coffee";
import { useEffect, useState } from "react";
import API from "../services/api";
import type { Recipe } from "../types/recipe";
import AddRecipeForm from "../components/AddRecipeForm";

type Props = {
  coffees: Coffee[];
};

export default function CoffeePage({ coffees }: Props) {
    //coffee
  const { id } = useParams();
  const coffeeId = Number(id);
  const coffee = coffees.find((c) => c.id === coffeeId);

  //recipe
  const [recipe, setRecipe] = useState<Recipe[]>([])
  useEffect(()=>{
    const getRecippe = async() =>{
        try {
            const response = await API.get(`/recipe/${coffeeId}`)
            setRecipe(response.data)
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    getRecippe()
  },[coffeeId])


  if (!coffee) return <div>Loading...</div>;

  return (
    <>
        <h1>{coffee.name}</h1>
        <h2>{coffee.origin}</h2>
        <h2>{coffee.roast}</h2>
        {recipe.map((eachRecipe)=>{
            return <div key={eachRecipe.id}>
                {eachRecipe.title} ,{eachRecipe.method} ,{eachRecipe.grindSize}, {eachRecipe.ratio} ,{eachRecipe.notes} ,{eachRecipe.coffeeId}
            </div>
        })}

        <h3>add your recipe</h3>
        <AddRecipeForm recipe={recipe} setRecipe={setRecipe} coffeeId={coffeeId}/>
      
    </>
  );
}
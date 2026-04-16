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


    /// editing
    const [editing, setEditing] =useState(false)
    const [selectedItem, setSelectedItem] = useState<number | null>(null)
    const [title, setTitle] =useState("")
    const [method, setMethod] =useState("")
    const [grindSize, setGrindSize] =useState("")
    const [ratio, setRatio] =useState("")
    const [notes, setNotes] =useState("")
    // console.log(recipe[].title)



  const getRecippe = async() =>{
        try {
            const response = await API.get(`/recipe/${coffeeId}`)
            setRecipe(response.data)
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
  useEffect(()=>{
    getRecippe()
  },[coffeeId])

  const deleteRecipe = async(recipeId :number) =>{
    try {
        await API.delete(`/recipe/${recipeId}`)
        getRecippe()
    } catch (error) {
        console.log(error)
    }
  }
const editRecipe = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedItem) return;

  const body = {
    title,
    method,
    grindSize,
    ratio,
    notes,
    coffeeId,
  };

  try {
    await API.patch(`/recipe/${selectedItem}`, body);
    setEditing(false);
    getRecippe();
  } catch (error) {
    console.log(error);
  }
};




  if (!coffee) return <div>Loading...</div>;

  return (
    <>
        <h1>{coffee.name}</h1>
        <h2>{coffee.origin}</h2>
        <h2>{coffee.roast}</h2>
        {recipe.map((eachRecipe)=>{
            return <div key={eachRecipe.id}>
                {eachRecipe.title} ,{eachRecipe.method} ,{eachRecipe.grindSize}, {eachRecipe.ratio} ,{eachRecipe.notes} 
                <div>
                    <button onClick={()=>{deleteRecipe(eachRecipe.id)}}>delete</button>
                    <button onClick={()=>{setEditing(true)
                        setSelectedItem(eachRecipe.id)
                        setTitle(eachRecipe.title);
                        setMethod(eachRecipe.method);
                        setGrindSize(eachRecipe.grindSize);
                        setRatio(eachRecipe.ratio);
                        setNotes(eachRecipe.notes);
                    }}>edit</button>
                </div>
            </div>
        })}

        <h3>add your recipe</h3>
        <AddRecipeForm recipe={recipe} setRecipe={setRecipe} coffeeId={coffeeId}/>
        {editing &&(
            <>
                <h1>edit part</h1>
                <form onSubmit={editRecipe}>
                    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                    <input type="text" value={method} onChange={(e)=>{setMethod(e.target.value)}}/>
                    <input type="text" value={grindSize} onChange={(e)=>{setGrindSize(e.target.value)}}/>
                    <input type="text" value={ratio} onChange={(e)=>{setRatio(e.target.value)}}/>
                    <input type="text" value={notes} onChange={(e)=>{setNotes(e.target.value)}}/>
                    <button type="submit">add</button>
                    <button type="button" onClick={() =>{setEditing(false)}}>cancle</button>
                </form>
            </>
        )}
      
    </>
  );
}
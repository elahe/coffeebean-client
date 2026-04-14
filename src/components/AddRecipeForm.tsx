
import { useEffect, useState } from "react"
import type { Recipe } from "../types/recipe"
import API from "../services/api"

type Props ={
    recipe : Recipe[]
    setRecipe :React.Dispatch<React.SetStateAction<Recipe[]>>
}


export default function AddRecipeForm({recipe, setRecipe, coffeeId}:Props) {
    const [title, setTitle] =useState("")
    const [method, setMethod] =useState("")
    const [grindSize, setGrindSize] =useState("")
    const [ratio, setRatio] =useState("")
    const [notes, setNotes] =useState("")
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const body ={
            title :title,
            method :method,
            grindSize :grindSize,
            ratio :ratio,
            notes :notes,
            coffeeId: coffeeId
        }
        try {
            await API.post("/recipe", body)
            const response = await API.get(`/recipe/${coffeeId}`)
            setRecipe(response.data)

            setTitle("")
            setMethod("")
            setGrindSize("")
            setRatio("")
            setNotes("")

            console.log(response.data)
            
        } catch (error) {
            console.log(error)
        }

    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" value={method} onChange={(e)=>{setMethod(e.target.value)}}/>
            <input type="text" value={grindSize} onChange={(e)=>{setGrindSize(e.target.value)}}/>
            <input type="text" value={ratio} onChange={(e)=>{setRatio(e.target.value)}}/>
            <input type="text" value={notes} onChange={(e)=>{setNotes(e.target.value)}}/>
            <button type="submit">add</button>
        </form>
    </div>
  )
}

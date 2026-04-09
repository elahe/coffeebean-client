 import API from "./api";


 export const getCoffees =()=>{
    return API.get("/coffees")
 }
 export const createCoffee = (data: any) =>{
    return API.post("/coffees",data)
 }
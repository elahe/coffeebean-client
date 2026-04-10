
import { Link } from "react-router";
import type { Coffee } from "../types/coffee";



type props = {
    coffees : Coffee[];
}



export default function HomePage({coffees}: props) {


  return (
    <>
        <div>HomePage</div>
        <div>
            <h1>Coffee App ☕</h1>
            {coffees.map((coffee:any)=>(
            <div key={coffee.id}>
                <Link to={`/coffeeDetail/${coffee.id}`}><div>{coffee.name}</div></Link>
                
            </div>
            ))}
        </div>
    </>
  )
}

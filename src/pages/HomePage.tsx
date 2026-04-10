// import { Coffee } from "../types/coffee"

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
                <div>{coffee.name}</div>
            </div>
            ))}
        </div>
    </>
  )
}

import {Age}from "./component/age"
function App() {
 return(
    <div className='calc'>
         <div className='one'>
            <span>
               <label></label>
               <input></input>
            </span>
            <span>
               <label></label>
               <input></input>
            </span>
            <span>
               <label></label>
               <input></input>
            </span>
         </div>
         <div className='tow'>
            <button></button>
         </div>
         <div className='three'>
           <Age></Age>
         </div>
    </div>
 )
}

export default App;
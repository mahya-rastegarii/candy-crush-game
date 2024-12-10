
import React, { useEffect, useState } from 'react'

// Importing images
import blueCandy from '../assets/img/blue-candy.png'
import greenCandy from '../assets/img/green-candy.png'
import orangeCandy from '../assets/img/orange-candy.png';
import purpleCandy from '../assets/img/purple-candy.png';
import redCandy from '../assets/img/red-candy.png';
import yellowCandy from '../assets/img/yellow-candy.png';
// import blank from '../assets/img/blank.png';

const MainLayout: React.FC = () => {
  
 const [currentCandies, setCurrentCandies] = useState<string[]>  ([])
  const width: number = 8;
 const candy: string[] = [
    blueCandy,
    greenCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy
 ]


 const createBoard = () => {
  const candyArrangement: string[] =[]
  
  for (let i = 0;i < width * width; i++) {
    const randomCandy = candy[Math.floor(Math.random()* candy.length)]
    candyArrangement.push(randomCandy)
  }
     setCurrentCandies(candyArrangement)
 }

 useEffect( () => {
  createBoard()
 }, [])

  return (
    <div className='w-full h-full flex justify-center bg-slate-300 items-center p-8'>
       <div className="w-[400px] h-[400px] flex justify-center  items-center  rounded-sm flex-wrap bg-slate-200">
        {
          currentCandies.map( (candyColor, index) => (

            <img key={index} src={candyColor} alt={candyColor} width={50} height={50} className=' border border-slate-100'/>
          ))
        }
       </div>
    </div>
  )
}

export default MainLayout;

import React, { useEffect, useState } from 'react'
// Importing images
import bgImage1 from "../assets/img/rb_2147811813.png"
import bgImage2 from "../assets/img/3d-cartoon-background-children.jpg"
import bgImage3 from "../assets/img/rb_2147806998.png"
import blueCandy from '../assets/img/blue-candy.png';
import greenCandy from '../assets/img/green-candy.png'
import orangeCandy from '../assets/img/orange-candy.png';
import purpleCandy from '../assets/img/purple-candy.png';
import redCandy from '../assets/img/red-candy.png';
import yellowCandy from '../assets/img/yellow-candy.png';
import blank from '../assets/img/blank.png';

const GamePage: React.FC = () => {
  
  const [currentCandies, setCurrentCandies] = useState<string[]>  ([])
  const [squareBeingDragged, setSquareBeingDragged] = useState<HTMLImageElement | null>  (null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<HTMLImageElement | null>  (null)
  const [backgroudPage, setBackgroundPage]= useState <string>(bgImage1);
  const [showImage, setShowImage] =useState(false)

  const width: number = 8;
  const notValidTree: number[] = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
  const notValidFour: number[] = [ 5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];

 const candy: string[] = [
    blueCandy,
    greenCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    
 ]


 const createBoard = () => {
  const candyArrangement: string[] =[]
  // const candyArrangement: string[] =Array.from({ length: width * width }, () =>
  //   candy[Math.floor(Math.random() * candy.length)],
  for (let i = 0;i < width * width; i++) {
    const randomCandy = candy[Math.floor(Math.random()* candy.length)]
    candyArrangement.push(randomCandy)
  }
//  );
     setCurrentCandies(candyArrangement)
 }


 

 const checkForColumnOfFour = () => {

  for (let i = 0; i <= 39; i++){
    const columnOfFour: number[] = [i, i+ width, i+ width * 2,i+ width * 3 ]
    const candyType : string = currentCandies[i]
    const isBlank = currentCandies[i] === blank

    if(columnOfFour.every(square => currentCandies[square] === candyType && !isBlank)) {
      columnOfFour.forEach(square => currentCandies[square] = blank)
      return true;
    }
  }
 }

 const checkForRowOfFour = () => {

  for (let i = 0; i < 64; i++){
    const rowOfFour: number[] = [i, i+ 1, i+ 2, i+ 3  ]
    const candyType : string = currentCandies[i]
    const isBlank = currentCandies[i] === blank

    if(notValidFour.includes(i)) continue;

    if(rowOfFour.every(square => currentCandies[square] === candyType && !isBlank)) {

      rowOfFour.forEach(square => currentCandies[square] = blank)
      return true;
    }
  }
 }
  
 const checkForColumnOfThree = () => {

  for (let i = 0; i <= 47; i++){
    const columnOfThree: number[] = [i, i+ width, i+ width * 2]
    const candyType: string = currentCandies[i]
    const isBlank = currentCandies[i] === blank

    if (columnOfThree.every(square => currentCandies[square] === candyType && !isBlank)) {
      columnOfThree.forEach(square => currentCandies[square] = blank)
      return true;
    }
  }
 }

 const checkForRowOfThree = () => {

  for (let i = 0; i < 64; i++){
    const rowOfThree: number[] = [i, i+ 1, i+ 2  ]
    const candyType: string = currentCandies[i]
    const isBlank = currentCandies[i] === blank

    if(notValidTree.includes(i)) continue;

    if (rowOfThree.every(square => currentCandies[square] === candyType && !isBlank)) {
      rowOfThree.forEach(square => currentCandies[square] = blank)
      return true;
    
    }
  }
 }

 const moveIntoSquareBelow = ()=> {
  const firstRow = Array.from({ length: width }, (_, i) => i);

  for( let i = 0; i <= 55; i++) {

    // const firstRow: number[] = [0, 1, 2 , 3, 4, 5, 6, 7];
    const isFirstRow = firstRow.includes(i);

    if(isFirstRow && currentCandies[i] === blank) {
      // const randomNumber: number = Math.floor(Math.random() * candy.length)
      currentCandies[i] = candy[Math.floor(Math.random() * candy.length)];
    }

    if((currentCandies[i +width]) === blank){
      currentCandies[i +width] = currentCandies[i]
      currentCandies[i] = blank;
    }
  }
 }


 const dragStartHandler = (e: React.DragEvent<HTMLImageElement>) =>{
  
  setSquareBeingDragged(e.target as HTMLImageElement)
}

const dragDropHandler = (e: React.DragEvent<HTMLImageElement>) => {
  setSquareBeingReplaced(e.target as HTMLImageElement);
}

const dragEndHandler = () =>{

  if (!squareBeingDragged || !squareBeingReplaced) return;
  const squareBeingDraggedId =  parseInt(squareBeingDragged.getAttribute('data-id') || '')
  const squareBeingReplacedId =  parseInt(squareBeingReplaced.getAttribute('data-id') || '')

  currentCandies[squareBeingReplacedId] = squareBeingDragged.getAttribute('src') || ''
  currentCandies[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src') || ''

  const validMoves = [
    squareBeingDraggedId -1,
    squareBeingDraggedId - width,
    squareBeingDraggedId +1,
    squareBeingDraggedId + width
  ];

  const validMove = validMoves.includes(squareBeingReplacedId)

  const patternsFound =
  checkForColumnOfFour() ||
  checkForRowOfFour() ||
  checkForColumnOfThree() ||
  checkForRowOfThree();

  
      if (squareBeingReplacedId &&
          validMove &&
          patternsFound){
          setSquareBeingDragged(null)
          setSquareBeingReplaced(null)
      } else {
          currentCandies[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src') ||''
          currentCandies[squareBeingDraggedId] = squareBeingDragged.getAttribute('src') ||''
          setCurrentCandies([...currentCandies])
      }
    }



 useEffect( () => {
  createBoard()
 }, [])

 useEffect( () => {
  const timer: number = setInterval( () =>{
  checkForColumnOfFour()
  checkForRowOfFour();
    checkForColumnOfThree();
    checkForRowOfThree()
   moveIntoSquareBelow()
    setCurrentCandies([...currentCandies])
  }, 100);

 
  return () => 
    clearInterval(timer);
  
 }, [currentCandies])




  

  return (
    <div className='w-full h-screen space-y-4 object-cover flex flex-col  justify-center items-center p-8 '
    style={{backgroundImage:`url(${backgroudPage === "bgImage1" ? bgImage1 : backgroudPage === "bgImage2" ? bgImage2 : bgImage3})`,
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "center" }}
    >
   <div className=" w-[600px] flex justify-around items-center space-x-5">
    <div className="flex flex-col justify-center items-center">
    <button className=' bg-rose-700 px-2 mr-2 py-3  rounded-md  text-white' onClick={() => setShowImage(!showImage)}> change background</button>
    <div className={`  flex-col justify-center items-center py-1 ${ showImage ? 'flex' : 'hidden'}  w-40 backdrop-blur-lg z-10 shadow-md absolute space-y-5 top-28 `}>
  
   <img className=' border-2 border-red-100' src={bgImage1} width={120}  onClick={(e) => setBackgroundPage(e.target.alt)} alt="bgImage1" />
    <img className=' border-2 border-red-100' src={bgImage2} width={120} onClick={(e) => setBackgroundPage(e.target.alt)} alt="bgImage2" />
    <img className=' border-2 border-red-100' src={bgImage3} width={120} onClick={(e) => setBackgroundPage(e.target.alt)} alt="bgImage3" />
   </div>
    
    </div>
    <div className="flex space-x-5">
      <div className="flex ">
        <img src={redCandy} alt="" width={20} height={20} />
        <h5 className=" font-bold">0</h5>
      
      </div>
      <div className="flex space-x-1">
        <img src={blueCandy} alt="" width={20} height={20} />
        <h5 className=" font-bold">0</h5>
       
      </div>
      <div className="flex space-x-1">
        <img src={greenCandy} alt="" width={20} height={20} />
        <h5 className=" font-bold">0</h5>
      </div>
    </div>
    <div className="flex">
      <h5 className=" font-bold"> Score : 0</h5>
    </div>
   </div>
       <div className="w-[600px] h-[600px] relative flex justify-center  items-center  rounded-sm flex-wrap backdrop-blur-xl">
        {
          currentCandies.map( (candyColor, index) => (

            <img 
            key={index}
             src={candyColor}
              alt={candyColor}
               width={70}
               height={70}
               className=' border border-slate-50 border-opacity-20'
               data-id={index}
               draggable={true}
               onDragStart={dragStartHandler}
               onDragOver={(e) => e.preventDefault()}
               onDragEnter={(e) => e.preventDefault()}
               onDragLeave ={(e) => e.preventDefault()}
               onDrop={dragDropHandler}
               onDragEnd={dragEndHandler}
               />
          ))
        }
       </div>
    </div>
  )
}

export default GamePage;
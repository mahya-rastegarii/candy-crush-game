
import React, { useEffect, useRef, useState } from 'react';
// Imporing audio
import sound from "../assets/audio/dragSound.wav";
import candiesSound from "../assets/audio/candiesSound.wav";
import winSound from "../assets/audio/winSound.wav"

// Importing images
import bgImage1 from "../assets/img/rb_2147811813.png"
import bgImage2 from "../assets/img/rb_2147806998.png"
import blueCandy from '../assets/img/blue-candy.png';
import greenCandy from '../assets/img/green-candy.png'
import orangeCandy from '../assets/img/orange-candy.png';
import purpleCandy from '../assets/img/purple-candy.png';
import redCandy from '../assets/img/red-candy.png';
import yellowCandy from '../assets/img/yellow-candy.png';
import blank from '../assets/img/blank.png';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrPowerReset } from 'react-icons/gr';
import { IoCloseSharp } from 'react-icons/io5';
import { FaHome } from 'react-icons/fa';
import PageBackdrop from '../components/PageBackdrop';






//type
type CandyCount = {
  blue: number;
  green: number;
  red: number;
  orange: number;
};

const GamePage: React.FC = () => {
  
  const navigate = useNavigate();
  
  const [currentCandies, setCurrentCandies] = useState<string[]>  ([])
  const [squareBeingDragged, setSquareBeingDragged] = useState<HTMLImageElement | null>  (null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<HTMLImageElement | null>  (null)
  const [backgroudPage, setBackgroundPage]= useState <string>('bgImage1');
 const [scoreGame, setScoreGame]= useState<number>(0);
  const [levelComplete, setLevelComplete]= useState(false);
  const [showMenu, setShowMenu]= useState(false);
  const [candyCount, setCandyCount] = useState({
  blue: 0,
  green: 0,
  orange: 0,
  red: 0,
});

  const soundaudioRef = useRef<HTMLAudioElement>(null);
  const candiesSoundAudioRef = useRef<HTMLAudioElement>(null);
  const winSoundAudioRef = useRef<HTMLAudioElement>(null);
  const candyGridRef = useRef<HTMLDivElement>(null);

  const blueCandyCount: number= 12;
  const greenCandyCount: number= 12;
  const orangeCandyCount: number= 12;
   const redCandyCount: number= 12;
 

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

  const audio = candiesSoundAudioRef.current;

  if (audio) {
    audio.volume = 0.7; 
    audio.play();
  }

  const candyArrangement: string[] =[]
 
  for (let i = 0;i < width * width; i++) {
    const randomCandy = candy[Math.floor(Math.random()* candy.length)]
    candyArrangement.push(randomCandy)
  }

     setCurrentCandies(candyArrangement)
 }


 

 const checkForColumnOfFour = () => {

  for (let i = 0; i <= 39; i++){
    const columnOfFour: number[] = [i, i+ width, i+ width * 2,i+ width * 3 ]
    const candyType : string = currentCandies[i]
    const isBlank = currentCandies[i] === blank

    if(columnOfFour.every(square => currentCandies[square] === candyType && !isBlank)) {
      if(!levelComplete) setScoreGame( (score) => score+ 4)
      columnOfFour.forEach(square => currentCandies[square] = blank)
        updateCandyCount(candyType, columnOfFour.length);
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
      if(!levelComplete) setScoreGame( (score) => score+ 4)

      rowOfFour.forEach(square => currentCandies[square] = blank)
    updateCandyCount(candyType, rowOfFour.length);
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
      if(!levelComplete) setScoreGame( (score) => score+ 3)

      columnOfThree.forEach(square => currentCandies[square] = blank);
        updateCandyCount(candyType, columnOfThree.length);
      return true;
    }
  }
 }

 const checkForRowOfThree = () => {

  for (let i = 0; i < 64; i++){
    const rowOfThree: number[] = [i, i+ 1, i+ 2  ]
    const candyType: string = currentCandies[i]
    const isBlank = currentCandies[i] === blank

    if(notValidTree?.includes(i)) continue;

    if (rowOfThree.every(square => currentCandies[square] === candyType && !isBlank)) {
      if(!levelComplete)setScoreGame( (score) => score+ 3)
      rowOfThree.forEach(square => currentCandies[square] = blank);
      updateCandyCount(candyType, rowOfThree.length);
      return true;
    
    }
  }
 }

 const moveIntoSquareBelow = ()=> {

  for( let i = 0; i <= 55; i++) {

    const firstRow: number[] = [0, 1, 2 , 3, 4, 5, 6, 7];
    const isFirstRow = firstRow?.includes(i);

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

  const audio = soundaudioRef.current;
  setSquareBeingDragged(e.target as HTMLImageElement)

  if (audio) {
    audio.volume = 0.7; 
    audio.play();
  }
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

    
    const updateCandyCount = (candy: string, count: number) => {
  setCandyCount((prev: CandyCount) => {
    const maxCounts: CandyCount  = {
      blue: blueCandyCount,
      green: greenCandyCount,
      orange: orangeCandyCount,
      red: redCandyCount,
    };

    const updatedCount: CandyCount  = { ...prev };

  (Object.keys(prev) as (keyof CandyCount)[]).forEach((color) => {
      if (candy.includes(color) && prev[color] < maxCounts[color]) {
        updatedCount[color] = prev[color] + count;
      } 
    });

    return updatedCount;
  });
};


 const handleLevelComplete = () => {
   
  const audio = winSoundAudioRef.current;

  if (audio) {
    audio.volume = 0.7;
    audio.play();
  }
  setLevelComplete(true);
       if (candyGridRef.current) {
     
      const candies = candyGridRef.current.children;

      Array.from(candies).forEach((candy) => {
        const element = candy as HTMLDivElement;
        const randomX = (Math.random() - 0.5) * 200; 
        const randomY = (Math.random() - 0.5) * 200; 

        element.style.transition = 'transform 1.5s, opacity 1.5s';
        element.style.transform = `translate(${randomX}px, ${randomY}px) scale(0)`;
        element.style.opacity = '0';
      });
    }
    // setTimeout(() => {
    //   console.log('Move to the next level');
    // }, 2000); 
  };

  const resetGame = () => {

    if (candyGridRef.current) {
      const candies = candyGridRef.current.children;
      Array.from(candies).forEach((candy) => {
        const element = candy as HTMLDivElement;
        element.style.transform = '';
        element.style.opacity = '1';  
      });
    }
  
   
    createBoard();
    setLevelComplete(false);
    setShowMenu(false)
    setScoreGame(0);
    setCandyCount({
      blue: 0,
      green: 0,
      orange: 0,
      red: 0
    });
  };
  
 
  
  const changeBackground = (e: React.DragEvent<HTMLImageElement>) => {

    const value = (e.target as HTMLImageElement).alt;
    setBackgroundPage(value)
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


 useEffect(() => {
  const isLevelComplete =
    candyCount.blue >= blueCandyCount &&
    candyCount.green >= greenCandyCount &&
    candyCount.red >= redCandyCount &&
    candyCount.orange >= orangeCandyCount
  if (isLevelComplete && !levelComplete) {
    handleLevelComplete();
  }
}, [candyCount, levelComplete]);


  

  return (
    <div className=' w-full overflow-hidden h-screen space-y-4 object-cover flex flex-col  justify-center items-center p-8 '
    style={{backgroundImage:`url(${backgroudPage === "bgImage1" ? bgImage1 : bgImage2 })`,
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "center" }}
    >
     <PageBackdrop showMenu={showMenu} setShowMenu={setShowMenu}/>
   <div className=" w-full md:w-[600px] flex flex-col space-y-3 lg:flex-row justify-around items-center lg:space-x-5">
   
   <div className=" w-full lg:w-fit flex justify-between"> 
    <div className='flex justify-center items-center cursor-pointer hover:text-rose-900' onClick={() => setShowMenu(true)}>
     <GiHamburgerMenu className='inline text-xl ' />
     <span className=' ml-1  font-bold'> Menu </span>
     </div>
     <div className="flex lg:hidden">
      <h5 className=" font-bold"> Score :{scoreGame}</h5>
    </div>
   </div>
    
    <div className="flex space-x-3 lg:space-x-5">
      <div className="flex ">
        <img src={redCandy} alt="" width={20} height={20} />
        <h5 className=" font-bold">{redCandyCount}\{candyCount.red < redCandyCount? candyCount.red : redCandyCount}</h5>
      
      </div>
      <div className="flex ">
        <img src={orangeCandy} alt="" width={20} height={20} />
        <h5 className=" font-bold">{orangeCandyCount}\{candyCount.orange < orangeCandyCount? candyCount.orange : orangeCandyCount}</h5>
      
      </div>
      <div className="flex space-x-1">
        <img src={blueCandy} alt="" width={20} height={20} />
        <h5 className=" font-bold">{blueCandyCount}\{candyCount.blue < blueCandyCount ? candyCount.blue : blueCandyCount}</h5>
       
      </div>
      <div className="flex space-x-1">
        <img src={greenCandy} alt="" width={20} height={20} />
        <h5 className=" font-bold">{greenCandyCount}\{candyCount.green < greenCandyCount ? candyCount.green : greenCandyCount}</h5>
      </div>
    </div>
    <div className="hidden lg:flex">
      <h5 className=" font-bold"> Score :{scoreGame}</h5>
    </div>
   
   </div>
       <div className={` gameContainer w-full h-fit md:w-[600px] md:h-[600px] relative flex justify-center items-center  flex-wrap backdrop-blur-lg ${levelComplete ? 'explode' : ''}`}>
       <div ref={candyGridRef} className="candyGrid grid grid-cols-8 gap-1.5">
        {
          currentCandies.map( (candyColor, index) => (

            <img 
            key={index}
             src={candyColor}
              alt={candyColor}
               width={75}
               height={75}
               className=' candy border border-slate-50 border-opacity-20 cursor-pointer'
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

        {
         levelComplete && <div className=' fixed top-50 left-50  z-10 '>
          <div className='flex flex-col justify-center items-center space-y-7'>
          <p className="nextLevelMessage  text-3xl  md:text-5xl  "> you Win</p>
           <button className='text-white bg-rose-900 flex justify-center items-center px-3 rounded-md py-2' onClick={resetGame}><GrPowerReset className=' mr-2'/>reset Game </button>
           </div>
          </div>
        }
      


       </div>
    
    
     {
      
       showMenu && ( 
       
 
    <div className="fixed top-50 right-50 bg-white w-80 rounded-md z-20  h-80 p-4 ">
    <span className=' absolute text-rose-900 top-1 right-1 text-xl cursor-pointer' onClick={()=> setShowMenu(false)}><IoCloseSharp/></span>
    <div className=" w-full h-full flex flex-col justify-center items-center space-y-5 ">

   
    <div className=" flex space-y-2 flex-col ">
    <span className=" font-semibold"> Background :</span>
    <div className={`  flex justify-center items-center   px-4   space-x-5  `}>
   <img className={`${backgroudPage === 'bgImage1' ? 'border-2 border-rose-900' : ""}  cursor-pointer`} src={bgImage1} width={100} onClick={changeBackground} alt="bgImage1" />
    <img className={`${backgroudPage === 'bgImage2' ? 'border-2 border-rose-900' : ""}  cursor-pointer`} src={bgImage2} width={100} onClick={changeBackground} alt="bgImage2" />
   </div>
   </div>
  <ul className='  flex flex-col justify-center items-center space-y-1'>
    <li ><button className='text-white bg-rose-900 flex justify-center items-center px-3 rounded-md py-2' onClick={resetGame}><GrPowerReset className=' mr-2'/>reset Game </button></li>
    <li ><button className='text-white bg-rose-900 flex justify-center items-center px-3 rounded-md py-2' onClick={() => navigate("/")}><FaHome className=' mr-2'/>go start Page </button></li> 
  </ul>
  </div>
  </div>
       )
}
 <audio ref={soundaudioRef} src={sound}  />
 <audio ref={candiesSoundAudioRef} src={candiesSound}  />
 <audio ref={winSoundAudioRef} src={winSound}  />
    </div>
  )
}

export default GamePage;
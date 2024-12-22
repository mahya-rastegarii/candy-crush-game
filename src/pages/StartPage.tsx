import React, { useEffect, useRef } from 'react';

import sound from "../assets/audio/candyCrushMusic.mp3";
import bgImage from "../assets/img/bachgroundCandyCrushGame.jpg";
import { useNavigate } from 'react-router-dom';


  
const StartPage: React.FC = () => {

  const  navigate = useNavigate();
    const audioRef = useRef<HTMLAudioElement>(null);
    

   

    const handleStartGame = () => {
        // const audio = audioRef.current;
    //     if (audio){
    //         audio.pause();
    // }
    navigate("/gamePage")
      
      };
  

      
    // useEffect(() => {
    //  function playMusic() {
       
    //         const audio = audioRef.current;
    //      if (audio) {
    //        audio.volume = 0.5; // تنظیم میزان صدا
    //        audio.play();
    //      }
    //    }
    //    playMusic()
    //   }, []);

  return (
    <div
    className=' w-full h-screen object-cover  flex flex-col space-y-6 justify-center items-center'
    style={{backgroundImage:`url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center" 
  }}>


     <h1 className='titlePage font-extrabold text-rose-50  text-6xl'> Candy Crush</h1>
     <button className='bg-rose-700 px-9 hover:scale-110 transform ease-in duration-75 text-xl  py-3 rounded-full shadow-2xl border-2 border-opacity-30 border-white text-white font-extrabold' onClick={handleStartGame}> Start Game</button>
   
     <audio ref={audioRef} src={sound} loop />
    </div>
  )
}

export default StartPage
import React, { useEffect, useRef, useState } from 'react';

import { MdAudiotrack } from "react-icons/md";

import sound from "../assets/audio/candyCrushMusic.mp3";
import bgImage from "../assets/img/bachgroundCandyCrushGame.jpg";
import { useNavigate } from 'react-router-dom';



  
const StartPage: React.FC = () => {

  const  navigate = useNavigate();

  const [soundOn, setSoundOn] = useState<boolean>(false);
  
    const audioRef = useRef<HTMLAudioElement>(null);
    

   

    const handleStartGame = () => {
        const audio = audioRef.current;
        if (audio){
            audio.pause();
    }
    navigate("/gamePage")
      
      };
  

      useEffect(() => {
        
        const playMusic = () => {


          const audio = audioRef.current;
          if (audio && soundOn) {
            audio.volume = 0.5; 
            audio.play().catch((err) => {
              console.log("Audio playback error:", err);
            });
          } else {
            audio?.pause()
          }
        };
    
      
        playMusic();
    
     
        return () => {
          const audio = audioRef.current;
          if (audio && !soundOn) {
            audio.pause();
            audio.currentTime = 0;
          }
        };
      }, [soundOn,audioRef]);  
    
  return (
    <div
    className=' w-full h-screen object-cover  flex flex-col space-y-6 justify-center items-center'
    style={{backgroundImage:`url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center" 
  }}>
     <div className=' absolute top-5 right-5 cursor-pointer border-2 rounded-full border-neutral-900' onClick={() => setSoundOn(!soundOn)}>
        <MdAudiotrack  className=' text-2xl md:text-4xl font-bold text-neutral-900'/>
      {
      !soundOn &&  <div className="absolute top-2 right-2 md:top-3 md:right-3 w-full h-full bg-transparent">
          <div className="absolute inset-0 transform rotate-45 border-t-4 border-neutral-900"></div>
        </div>
      }
      </div>

     <h1 className='titlePage font-extrabold text-rose-50 text-4xl md:text-6xl'> Candy Crush</h1>
     <button className='animate-slide-up bg-rose-700 px-9 hover:scale-110 transform ease-in duration-75 text-lg md:text-xl  py-3 rounded-full shadow-2xl border-2 border-opacity-30 border-white text-white md:font-extrabold' onClick={handleStartGame}> Start Game</button>
   
     <audio ref={audioRef} src={sound} loop />
    </div>
  )
}

export default StartPage
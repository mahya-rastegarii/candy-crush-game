
import React, { useState } from 'react'


export default function PageBackdrop({showMenu, setShowMenu}) {

 
  
 
  return (
    <div className={` ${showMenu ? 'w-screen' : "w-0"}  h-full bg-black absolute top-0 left-0 opacity-60 z-10 `} onClick={() => setShowMenu(false)}>
     
    </div>
  )
}

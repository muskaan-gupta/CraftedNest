"use client"
import { useState } from "react";

export default function Menu() {
    const Menu=() =>{
        const [open, setOpen]= useState(false)
    }
  return (
    <div > <img src="../../public/menu.png" 
        alt="Menu" width={28} height={28}  
        className="cursor-pointer" 
        onClick={()=> setOpen((prev) => !prev)}/>
        {
            open && (
            <div>

            </div>)
        }


    </div>
  );
}
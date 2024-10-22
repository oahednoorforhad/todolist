import Particles from "@/components/ui/particles";
import ToDoList from "./ToDoList";
import { useEffect, useState } from "react";


export default function Home() {
  
  return (
    <div className="h-screen w-full font-mono bg-foreground text-background flex items-center justify-center justify-items-center ">
      <ToDoList />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={100}
        refresh
      />
    </div>
  );
}

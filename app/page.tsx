"use client"
import Particles from "@/components/ui/particles";
import ToDoList from "./ToDoList";
import { useState } from "react";
import AuthForm from "./AuthForm";

export default function Home() {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle authentication completion
  const handleAuth = () => {
    setIsAuthenticated(true); // Set authenticated to true after auth success
  };
  const handleLogout = () => {
    console.log("handle sign out triggered")
    setIsAuthenticated(false); // Set authenticated to false after logout
  };
  return (
    <div className="h-screen w-full font-mono bg-foreground text-background flex items-center justify-center justify-items-center relative">
      {/* Conditionally render AuthForm or ToDoList */}
      {!isAuthenticated ? (
        <AuthForm onAuthSuccess={handleAuth} /> // Pass the success handler to AuthForm
      ) : (
        <ToDoList onLogout={handleLogout} />
      )}

      <Particles className="absolute inset-0" quantity={100} ease={100} refresh />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Props type definition
interface AuthFormProps {
  onAuthSuccess: (data: { username: string; password: string; tasks: string[] }) => void;
}
// Add a prop for the auth success callback
export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState([]); // Example task array
  const [userData, setUserData] = useState([]);
  let flag = 0;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    fetch(`http://localhost:5000/user?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserData(data)
        console.log(data);

        // Simulating authentication logic
        if (isSignUp && !data.userData) {
          const sendObj = {
            username: username,
            email: email,
            password: password,
            tasks: []
          }
          console.log(sendObj);

          fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify(sendObj)
          })
            .then(res => res.json())
            .then(data1 => {
              console.log(data1);
            })
            .catch(error => console.error('Error:', error));
          onAuthSuccess({
            username,
            password,
            tasks: [], // Array of tasks
          });
        } else if (isSignUp && data.userData) {
          // console.log("Sign In Data - Username:", username, "Password:", password);
          flag = 1;
        }
        else if (!isSignUp && data && (data.password == password)) {
          onAuthSuccess({
            username,
            password,
            tasks: data.tasks, // Array of tasks
          })
        }
        else {
          flag = 2;
        }
      })
      .catch(error => console.error('Error:', error));
    // Assuming authentication is successful, trigger the parent callback
    // onAuthSuccess();
  };


  return (
    <div className="flex flex-col items-center justify-center p-10 rounded-xl bg-secondary text-black">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setIsSubmitted(false); // Reset isSubmitted when toggling
          }}
          className="mb-4 text-black"
        >
          {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs p-4 space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <Input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {isSignUp && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        {isSubmitted && (
          <p className="mt-4 text-center text-green-500">
            {isSignUp ? "Username already exists" : "Username or Password does not match..."}
          </p>
        )}
      </form>
    </div>
  );
}

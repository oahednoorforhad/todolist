"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Add a prop for the auth success callback
export default function AuthForm({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Simulating authentication logic
    if (isSignUp) {
      console.log("Sign Up Data - Username:", username, "Email:", email, "Password:", password);
    } else {
      console.log("Sign In Data - Username:", username, "Password:", password);
    }

    // Assuming authentication is successful, trigger the parent callback
    onAuthSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center h-96 w-60 rounded-xl bg-secondary">
      <div className="mb-6">
              <Button
          variant="outline"
          onClick={() => setIsSignUp(!isSignUp)}
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
            {isSignUp ? "Sign Up" : "Sign In"} Form Submitted. Check console for details.
          </p>
        )}
      </form>
    </div>
  );
}
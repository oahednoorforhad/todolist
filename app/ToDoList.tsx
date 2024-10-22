"use client"
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import AnimatedShinyText from '@/components/ui/animated-shiny-text'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import React, { useState } from 'react'
export default function ToDoList(){
    const [tasks, setTasks] = useState(["Get Up", "Freshen Up", "Take Shower", "Go To Uni"])
    const [newTask, setNewTask]=useState("")
    function handleInputChange(event: { target: { value: React.SetStateAction<string> } }) {
        setNewTask(event.target.value)
    }
    function AddTask() {
        if (newTask.trim()!="") {
            setTasks([...tasks, newTask])
            setNewTask("")
        }
    }
    function DeleteTask(index: number) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }
    function moveTaskUp(index: number) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index - 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }
    function moveTaskDown(index: number) {
        if (index <tasks.length) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }
    return (
        <div className="p-10 justify-items-center">
            <div className='pb-20'>
                <AnimatedGradientText>
        <span
          className={cn(
            `text-8xl inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent `,
          )}
        >
          To-Do-List
        </span>
      </AnimatedGradientText>
                
            </div>
            <div className='flex justify-between gap-2 items-center'>
                <input
                    className='text-black w-[310px] h-16 rounded-xl border-black'
                    type="text"
                    placeholder='  Enter a task...'
                    value={newTask}
                    onChange={handleInputChange} />
                
                    <Button
                    className="font-sans font-semibold h-16 rounded-xl"
                onClick={AddTask}>
                    Add
                </Button>
            </div>
            <div>
                <ol>
                {tasks.map((task, index) =>
                    <li className='font-sans font-normal text-xl shadow-lg shadow-violet-500/50 flex justify-end gap-5 items-center p-4 m-2 border-2 rounded-xl border-violet-700'
                        key={index}>
                        <span className="text">{task}</span>
                        <Button
                            className='delete-button'
                        onClick={()=>DeleteTask(index)}>
                            Delete
                        </Button>
                        <Button
                            className='move-button'
                        onClick={()=>moveTaskUp(index)}>
                            ⬆️
                        </Button>
                        <Button
                            className='move-button'
                        onClick={()=>moveTaskDown(index)}>
                            ⬇️
                        </Button>
                    </li>
                )}
            </ol>
            </div>
            
        </div>
    )
  }

import { useState } from 'react'
import { evaluate } from 'mathjs'
import '../All.css'
import { useRef } from 'react';

function Todo() {

  const [tasks, setTasks] = useState([]);

  const addTask = (addedTask) => {
    let tasksCopy = [...tasks];
    tasksCopy.push(addedTask);
    setTasks(tasksCopy);
  }

  const removeTask = (removedTask) => {
    let tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    setTasks(tasksCopy);
  }

  const taskInputRef = useRef(null);

  const handleClick = e => {
    addTask(taskInputRef.current.value);
  }

  return (
    <div className="main todo">
      <h2>To-do List</h2>
      <div className="taskHolder">
        {tasks.map((task, index) => {
          return <ListedTasks key={index} textContent={task} removeTask={() => removeTask(index)}/>
        })}
      </div>
      <input
        type="text"
        id="taskInput"
        name="taskInput"
        ref={taskInputRef}
      />
      <button onClick={handleClick}>Add task</button>
    </div>
  )
}

export const ListedTasks = (props) => {
  return (
    <div class="listedTask">
      <p>{props.textContent}</p>
      <button onClick={props.removeTask}>x</button>
    </div>
  )
}

export default Todo;
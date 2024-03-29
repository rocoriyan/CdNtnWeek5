import { useState } from 'react'
import '../All.css'
import { useRef } from 'react';

function Todo() {

  const [tasks, setTasks] = useState([]);

  const addTask = (addedTask) => {
    let tasksCopy = [...tasks];
    tasksCopy.push(addedTask);
    setTasks(tasksCopy);
  }

  const removeTask = (index) => { //remove task
    let tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    setTasks(tasksCopy);
  }

  const taskInputRef = useRef(null);

  const handleClick = e => {
    e.preventDefault();
    if(taskInputRef.current.value != ""){ //if not empty
      addTask(taskInputRef.current.value); //add task
      taskInputRef.current.value = ""; //clear task input bar
    }
  }

  return (
    <div className="main todo">
      <h2>To-do List</h2>
      <div className="todoDivHolder">
        <div className="taskSpacer"/>
        <div className="taskHolder">
          {tasks.map((task, index) => {
            return <ListedTasks key={index} textContent={task} removeTask={() => removeTask(index)}/>
          })}
        </div>
        <div className="addTaskSect">
          <form onSubmit={handleClick}>
            <input
              type="text"
              id="taskInput"
              name="taskInput"
              ref={taskInputRef}
            />
            <button type="submit">Add task</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export const ListedTasks = (props) => {
  return (
    <div className="listedTask">
      <p>• {props.textContent}</p>
      <button type="button" onClick={props.removeTask}>X</button>
    </div>
  )
}

export default Todo;
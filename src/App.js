import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])
    useEffect(()=>{
      const getTasks = async ()=>{
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }

      getTasks()
    },[])

    // fetch Tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      return data
    }

    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }
  // adding task
  const addTask=async (task)=>{
    const res = await fetch('http://localhost:5000/tasks'
    , {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(task),
    })

    const data =await res.json()

    setTasks([...tasks, data])
    // const id = Math.floor(Math.random()*1000)+1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

    // delete task function
  const deleteTask = async (id) =>{
    await fetch (`http://localhost:5000/tasks/${id}`
    , {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task)=> task.id !== id))
  }

  // toggle reminder
  const toggleReminder = async (id)=>{
    const taskToToggle = await fetchTask(id)

    const updatedTask = {...taskToToggle, reminder : !taskToToggle.reminder}
    // updating the task
    const res = await fetch(`http://localhost:5000/tasks/${id}`
    , {
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    // fetching the updated task
    const data = await res.json()

    // resetting the tasks with updated tasks
    setTasks(tasks.map((task) => task.id === id ?
    {...task, reminder : data.reminder} : task))
  }

  return (
    <Router>
    <div className="container">
      <Header 
      onAdd={()=> setShowAddTask(!showAddTask)}
      showAdd = {showAddTask}/>

      {showAddTask ? <AddTask onAdd = {addTask}/> : ""}

      {tasks.length > 0 ?
        <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/> :
        <p style={{color:'green'}}>'No Tasks to show'</p> }
      <Route path='About' component={About}/>
      <Footer/>
    </div>
    </Router>
  )
}

export default App;

// class App extends React.Component{
//   render(){
//     return <h1>Hello from a class</h1>
//   }
// }
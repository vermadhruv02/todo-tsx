import './App.css'
import Form from './components/Form'
import TableData from './components/TableData'
import React, { useEffect, useState } from 'react'
import axios from "axios";


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    return () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/allTask`)
        .then((tasks) => {
          setTodos(tasks.data);
          console.log(typeof tasks.data, tasks.data);
        })
          .catch((err) => console.log(err));
        }
  }, []);

  // const [data,setData] = useState([]);
  const onAdd = (data)=>{
    console.log(data); 
    setTodos(prevTodos => [...prevTodos, data]);
    console.log(todos);
  }

  return (
    <div className='flex justify-center items-center flex-col'>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"  > Todo using MERN in TypeScript</h1>

      <Form onAdd={onAdd} />
      <TableData todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App

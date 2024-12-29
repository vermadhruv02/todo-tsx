import './App.css'
import Form from './components/Form'
import TableData from './components/TableData'
import { useEffect, useState } from 'react'
import axios from "axios";

type Todo = {
  id: number;
  text: string;
  dueDate: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // return () => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/allTask`)
        .then((tasks) => {
          setTodos(tasks.data);
          console.log(typeof tasks.data, tasks.data);
        })
          .catch((err) => console.log(`Fetching data From backend Error: ${err}`));
        }
  // }
  , []);

  // const [data,setData] = useState([]);
  const onAdd = (data: any)=>{
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

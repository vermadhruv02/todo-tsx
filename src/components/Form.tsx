import React, { useState } from 'react'
import { Input } from './ui/input'
import { DatePicker } from './Date';
import { Button } from './ui/button';
import axios from 'axios';

const Form = ({onAdd}) => {
  
  const [task, setTask] = useState('');
  const [date, setDate] = React.useState<Date>()
  const url = import.meta.env.VITE_BACKEND_URL;
  
  const handleAddTask = ()=>{

    
    axios.post(url+"/addTask",({task,date}))

    .then((responce)=>{
      onAdd(responce.data);  
      // setData(responce.data);
      // console.log(responce.data);
    })
    .catch(err => console.log(err));

    // console.log(task,date);
    setTask('');
    setDate(undefined);
    
  };
  return (
    <div className="flex py-3 gap-5 flex-col w-[280px]   md:flex-row md:w-full"> 
      <Input type='text' value={task} onChange={e => setTask(e.target.value)} />
      <DatePicker date={date} setDate={setDate}/>   
      <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  )
}

export default Form

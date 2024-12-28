import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "./ui/input";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import React,{ useEffect, useState } from "react";
import axios from "axios";
import UpdateTask from "./UpdateTask";
const url = import.meta.env.VITE_BACKEND_URL;


const TableData = ({todos, setTodos}: any) => {

  const [task, setTask] = useState('');
  const [date, setDate] = React.useState<Date>()


  
  const handleDelete = (todoId: string) => {
    axios.delete(`${url}/delete/${todoId}`).then(() => {
      const updatedTodos = todos.filter((todo :any) => todo._id !== todoId)
      setTodos(updatedTodos)
    });
  };

  const handleUpdate = (todoId: string,task:any,date:any)=>{
    axios.put(`${url}/update/${todoId}`,({task, date}))
    .then(res => {
      setTodos((prevTodos: any) =>
        prevTodos.map((todo: any) =>
          todo.id === todoId ? res.data : todo
        )
      );
        console.log(res.data);  
    })
    .catch(err => console.log(err))
    // console.log('handleUpdate called');
    // console.log(todoId,task,date);
  }

  return (
    <Table>
      <TableCaption>A list of your all tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] md:w-[20px] text-center">
            CheckBox
          </TableHead>
          <TableHead className="text-center">Task</TableHead>
          <TableHead className="text-center">Due Date</TableHead>
          <TableHead className="w-[50px] md:w-[100px] text-center">
            Delete
          </TableHead>
          <TableHead className="w-[50px]md:w-[100px] text-center">
            Update
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo: any) => {
          const year = todo.dueDate.slice(0, 4);
          const month = todo.dueDate.slice(5, 7);
          const dateth = todo.dueDate.slice(8, 10);
          return (
            <TableRow key={todo._id}>
              <TableCell className="font-medium">
                <Input type="checkbox" />
              </TableCell>
              <TableCell>{todo.task}</TableCell>
              <TableCell>{`${dateth} ${month} ${year}`}</TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(todo._id)}
                >
                  <Trash />
                </Button>{" "}
              </TableCell>
              <TableCell className="text-center">
                <UpdateTask handleUpdate={handleUpdate} task={task} setTask={setTask} date={date} setDate={setDate} todoId={todo._id} todoTask={todo.task} todoDueDate={todo.dueDate}/>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableData;

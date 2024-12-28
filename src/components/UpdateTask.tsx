import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";
  
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import { DatePicker } from "./Date";
import { useState } from "react";



const UpdateTask = ({handleUpdate , task, setTask, date, setDate, todoId,todoTask, todoDueDate}:any  ) => {
    // const todoId=todo._id;
    // console.log(todoId , todoDueDate, todoTask);
    // setTask();

    // setDate(todo.dueDate);   
    const [open, setOpen] = useState(false);

    return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button 
      onClick={()=>{console.log(todoId , todoDueDate, todoTask);
        const date1 = new Date(todoDueDate);
        const formattedDate = date1.toString();
        const finaldate = formattedDate.slice(0,8) + String(Number(formattedDate.slice(8,10))-1) + formattedDate.slice(10,);
        console.log(todoDueDate, formattedDate , finaldate);
        setTask(todoTask);
        setDate(finaldate);
      }}
      variant={"outline"}>
        <Edit />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit </DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when
          you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="task" className="text-right">
            Task
          </Label>
          <Input
            id="task"
            value={task} 
            onChange={e => setTask(e.target.value)} 
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">
            Date
          </Label>
          <DatePicker date={date} setDate={setDate}/>
        </div>
      </div>
      <DialogFooter>
        <Button  onClick={()=> {handleUpdate(todoId,task,date);setOpen(false);} }>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default UpdateTask

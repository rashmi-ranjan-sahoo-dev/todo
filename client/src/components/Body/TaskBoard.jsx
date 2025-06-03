import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

function TodoBoard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get("http://localhost:3000/api/v1/todos/todos",{
        headers
        :{
         token:token
        }});
      //  console.log(res.data.todos)
       setTodos(res.data.todos)
       console.log(todos)
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  }

  async function addTodo() {

    const token = localStorage.getItem("token");
    try {
        await axios.post("http://localhost:3000/api/v1/todos/todo", {
        title,
        detail,
        isDone
      },{
        headers:{
            token:token
        }
    }
    )
      setTitle("");
      setDetail("");
      fetchTodos();
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete("http://localhost:3000/api/v1/todos/todo",{ todoId: id });
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  }

//   async function toggleDone(todo) {
//     try {
//       await axios.put("/api/v1/todos/todo", {
//         todoId: todo._id,
//         title: todo.title,
//         detail: todo.detail,
//         isDone: !todo.isDone,
//       });
//       fetchTodos();
//     } catch (err) {
//       console.error("Error updating todo:", err);
//     }
//   }

  return (
    <div className="p-6 max-w-5xl max-h-[600px] mx-auto  overflow-y-auto">
      {/* Add Task */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Type Title Of Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <input
          type="text"
          placeholder="Detail Of Your Task"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addTodo}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          +
        </button>
      </div>

      {/* Todo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
     {todos.map((todo) => {
        return (
          <div key={todo._id} className="border p-4 rounded shadow bg-[#F0D1A8]">
            <div>
                 <p className="font-semibold">{todo.title}</p>
            <p className="text-sm text-gray-600">{todo.detail}</p>
            </div>
            <div>
               <div className="mt-2 text-green-600">
              {todo.isDone ? <MdDone /> : <RxCross1 />}            
            </div>
            <button onClick={deleteTodo(todo._id)}><MdDelete/></button>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default TodoBoard;

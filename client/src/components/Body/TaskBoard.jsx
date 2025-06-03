import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function TodoBoard( { setCompleted, setPending}) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get("http://localhost:3000/api/v1/todos/todos",{
        headers :{ token:token}});
      //  console.log(res.data.todos)
       setTodos(res.data.todos)
       const allTodos = res.data.todos

       const copleted = allTodos.filter(todo => todo.isDone).length
       const pending = allTodos.filter(todo => !todo.isDone).length
       setCompleted(copleted);
       setPending(pending);
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
       setIsDone(false);
      fetchTodos();
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  }

  async function deleteTodo(id) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://localhost:3000/api/v1/todos/todo",{
      headers: { token },
      data: { todoId: id}
      });
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  }

async function toggleDone(todo) {
    const token = localStorage.getItem("token")
    try {
      await axios.put("http://localhost:3000/api/v1/todos/todoToggle",{
      todoId: todo._id,
      isDone: !todo.isDone
    }, {
      headers: { token }
    });
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  }

  function startEditTodo(todo) {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDetail(todo.detail);
    setIsDone(todo.isDone);
  }

  async function updateTodo() {
    const token = localStorage.getItem("token");
    if (!editingTodo) return;

    try {
      await axios.put(
        "http://localhost:3000/api/v1/todos/todo",
        {
          todoId: editingTodo._id,
          title:title,
          detail:detail,
          isDone:isDone,
        },
        {
          headers: { token },
        }
      );
      setEditingTodo(null);
      setTitle("");
      setDetail("");
      setIsDone(false);
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  }

  function cancelEdit() {
    setEditingTodo(null);
    setTitle("");
    setDetail("");
    setIsDone(false);
  }


  return (
    <div className="p-6 max-w-5xl max-h-[600px] mx-auto  overflow-y-auto">
      {/* Add Task */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-6 w-full">
        <input
          type="text"
          placeholder="Title Of Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full sm:flex-1"
        />
        <input
          type="text"
          placeholder="Detail Of Your Task"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="border p-2 rounded w-full sm:flex-1"
        />
       <div className="flex gap-2 mt-2 sm:mt-0">
         <button
           onClick={editingTodo ? updateTodo : addTodo}
           className={`${
             editingTodo ? "bg-blue-500" : "bg-green-500"
           } text-white px-4 py-2 rounded whitespace-nowrap`}
         >
           {editingTodo ? "Update" : "+"}
         </button>
     
         {/* Cancel button (only in edit mode) */}
         {editingTodo && (
           <button
             onClick={cancelEdit}
             className="bg-gray-400 text-white px-4 py-2 rounded whitespace-nowrap"
           >
             Cancel
           </button>
         )}
       </div>
      </div>

      {/* Todo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
     {todos.map((todo) => {
        return (
          <div 
          key={todo._id} 
          className="border p-4 rounded shadow bg-[#F0D1A8] flex justify-between">
            <div>
            <p className="font-semibold">{todo.title}</p>
            <p className="text-sm text-gray-600">{todo.detail}</p>
            </div>
            <div className="grid grid-cols-1 gap-1">
               <button
               onClick={() => toggleDone(todo)}
               className="mt-2 text-green-600 border rounded"
               title="Toggle Done">
               {todo.isDone ? <MdDone /> : <RxCross1 />}            
               </button>
               <button
                  onClick={() => startEditTodo(todo)}
                  className="text-blue-600 text-sm border flex justify-center items-center rounded"
                   >
                  <FaRegEdit/>
                </button>
                <button 
                className="border rounded"
                  onClick={() => deleteTodo(todo._id)}><MdDelete/>
                </button>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default TodoBoard;

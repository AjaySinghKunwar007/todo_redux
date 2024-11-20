import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo ,toggleComplete} from "../features/todoSlice";

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
//   const [isChecked,setIsChecked]= useState(null)
  const handleEditClick = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };
  const handleUpdate = (id) => {
    console.log(editText);

    dispatch(updateTodo({ id, text: editText }));
    setEditId(null);
    setEditText("");
  };
  const handleToggle=(id,completed)=>{
    // setIsChecked(!completed);
    dispatch(toggleComplete({id}))
   
  }

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className={`mt-4 flex justify-between items-center ${todo.completed?  "bg-zinc-800":"bg-[#030303]"}  px-4 py-2 rounded`}
            key={todo.id}
          >
            <div className="flex justify-between items-center gap-4">
              <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={()=>handleToggle(todo.id,todo.completed)}

              />
              {editId === todo.id ? (
                // Show input field if the current todo is being edited
                <input
                  className="text-white bg-zinc-800 outline-none"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.currentTarget.value)}
                />
              ) : (
                // Show text if not being edited
                <span className={`text-white ${todo.completed? "line-through": ""}`}>{todo.text}</span>
              )}
            </div>
            <div className="flex justify-between items-center gap-4">
              {editId === todo.id ? (
                // Show Save button during editing
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="inline-flex w-8 h-8 text-sm text-white border border-black/10 justify-center items-center bg-green-500 hover:bg-green-600 rounded text-md"
                >
                  ✅
                </button>
              ) : (
                // Show Edit button when not editing
                <button disabled={todo.completed}
                  onClick={() => handleEditClick(todo)}
                  className={`inline-flex w-8 h-8 text-sm text-white border border-black/10 justify-center items-center bg-blue-500 hover:bg-blue-600 rounded text-md disabled:opacity-50`}
                >
                  ✏️
                </button>
              )}

              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;

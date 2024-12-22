import { useState, useEffect} from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false)
  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if(todosString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = () => {
    setshowFinished(!showFinished)
    saveToLS();
  }
  const handleEdit = (e, id) => {
    let text = "Are your sure!?";
    if (confirm(text) == true) {
      let t = todos.filter((i) => i.id === id);
      settodo(t[0].todo);
      let newTodos = todos.filter((items) => {
        return items.id !== id;
      });
      settodos(newTodos);
    } else {
      text = "Your ToDo is not deleted!";
    }
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let text = "Are your sure!?";
    if (confirm(text) == true) {
      let newTodos = todos.filter((items) => {
        return items.id !== id;
      });
      settodos(newTodos);
      alert("Your ToDo is deleted!");
    } else {
      alert("Your ToDo is not deleted!");
    }
    saveToLS();
  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS();
  };
  const handleChange = (e) => {
    settodo(e.target.value);
    saveToLS();
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((items) => {
      return items.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS();
  };
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    settodos(todos.map((task) => ({ ...task, isSelected: !selectAll })));
    saveToLS();
  };
  const handleDeleteAll = () => {
    const text = "Are you sure you want to delete all tasks?";
    if (confirm(text) === true && todos.length !== 0) {
      settodos([]); // Clear all tasks
      setSelectAll(false);
      alert("All tasks have been deleted!");
    } else if (todos.length === 0) {
      alert("There are no any todos for delete!");
    } else if (confirm(text) === false) {
      alert("Tasks were not deleted.");
    }
    saveToLS();
  };
  return (
    <>
      <Navbar />
      <div className="m-5 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-400 min-h-[80vh] md:w-1/2">
        <div className="add-TODO my-5">
          <h2 className="text-3xl font-bold my-5 text-center">iDo - Manage your ToDo's at one place</h2>
          <input
            value={todo}
            onChange={handleChange}
            type="text"
            className="w-full px-3 py-1 rounded-lg"
          />
          <button
          disabled={todo.length <= 3}
            onClick={handleAdd}
            className="bg-slate-700 disabled:bg-slate-300 hover:bg-slate-800 px-6 py-1 text-white rounded-md  hover:font-bold transition-all duration-300 my-4 w-1/4 text-center" 
          >
            Add
          </button>
        </div>
        <div className="w-full flex justify-between md:w-4/4">
          <h1 className="text-lg font-bold ">Your ToDo's</h1>
          <div className="font-bold text-lg">
            Select All
            <input
              className="mx-5 w-4 cursor-pointer"
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            {selectAll === true && (
              <button
              onClick={handleDeleteAll}
              className="bg-red-500 hover:bg-red-700 px-3 py-1 text-white rounded-md mx-2 hover:font-bold transition-all duration-300"
              >
                Delete All
              </button>
            )}
          </div>
        </div>
            <input type="checkbox" onChange={toggleFinished} className="cursor-pointer" checked={showFinished} name="" id="Show finished" />
            <label className="mx-2" htmlFor="Show finished">Show finished</label>
            <hr />
        <div className="todos w-full">
          {todos.length === 0 && (
            <div className="font-bold m-5">No todos to diplay</div>
          )}
          {todos.map(items => {
            return (showFinished || !items.isCompleted) && (
              <div key={items.id} className="w-full todo flex md:w-4/4 justify-between">
                <div className="flex gap-5 align-middle items-center font-bold text-lg w-4/4">
                  <input
                    className="w-4 cursor-pointer"
                    checked={items.isSelected}
                    onChange={handleCheckBox}
                    type="checkbox"
                    value={todo.isCompleted}
                    name={items.id}
                    id=""
                  />
                  <div className={items.isCompleted ? "line-through" : ""}>
                    {items.todo}
                  </div>
                </div>
                <div className="buttons w-2/2 my-3 flex h-full">
                  <button
                    onClick={(e) => {
                      handleDelete(e, items.id);
                    }}
                    className="bg-red-500 hover:bg-red-700 px-3 py-1 text-white rounded-md mx-2 hover:font-bold transition-all duration-300"
                  >
                     <MdDeleteForever />
                  </button>
                  <button
                    onClick={(e) => {
                      handleEdit(e, items.id);
                    }}
                    className="bg-slate-700 hover:bg-slate-600 px-3 py-1 text-white rounded-md mx-1 hover:font-bold transition-all duration-300"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

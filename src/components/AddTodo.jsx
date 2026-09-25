import { useState } from "react"
import api from "../API/axios"

const AddTodo = ({onClose, onCreated}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [degree, setDegree] = useState(1);
    const [type, setType] = useState("Personal");

    const createTodo = async () => {
        if(!title || !description) return;

        try{
            await api.post("/create", {
                title, description, degree, type,
            })
            onCreated()
        }catch(err){
            console.log("Created todo error:", err)
        }
    }
  return (
    <div className="w-92 h-130 rounded-2xl shadow-2xl bg-white fixed bottom-20 z-55 mx-5 overflow-hidden flex flex-col">
      <div className="w-full h-20 bg-gray-100 flex justify-between items-center px-4">
        <h2 className="text-lg text-gray-800 font-bold">New Task</h2>
        <button onClick={onClose} className="px-1 py-0.5 border rounded-[50%] bg-white border-gray-500 text-gray-600">
            <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <form onSubmit={createTodo} className="w-full h-full bg-white p-4 flex flex-col justify-between">
        <label className="w-full flex flex-col gap-3" htmlFor="title">
            <span className="text-gray-600 font-semibold">Task Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className="border-2 border-gray-600 px-3 py-2 rounded-lg outline-0 focus:border-purple-500" id="title" type="text" placeholder="e.g., Morning Standup"/>
        </label>
        <label className="w-full flex flex-col gap-3" htmlFor="description">
            <span className="text-gray-600 font-semibold">Description</span>
            <input value={description} onChange={(e) => setDescription(e.target.value)} required className="border-2 border-gray-600 px-3 py-2 rounded-lg outline-0 focus:border-purple-500" id="description" type="text" placeholder="Add details about  your task..." />
        </label>
        <label className="w-full flex flex-col gap-3">
          <span className="text-gray-600 font-semibold">Priority Level</span>
          <div className="w-full flex justify-between">
            <button type="button" onClick={() => setDegree(1)} className={degree == 1? "flex flex-col items-center gap-0.5 border border-green-500 rounded-lg w-[30%] py-1 pt-2 text-green-500 bg-green-200/50 ": "flex flex-col items-center gap-0.5 border rounded-lg w-[30%] py-1 pt-2 text-gray-500  "}>
              <i className="fa-solid fa-leaf"></i>
              <span>Low</span>
            </button>
            <button type="button" onClick={() => setDegree(2)} className={degree == 2? "flex flex-col items-center gap-0.5 border border-amber-500 rounded-lg w-[30%] py-1 pt-2 text-amber-500 bg-amber-200/50 ": "flex flex-col items-center gap-0.5 border rounded-lg w-[30%] py-1 pt-2 text-gray-500  "}>
              <i className="fa-solid fa-bolt"></i>
              <span>Medium</span>
            </button>
            <button type="button" onClick={() => setDegree(3)} className={degree == 3? "flex flex-col items-center gap-0.5 border border-rose-600 rounded-lg w-[30%] py-1 pt-2 text-rose-600 bg-rose-200/50 ": "flex flex-col items-center gap-0.5 border rounded-lg w-[30%] py-1 pt-2 text-gray-500  "}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>High</span>
            </button>
          </div>
        </label>
        <label className="w-full flex flex-col gap-3">
          <span className="text-gray-600 font-semibold">Task Type</span>
          <div className="w-full flex justify-between">
            <button type="button" onClick={() => setType("Study")} className={type == "Study" ? "px-2 py-1 rounded-full font-semibold shadow-xl text-white bg-black" : "px-2 py-1 rounded-full font-semibold shadow-xl"}>
              <i className="fa-solid fa-book mr-1 text-amber-300"></i>
              <span>Study</span>
            </button>
            <button type="button" onClick={() => setType("Work")} className={type == "Work" ? "px-2 py-1 rounded-full font-semibold shadow-xl text-white bg-black" : "px-2 py-1 rounded-full font-semibold shadow-xl"}>
              <i className="fa-solid fa-briefcase mr-1 text-indigo-500"></i>
              <span>Work</span>
            </button>
            <button type="button" onClick={() => setType("Personal")} className={type == "Personal" ? "px-2 py-1 rounded-full font-semibold shadow-xl text-white bg-black" : "px-2 py-1 rounded-full font-semibold shadow-xl"}>
              <i className="fa-solid fa-user mr-1 text-emerald-400"></i>
              <span>Personal</span>
            </button>
          </div>
        </label>
        <button className="w-full bg-black text-white text-xl font-semibold py-3 rounded-xl transition-transform duration-200 ease-in-out active:scale-95">+ Create Task</button>
        
      </form>
    </div>
  )
}

export default AddTodo

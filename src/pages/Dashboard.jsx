import { useEffect, useState } from "react"
import Header from "../components/Header"
import api from "../API/axios.js"
import Progress from "../components/Progress.jsx"
import Filter from "../components/Filter.jsx"
import Todo from "../components/Todo.jsx"
import AddTodo from "../components/AddTodo.jsx"

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [todayTodos, setTodayTodos] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [showAdd, setShowAdd] = useState(false)
  const filteredTodos = filter == "ALL"? todayTodos : todayTodos.filter((t) => t.type == filter)

  const fetchData = async () => {
    try{
      //user
      const meRes = await api.get("/auth/me");
      setUser(meRes.data);

      // todos Grouped
      const todosRes = await api.get("/");
      const grouped = todosRes.data;

      // bugungi sana
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth()+1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const todayKey = `${y}-${m}-${day}`;
      setTodayTodos(grouped[todayKey] || [])
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=> {
    fetchData()
    
  },[])

  // hisob kitoblar
  const total = todayTodos.length;
  const done = todayTodos.filter(t => t.complated).length;
  const left = total-done;
  const percent = total == 0 ? 0 : Math.round((done/total)*100)


  return (
    <div className="w-full min-h-screen pt-32 flex flex-col">
      <Header id={user?._id} username={user?.username} avatar={user?.avatar} onUpdated={fetchData}/>
      <Progress total={total} done={done} left={left} percent={percent}/>
      <Filter active={filter} onChange={setFilter}/>
      {filteredTodos.length == 0 ? (
        <div className="text-center pt-4 text-xl font-semibold text-gray-500">No Tasks Yet</div>
      ):(
        <div className="w-full px-6 flex flex-col gap-4">
          {filteredTodos.map((todo) => (
            <Todo onChanged={fetchData} key={todo._id} id={todo._id} title={todo.title} description={todo.description} complated={todo.complated} degree={todo.degree} time={todo.time} />
          ))}
        </div>
      )}
      {!showAdd && (
        <button onClick={() => setShowAdd(true)} className="fixed left-44 bottom-2 z-60 text-2xl text-white font-bold px-3.5 shadow-lg  py-3 rounded-full bg-purple-700 transition-transform duration-200 ease-in-out active:scale-95">
          <i className="fa-solid fa-plus"></i>
        </button>
      )}
      {showAdd && (
        <AddTodo onClose={() => setShowAdd(false)} onCreated={() => { fetchData(); setShowAdd(false)}} />
      )}
      
    </div>
  )
}

export default Dashboard

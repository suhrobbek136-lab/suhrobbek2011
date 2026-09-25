import { useMemo, useState, useEffect } from "react";
import api from "../API/axios";
import Todo from "../components/Todo";

// ===== Helpers =====
const formatDate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}; // YYYY-MM-DD

const monthNames = [
  "Yanvar","Fevral","Mart","Aprel","May","Iyun",
  "Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"
];

const weekNames = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

const getDaysOfMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  let startDay = firstDayOfMonth.getDay(); 
  // JS: 0=Yakshanba, 1=Dushanba, ..., 6=Shanba

  // Bizda hafta Dushanbadan boshlanadi, shuning uchun moslaymiz:
  // 0 (Yakshanba) -> 6
  // 1 (Dushanba)  -> 0
  // 2 -> 1 ...
  startDay = (startDay + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const arr = [];

  // Oy boshlanishigacha bo‘sh joylar
  for (let i = 0; i < startDay; i++) {
    arr.push(null);
  }

  // Oy kunlari
  for (let i = 1; i <= daysInMonth; i++) {
    arr.push(new Date(year, month, i));
  }

  return arr;
};


// ===== Component =====
// groupedTodos prop shunaqa ko‘rinishda keladi:
// {
//   "2026-02-15": [ {..}, {..} ],
//   "2026-02-16": [ {..}, {..}, {..} ]
// }
export default function History() {
  const [groupedTodos, setGroupedTodos] = useState({})
  const getTodos = async ()=> {
      try{
        const todos = await api.get("/")
        setGroupedTodos(todos.data)
      }catch(err){
        console.log("history error",err)
      }
    }
  useEffect(()=>{
    getTodos()
  },[])
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(formatDate(today));

  const days = useMemo(() => getDaysOfMonth(currentMonth), [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const todosOfDay = groupedTodos[selectedDate] || [];

  const handleDownload = async () => {
    try {
      const response = await api.get("/auth/report", {responseType: "blob"});
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url;
      link.setAttribute("download", "Report.pdf")
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      alert("Hisobotni yuklab bo'lmadi")
    }
  }
  const handleDownloadDocx = async () => {
    try {
      const response = await api.get("/auth/docxreport", {responseType: "blob"});
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url;
      link.setAttribute("download", "Reportdocx.docx")
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      alert("Hisobotni yuklab bo'lmadi")
      console.log(err)
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* ===== Header ===== */}
      <div className="p-4 bg-gradient-to-b from-[#7c3aed] to-[#4338ca] text-white rounded-b-3xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">History</h2>

          
        </div>

        {/* Month switch */}
        <div className="flex items-center justify-center gap-6 mb-3">
          <button onClick={prevMonth} className="text-2xl">‹</button>
          <div className="text-xl font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button onClick={nextMonth} className="text-2xl">›</button>
        </div>

        {/* Week names */}
        <div className="grid grid-cols-7 text-center text-sm opacity-90 mb-2">
          {weekNames.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>

        {/* Days row */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, idx) => {
            if (!d) {
              // bo‘sh katak
              return <div key={idx}></div>;
            }

            const dayStr = formatDate(d);
            const isActive = dayStr === selectedDate;
            const isToday = dayStr === formatDate(today);

            return (
              <button
                key={dayStr}
                onClick={() => setSelectedDate(dayStr)}
                className={`py-2 rounded-full text-sm font-semibold transition
                  ${
                    isActive
                      ? "bg-white text-[#4338ca]"
                      : "bg-white/20 text-white"
                  }
                  ${isToday && !isActive ? "ring-2 ring-white/70" : ""}
                `}
              >
                {d.getDate()}
              </button>
            );
          })}

        </div>
      </div>

      {/* ===== Todos of selected day ===== */}
      <div className="flex flex-col gap-3 p-4">
        {todosOfDay.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No Todos this day
          </p>
        ) : (
          todosOfDay.map((todo) => (
            // Bu joyda xohlasang o‘zingning <TodoCard /> componentingni qo‘yasan
            <Todo key={todo._id} id={todo._id} title={todo.title} description={todo.description} complated={todo.complated} degree={todo.degree} time={todo.time} />
          ))
        )}
      </div>
      <button onClick={() => handleDownload()} className="">Report</button>
      <button onClick={() => handleDownloadDocx()} className="">ReportDOCX</button>
    </div>
  );
}

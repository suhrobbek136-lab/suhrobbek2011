
const Filter = ({active, onChange}) => {
    const btnClass = (type) => `px-4 py-1 rounded-2xl bg-amber-600 whitespace-nowrap shadow-xl text-lg font-semibold transition-transform duration-200 ease-in-out active:scale-95 ${active == type? "bg-black text-gray-200" : "bg-white text-gray-800"}`;
  return (
    <div className="px-6 py-3 flex flex-nowrap overflow-x-auto scroll-smooth gap-3">
      <button onClick={() => onChange("ALL")} className={btnClass("ALL")}>All Tasks</button>
      <button onClick={() => onChange("Study")} className={btnClass("Study")}>
        <i className="fa-solid fa-book mr-1 text-amber-300"></i>
        <span>Study</span>
      </button>
      <button onClick={() => onChange("Work")} className={btnClass("Work")}>
        <i className="fa-solid fa-briefcase mr-1 text-indigo-500"></i>
        <span>Work</span>
      </button>
      <button onClick={() => onChange("Personal")} className={btnClass("Personal")}>
        <i className="fa-solid fa-user mr-1 text-emerald-400"></i>
        <span>Personal</span>
      </button>
    </div>
  )
}

export default Filter

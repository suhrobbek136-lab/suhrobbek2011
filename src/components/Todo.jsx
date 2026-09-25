import api from "../API/axios"

const Todo = ({onChanged, id, title, description, complated, degree, time}) => {
    const bg = ()=> {
        if(degree == 1){
            return "bg-green-400 relative w-full h-45 rounded-2xl overflow-hidden shadow-2xl "
        }else if(degree == 2){
            return "bg-amber-400 relative w-full h-45 rounded-2xl overflow-hidden shadow-2xl "
        }else{
            return "bg-rose-600 relative w-full h-45 rounded-2xl overflow-hidden shadow-2xl "
        }
    }

    // delete
    const handleDelete = async () => {
        try{
            await api.delete(`/todo/${id}`);
            onChanged();
        }catch(err){
            console.log("Delete error:", err)
        }
    };
    // update
    const handleToggleComplate = async () => {
        try{
            await api.put(`/todo/${id}`, {
                complated: !complated,
            });
            onChanged();
        }catch(err){
            console.log("Update error:", err)
        }
    }
  return (
    <div className={bg()}>
      <div className="h-full w-full bg-white z-30 absolute left-2 px-4 py-3 pr-6 flex flex-col justify-between ">
        <div className="flex w-full justify-between">
            {degree ==1? (
            <span className="px-2 py-1 border rounded-lg font-semibold text-sm border-green-400/50 text-green-400 bg-green-100/50">Low Priority</span>
        ): degree == 2? (
            <p className="px-2 py-1 border rounded-lg font-semibold text-sm border-amber-500/50 text-amber-500  bg-amber-100/50 ">Medium Priority</p>
        ):(
            <span className="px-2 py-1 border rounded-lg font-semibold text-sm border-rose-600/50 text-rose-600 bg-rose-100/80">Hight Priority</span>
        )}
        <button onClick={handleDelete} className="text-lg text-gray-500 hover:text-rose-600 relative z-60 transition-transform duration-200 ease-in-out active:scale-95">
            <i className="fa-solid fa-trash-can"></i>
        </button>
        </div>
        <h1 className="text-xl text-gray-800 font-semibold hover:text-purple-600">{title}</h1>
        <p className="text-gray-500 capitalize">{description}</p>
        <div className="flex justify-between">
            <div className="flex gap-2 items-center text-gray-500 text-sm">
                <i className="fa-regular fa-clock"></i>
                {time}
            </div>
            <button onClick={handleToggleComplate} className="text-lg text-green-400 relative z-60 transition-transform duration-200 ease-in-out active:scale-95">
                <i className="fa-solid fa-calendar-check"></i>
            </button>
        </div>
      </div>
      {complated? (
        <div className="absolute w-full h-full bg-gray-400/50 z-40 pointer-events-none"></div>
      ): null}
    </div>
  )
}

export default Todo

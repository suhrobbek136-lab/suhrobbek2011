import { useEffect, useState } from 'react'
import api from '../API/axios.js';

const Header = ({id, username, avatar, onUpdated}) => {
    const [sana, setSana] = useState("");
    const [toggle, setToggle] = useState(false)
    useEffect(()=> {
        const today = new Date();
        const weekDay = () => {
          const days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
          return days[today.getDay()];
        };
        const monthShort = () => {
          const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
          return months[today.getMonth()];
        };
        const dayNumber = today.getDate();
        setSana(`${weekDay()}, ${monthShort()} ${dayNumber}`);
    }, [])
    const logOut =()=> {
    localStorage.removeItem("tokenCT")
    window.location.href = "/"
  }
    const UploadImage = async (file) => {
      try {
        const imageForm = new FormData();
        imageForm.append("image", file);
        await api.post(`/auth/image/${id}`, imageForm)
        onUpdated();
        alert("Rasm yangilandi")
      } catch (err) {
        console.log(err);
        alert("Rasmni yangilab bo'lmadi")
      }
    }
  return (
    <div className="w-full h-26 fixed z-90 top-0 left-0 right-0 px-6 pt-8 flex justify-between bg-white shadow-2xl ">
      <div >
        <h1 className='text-lg font-semibold text-[#7C3AED]'>{sana}</h1>
        <h1 className='text-2xl font-bold capitalize'>{username || "Quick Tasks"}</h1>
      </div>
      {avatar? (
        <img onClick={() => setToggle(!toggle)} src={avatar} alt="avatar" className='relative z-60 w-15 h-15 rounded-full object-cover transition-transform duration-200 ease-in-out active:scale-95' />
      ):(
        <div onClick={() => setToggle(!toggle)} className='relative z-60 w-15 h-15 rounded-full bg-gray-300 transition-transform duration-200 ease-in-out active:scale-95'></div>
      )}
      {toggle? (
        <div className="flex absolute right-26 z-50 gap-1.5">
          <button onClick={logOut} className='w-15 h-15 rounded-full shadow-lg inset-shadow-lg  flex justify-center items-center text-xl bg-white transition-transform duration-200 ease-in-out active:scale-95'>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
          <input className='hidden' type="file" id='image' onChange={(e) => {UploadImage(e.target.files[0])}} />
          <label htmlFor='image' className='w-15 h-15 rounded-full shadow-lg inset-shadow-lg  flex justify-center items-center text-xl bg-white transition-transform duration-200 ease-in-out active:scale-95'>
            <i className="fa-regular fa-camera"></i>
          </label>
        </div>
        
      ):(
        <button onClick={logOut} className='absolute right-6 z-50 w-15 h-15 rounded-full shadow-lg inset-shadow-lg  flex justify-center items-center text-xl bg-white transition-transform duration-200 ease-in-out active:scale-95'>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      )}
    </div>
  )
}

export default Header

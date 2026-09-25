import { useState } from "react";
import api from "../API/axios";
import {useNavigate} from "react-router-dom"

const Register = () => {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigator = useNavigate()

  const submit = async (e) => {
    e.preventDefault();
    setError("")

    try{
      await api.post("/auth/register", {
        username,
        email,
        password
      })
      alert("Hisob muvaffaqiyatli yaratildi!")
      setTimeout(()=> {
        window.location.href = "/login"
      }, 1000)
    }catch(err){
      if(err.response && err.response.data?.message){
        setError(err.response.data.message)
      }else{
        setError("Bunday foydalanuvchi allaqachon mavjud")
      }
    }
  }
  return (
    <div className='container-md h-screen flex flex-col items-center justify-center gap-y-16'>
      <div className="w-75 flex flex-col gap-5 ">
        <h1 className='text-center text-[#5D73EC] font-bold text-4xl '>Hisobga Yaratish</h1>
        <p className='text-center text-gray-800 text-xl font-semibold'>Hush kelibsiz, sizni ko'rganimizdan hursandmiz.</p>
      </div>
      <form onSubmit={submit} className='w-75 flex flex-col gap-4 '>
        <input required onChange={(e) => setUserName(e.target.value)} type="text" placeholder='UserName' className='w-75 px-4 py-3 shadow-lg border-2 outline-none focus:border-[#5d73ec] transition border-gray-500/50 rounded-lg bg-gray-200'/>
        <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='w-75 px-4 py-3 shadow-lg border-2 outline-none focus:border-[#5d73ec] transition border-gray-500/50 rounded-lg bg-gray-200'/>
        <input required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='w-75 px-4 py-3 shadow-lg border-2 outline-none focus:border-[#5d73ec] transition border-gray-500/50 rounded-lg bg-gray-200'/>
        <p className='text-center text-red-600 w-75 h-6'>{error}</p>
        <button className='text-lg text-white font-semibold w-75 py-3 bg-[#5d73ec] rounded-lg shadow-lg shadow-[#5d73ec] transition-transform duration-200 ease-in-out active:scale-95'>Sign up</button>
      </form>
      <button onClick={() => navigator("/login")} className='text-gray-800 font-semibold text-lg cursor-pointer hover:text-[#5D73EC] transition-transform duration-200 ease-in-out active:scale-95'>Allaqachon hisob bormi? Kirish</button>
    </div>
  )
}

export default Register

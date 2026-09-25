import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../API/axios.js"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigator = useNavigate()

    const submit =async (e) => {
        e.preventDefault();
        setError("")

        try{
            const res = await api.post("/auth/login", {
                email,
                password,
            })

            localStorage.setItem("tokenCT", res.data.token)
            window.location.href = "/home"
        }catch(err){
            if(err.response && err.response.data?.message){
                setError(err.response.data.message)
            }else{
                setError("Email yoki parol noto'gri")
            }
        }
    }

  return (
    <div className='container-md h-screen flex flex-col items-center justify-center gap-y-16'>
      <div className="w-75 flex flex-col gap-5 ">
        <h1 className='text-center text-[#5D73EC] font-bold text-4xl '>Hisobga kirish</h1>
        <p className='text-center text-gray-800 text-xl font-semibold'>Hush kelibsiz, sizni ko'rganimizdan hursandmiz.</p>
      </div>
      <form onSubmit={submit} className='w-75 flex flex-col gap-4 '>
        <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' className='w-75 px-4 py-3 shadow-lg border-2 outline-none focus:border-[#5d73ec] transition border-gray-500/50 rounded-lg bg-gray-200'/>
        <input required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='w-75 px-4 py-3 shadow-lg border-2 outline-none focus:border-[#5d73ec] transition border-gray-500/50 rounded-lg bg-gray-200'/>
        <p className='text-center text-red-600 w-75 h-6'>{error}</p>
        <button className='text-lg text-white font-semibold w-75 py-3 bg-[#5d73ec] rounded-lg shadow-lg shadow-[#5d73ec] transition-transform duration-200 ease-in-out active:scale-95'>Sign in</button>
      </form>
      <Link to="/forgot-password">Forgot Password ?</Link>
      <button onClick={() => navigator("/register")} className='text-gray-800 font-semibold text-lg cursor-pointer hover:text-[#5D73EC] transition-transform duration-200 ease-in-out active:scale-95'>Hali Hisob yo'qmi? Yaratish</button>
    </div>
  )
}

export default Login

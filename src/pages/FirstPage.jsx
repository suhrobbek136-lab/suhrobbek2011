import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const FirstPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("tokenCT");
    if(token){
      navigate("/home")
    } 
  }, [navigate])
  return (
    <div className="container-md h-screen flex flex-col justify-evenly items-center">
      <img className="w-75" src="/MainIcon.webp" alt="Main icon" />
      <div className="w-75 flex flex-col gap-2">
        <h1 className="text-center font-bold text-[#5D73EC] text-3xl">Cuick Tasks</h1>
        <p className="text-center font-normal text-xl text-gray-800">O'z kuningini reja bilan boshlang Va tartibli hayot kechiring</p>
      </div>
      <div className="w-75 flex justify-between px-2">
        <Link to="/login" className=" text-white rounded-lg text-xl px-6 font-semibold py-3 bg-[#5D73EC] shadow-lg shadow-[#5D73EC] transition-transform duration-150 ease-in-out active:scale-95">Login</Link>
        <Link to="/register" className=" text-gray-800 rounded-lg text-xl px-6 font-semibold py-3 shadow-lg transition-transform duration-150 ease-in-out active:scale-95">Register</Link>
      </div>
    </div>
  )
}

export default FirstPage

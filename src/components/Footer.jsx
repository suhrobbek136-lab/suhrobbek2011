import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <aside className="w-full py-3 px-5">
        <nav className="w-full h-12 flex gap-8 items-center justify-around">
            <NavLink to="/home">
                <i className="fa-solid fa-house text-3xl text-gray-600 transition-transform duration-200 ease-in-out active:scale-95 active:text-[#5d73ec]"></i>
            </NavLink>
            <NavLink to="/history">
                <i className="fa-solid fa-calendar text-3xl text-gray-600 transition-transform duration-200 ease-in-out active:scale-95 active:text-[#5d73ec]"></i>
            </NavLink>
        </nav>
    </aside>
  )
}

export default Footer

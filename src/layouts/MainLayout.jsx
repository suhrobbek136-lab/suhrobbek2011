import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-1 w-full pb-20">
        <Outlet />
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white shadow-[0px_-10px_20px_#00000040]">
        <Footer />
      </div>
    </div>
  );
};


export default MainLayout

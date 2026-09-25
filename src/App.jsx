import AppRouter from "./router/AppRouter"
import { useEffect } from "react";

function App() {
const tg = window.Telegram.WebApp;
useEffect(() => {
  tg.ready();
  tg.expand();
}, []);
  

return( <AppRouter/>)
}

export default App

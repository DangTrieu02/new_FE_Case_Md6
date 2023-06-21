import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/homePage";
import HomeDetail from "./page/home/homeDetail";

function App() {
  
  return (
    <Routes>
      <Route path="" element={<HomePage/>}/>
        <Route path={"home-detail/:id"} element={<HomeDetail/>}/>

    </Routes>
  );
}

export default App;

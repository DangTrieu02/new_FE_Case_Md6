import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/homePage";
import OwnerPage from "./page/owner/showHome";
import EditHome from "./page/home/editHome";
import DetailHome from "./page/home/detailHome";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/owner" element={<OwnerPage/>}/>
      <Route path="/editHome/:id" element={<EditHome/>}/>
      <Route path="/detailHome/:id" element={<DetailHome/>}/>
    </Routes>
  );
}

export default App;

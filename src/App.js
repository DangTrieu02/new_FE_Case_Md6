import "./App.css";
import {Route, Routes} from "react-router-dom";
import HomePage from "./page/homePage";
import EditProfile from "./page/user/editProfile";

function App() {

    return (
        <Routes>
            <Route path="" element={<HomePage/>}/>
            <Route path="/edit" element={<EditProfile />}/>
        </Routes>
    );
}

export default App;

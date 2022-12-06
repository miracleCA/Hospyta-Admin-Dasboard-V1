import './Assets/App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cashflow from "./Pages/Cashflow";
import Userslist from "./Pages/Userslist";
import Doclist from "./Pages/Doclist";
import Consultations from "./Pages/Consultations";
import Vendors from "./Pages/Vendors";
import Vendorsales from "./Pages/Vendorsales";
import Ambulance from "./Pages/Ambulance";
import Broadcast from "./Pages/Broadcast";
import Platformrate from "./Pages/Platformrate";
import Usersinfo from "./Pages/Usersinfo";
import Doctorsinfo from "./Pages/Doctorsinfo";
import Login from "./Pages/Login";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route exact path="/Cashflow" element={ <Cashflow/> } />
        <Route exact path="/Users" element={ <Userslist/> } />
        <Route exact path="/Doctors" element={ <Doclist/> } />
        <Route exact path="/Consultations" element={ <Consultations/> } />
        <Route exact path="/Vendors" element={ <Vendors/> } />
        <Route exact path="/Vendorsales" element={ <Vendorsales/> } />
        <Route exact path="/Ambulance" element={ <Ambulance/> } />
        <Route exact path="/Broadcast" element={ <Broadcast/> } />
        <Route exact path="/platform_rate" element={ <Platformrate/> } />
        <Route exact path="/Broadcast" element={ <Broadcast/> } />
        <Route exact path="/Usersinfo" element={ <Usersinfo/> } />
        <Route exact path="/Login" element={ <Login/> } />
      </Routes>
    </div>
  );
}

export default App;
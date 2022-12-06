import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../Assets/Home.css';
import Sidebar from '../Components/Sidebar';
import Mainsec from '../Components/Mainsec';

function Home() {

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
  })

  return (
    <div className="Home">
        <Sidebar className="col-3"/>
        <Mainsec/>
    </div>
  );
}

export default Home;
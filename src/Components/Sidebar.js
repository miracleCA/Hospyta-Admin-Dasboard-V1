import React, { useState } from 'react';
import '../Assets/Sidebar.css';
import logo from '../Images/Logo.png';
import dash from '../Icons/Dashboard.png';
import dash1 from "../Icons/Dash 1.png"
import cash from '../Icons/Cashflow.png';
import cash1 from '../Icons/Cash1.png';
import users from '../Icons/Users.png';
import users1 from '../Icons/Users 1.png';
import doc from '../Icons/Doctors.png';
import doc1 from '../Icons/Doctors 1.png';
import cons from '../Icons/Consultations.png';
import cons1 from '../Icons/Consult 1.png';
import vend from '../Icons/Vendors.png';
import vend1 from '../Icons/Vendors 1.png';
import vensal from '../Icons/Vendors sales.png';
import vsales1 from '../Icons/Vsales 1.png';
import amb from '../Icons/Ambulance.png';
import amb1 from '../Icons/Amb 1.png';
import broad from '../Icons/Broadcast.png';
import broad1 from '../Icons/Broad 1.png';
import plat from '../Icons/Vector.png';
import plat1 from '../Icons/P rate 1.png';
import med from '../Icons/Med.png';
import med1 from '../Icons/Med rep 1.png';

function Sidebar() {

    const [buttonActive, setButtonActive] = React.useState(false);
    
  return (
    <div className="Sidebar">
        <div className="side">
            <a href="/">
                <img src={logo}/>
            </a>
            <div id="dashnav">
                <div id="links">
                    <a href="/" style={{ color: (buttonActive !== "B" && buttonActive !== "C" && buttonActive !== "D" && buttonActive !== "E" && buttonActive !== "F" && buttonActive !== "G" && buttonActive !== "H" && buttonActive !== "I" && buttonActive !== "J" && buttonActive !== "K" ? "#00BDFF" : "#000000") }} onClick={() => {setButtonActive("A");}}>
                        <img src={ window.location.pathname == "/" && buttonActive !== "B" && buttonActive !== "C" && buttonActive !== "D" && buttonActive !== "E" && buttonActive !== "F" && buttonActive !== "G" && buttonActive !== "H" && buttonActive !== "I" && buttonActive !== "J" && buttonActive !== "K" ? dash : dash1}/>
                        <b>Dashboard</b>
                    </a>
                    <a href="/cashflow" style={{ color: (buttonActive =="B" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("B");}}>
                        <img src={ buttonActive =="B" || window.location.pathname == "/Cashflow" || window.location.pathname == "/cashflow" ? cash1 : cash}/>
                        <b>Cash flow</b>
                    </a>
                    <a href="/users" style={{ color: (buttonActive =="C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("C");}}>
                        <img src={ buttonActive =="C" || window.location.pathname == "/Users" || window.location.pathname == "/users" ? users1 : users}/>
                        <b>Users</b>
                    </a>
                    <a href="/doctors" style={{ color: (buttonActive =="D" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("D");}}>
                        <img src={ buttonActive =="D" || window.location.pathname == "/Doctors" || window.location.pathname == "/doctors" ? doc1 : doc}/>
                        <b>Doctors</b>
                    </a>
                    <a href="/consultations" style={{ color: (buttonActive =="E" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("E");}}>
                        <img src={ buttonActive =="E" || window.location.pathname == "/Consultations" || window.location.pathname == "/consultations" ? cons1 : cons}/>
                        <b>Consultations</b>
                    </a>
                    <a href="/vendors" style={{ color: (buttonActive =="F" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("F");}}>
                        <img src={ buttonActive =="F" || window.location.pathname == "/Vendors" || window.location.pathname == "/vendors" ? vend1 : vend}/>
                        <b>Vendors</b>
                    </a>
                    <a href="/vendorsales" style={{ color: (buttonActive =="G" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("G");}}>
                        <img src={ buttonActive =="G" || window.location.pathname == "/Vendorsales" || window.location.pathname == "/vendorsales" ? vsales1 : vensal}/>
                        <b>Vendor Sales</b>
                    </a>
                    <a href="/ambulance" style={{ color: (buttonActive =="H" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("H");}}>
                        <img src={buttonActive =="H" || window.location.pathname == "/Ambulance" || window.location.pathname == "/ambulance" ? amb1 : amb}/>
                        <b>Ambulance</b>
                    </a>
                    <a href="/broadcast" style={{ color: (buttonActive =="I" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("I");}}>
                        <img src={ buttonActive =="I" || window.location.pathname == "/Broadcast" || window.location.pathname == "/broadcast" ?  broad1 : broad}/>
                        <b>Broadcast Message</b>
                    </a>
                    <a href="/platform_rate" style={{ color: (buttonActive =="J" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("J");}}>
                        <img src={ buttonActive =="J" || window.location.pathname == "/Platform_rate" || window.location.pathname == "/platform_rate" || window.location.pathname == ("/platform_Rate").toUpperCase() || window.location.pathname == ("/Platform_rate").toLowerCase() ? plat1 : plat}/>
                        <b>Platform rate</b>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Sidebar;
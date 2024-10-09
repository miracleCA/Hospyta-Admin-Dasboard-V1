import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../utils/Functions';
import '../Assets/Ambulance.css';
import Sidebar from '../Components/Sidebar';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'

function Ambulance() {
    TabTitle('Ambulance - Admin');

    const Token = window.localStorage.getItem("token");
    const [query, setQuery] = useState("");
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();

    const [totalrev, setTotalrev] = useState();
    const [totalsales, setTotalsales] = useState();
    const [delivered, setDelivered] = useState();
    const [cancelled, setCancelled] = useState();
    const [pending, setPending] = useState();
    /* Ambsum() */;

    useEffect(() => {
        if (!localStorage.getItem('token')) {
        navigate("/login");
        }
    })

  const onSubmitClicked = async (e) => {
    e.preventDefault()

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer" +" " + process.env.token);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: '',
      redirect: 'follow'
    };

    fetch("https://staging.hospyta.com/auth/logout", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        localStorage.clear('token')
            navigate('/login')
      })
      .catch(error => console.log('error', error));
}

const [firstElement, firstElementShow] = useState(true);
const [secondElement, secondElementShow] = useState(false);
const [buttonActive, setButtonActive] = React.useState(false)

    return (
        <div className='Ambulance'>
            <Sidebar/>
            <div className='Ambulancemain'>
                <div className="Topnav">
                    <div id="topnav">
                        <div className="col-7">
                            <div className='col-12'>
                                <span id="pagetitle" style={{ color: (buttonActive !== "B" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("A"); secondElementShow(false);firstElementShow(true)}}>Ambulance</span>
                                <span id="pagetitle" style={{ color: (buttonActive =="B" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("B"); firstElementShow(false);secondElementShow(true)}}>Agent Verification</span>
                            </div>
                        </div>
                        <div className="col-5">
                            <div id="profile">  
                            <span id="proicon">
                                <img id="proimg" src={Bags}/>
                                <div id="userid">
                                <span id="userrole">Admin</span>
                                </div>
                            </span>
                            </div>
                            <div id="power">
                                <button onClick={onSubmitClicked}>
                                <img src={Power}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                { firstElement? 
                    <span id='froww'>
                        <div className='row'>
                            <div className='col-2'>
                                <span id="navspan">
                                    <b id="nvspdata">All Users</b>
                                    <b id="nvspdata2"></b>
                                </span>
                            </div>
                            <div className='col-2'>
                            <span id="navspan">
                                    <b id="nvspdata">Total Requests</b>
                                    <b id="nvspdata2"></b>
                                </span>
                            </div>
                            <div className='col-5' id="lastcol">
                                <span id="navspan">
                                    <b id="nvspdata">Completed</b>
                                    <b id="nvspdata2"></b>
                                </span>
                                <span id="navspan">
                                    <b id="nvspdata">Denied</b>
                                    <b id="nvspdata2"></b>
                                </span>
                                <span id="navspan">
                                    <b id="nvspdata">Accepted</b>
                                    <b id="nvspdata2"></b>
                                </span>
                                <span id="navspan">
                                    <b id="nvspdata">Ongoing</b>
                                    <b id="nvspdata2"></b>
                                </span>
                            </div>
                            <div className='col-3'>
                                <div className='col-6'>
                                    <span id="navspan">
                                        <b id="nvspdata">Total Payments</b>
                                        <b id="nvspdata2"></b>
                                    </span>
                                </div>
                                <div className='col-6'>
                                    <span id="navspan">
                                        <b id="nvspdata">Total Payouts</b>
                                        <b id="nvspdata2"></b>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='row' id="Ambnavrow">
                            <div className='col-6'>
                                <span id='Ambnav'>All</span>
                                <span id='Ambnav'>Completed</span>
                                <span id='Ambnav'>Accepted</span>
                                <span id='Ambnav'>Pending</span>
                                <span id='Ambnav'>Denied</span>
                            </div>
                            <div className='col-6'>
                                <input id='searchbar' 
                                    type="search"
                                    placeholder="&#61442; Search" 
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div id="datatable">
                            <div className='row'>
                                <span id="headrow">User</span>
                                <span id="headrow">Order id</span>
                                <span id="headrow">Ambulance Unit</span>
                                <span id="headrow">Time</span>
                                <span id="headrow">Date</span>
                                <span id="headrow">Pick up</span>
                                <span id="headrow">Drop off</span>
                                <span id="headrow">Payment type</span>
                                <span id="headrow">Status</span>
                                <span id="headrow">Action</span>
                            </div>
                        </div>
                        <div id="space"></div>
                    </span>
                :null}
                { secondElement? 
                    <span id='mcont'>
                            <div className='col-10' id='cont1'>
                                <div className='row' id="nav3">
                                    <div className='col-4'>
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-6'></div>
                                </div>
                                <div id='Vinfo2'>
                                </div>
                            </div>
                            <div className='col-2' id='cont2'>
                                <span id='spancv'>
                                    <span id="title">New Vendors</span>
                                    <span id='figure'>32</span>
                                </span>
                            </div>
                    </span>
                :null}
            </div>
        </div>
  )
}

export default Ambulance

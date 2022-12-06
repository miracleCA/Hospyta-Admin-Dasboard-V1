import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../utils/Functions';
import axios from "axios";
import moment from 'moment';
import cors from "cors"
import '../Assets/Userslist.css';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'
import Sidebar from '../Components/Sidebar';

function Userslist() {
    TabTitle('Patients - Admin');

    const Token = window.localStorage.getItem("token");
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [adata, setAdata] = useState([]);
    const [indata, setIndata] = useState([]);
    const [rev, setRev] = useState([]);
    const navigate = useNavigate();

    const [firstElement, firstElementShow] = useState(true);
    const [secondElement, secondElementShow] = useState(false);
    const [firstElement1, firstElement1Show] = useState(true);
    const [secondElement1, secondElement1Show] = useState(false);
    const [thirdElement1, thirdElement1Show] = useState(false);
    const [buttonActive, setButtonActive] = React.useState(false);
    const [buttonnActive, setButtonnActive] = React.useState(false);

    const [users, setUsers] = useState();
    const [payment, setPayment] = useState();
    userstotal()

    function usersdata() {
        axios.get(`https://staging.hospyta.com/admin/users?q=${query}`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setData(res.data.data.users)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    const clicktover = async (e, userId) => {
        e.preventDefault();
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + Token);
        myHeaders.append("Accept", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', 'https://localhost:3000');
        myHeaders.append('Access-Control-Allow-Credentials', 'true');
        myHeaders.append('GET', 'POST', 'OPTIONS');
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        fetch(`https://staging.hospyta.com/admin/auth/isVerify/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const clicktoban = async (e, userId) => {
        e.preventDefault();
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + Token);
        myHeaders.append("Accept", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', 'https://localhost:3000');
        myHeaders.append('Access-Control-Allow-Credentials', 'true');
        myHeaders.append('GET', 'POST', 'OPTIONS');
    
        var formdata = new FormData();
        formdata.append("is_banned", "1");
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
    
        fetch(`https://staging.hospyta.com/admin/auth/isBan/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

     const clicktounban = async (e, userId) => {
        e.preventDefault();
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + Token);
        myHeaders.append("Accept", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', 'https://localhost:3000');
        myHeaders.append('Access-Control-Allow-Credentials', 'true');
        myHeaders.append('GET', 'POST', 'OPTIONS');
    
        var formdata = new FormData();
        formdata.append("is_banned", "0");
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
    
        fetch(`https://staging.hospyta.com/admin/auth/isBan/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
        navigate("/login");
        }
    })
    
    const onSubmitClicked = async (e) => {
        e.preventDefault()
    
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZy5ob3NweXRhLmNvbVwvYXV0aFwvcGF0aWVudFwvbG9naW4iLCJpYXQiOjE2NjAzMDQ1NjEsImV4cCI6MTY2MDMwODE2MSwibmJmIjoxNjYwMzA0NTYxLCJqdGkiOiIwNXpaOUxjRFM5WjNPbVZiIiwic3ViIjoiMjkyNWRmOTUtMGRkMi00MTY4LTg5YTUtNjlhM2EyOTE1YTY2IiwicHJ2IjoiMjYzOWU5YmQ5YTgwNTk2ODFiYjg1OTU2NDM2YjJmMGQzMGVlYTFiNSJ9.azLOe63nsGQnB-3pugRYwkMpnvPG7Q1-kWdiXFZkfrQ");
    
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

    useEffect(() => {
        usersdata()
    }, [])

    useEffect(() => {
        usersact()
    }, [])

    useEffect(() => {
        usersinact()
    }, [])
    
    useEffect(() => {
        usersrevdata()
    }, [])

    function usersact() {
        axios.get(`https://staging.hospyta.com/admin/users/active`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setAdata(res.data.data.active)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function usersinact() {
        axios.get(`https://staging.hospyta.com/admin/users/in-active`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setIndata(res.data.data.in_active)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function usersrevdata() {
        axios.get(`https://staging.hospyta.com/admin/cash-flow/tnx`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setRev(res.data.data.transactions)
          }
        }).catch(err => {
          console.log(err)
        })
    }
    
    function userstotal() {
        axios.get(`https://staging.hospyta.com/admin/users/total`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setUsers(res.data.data.users);
            setPayment(res.data.data.revenue);
          }
        }).catch(err => {
          console.log(err)
        })
    }

    return (
        <div className='Userslist'>
            <Sidebar/>
            <div className='Usersmain'>
                <div className="Topnav">
                    <div id="topnav">
                        <div className="col-7">
                            <div className='col-12'>
                                <span id="pagetitle" style={{ color: (buttonActive !== "B" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("A"); secondElementShow(false);firstElementShow(true)}}>Users List</span>
                                <span id="pagetitle" style={{ color: (buttonActive =="B" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("B"); firstElementShow(false);secondElementShow(true)}}>Revenue From Users</span>
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
                                <span onClick={onSubmitClicked}>
                                <img src={Power}/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row first'>
                    { firstElement? 
                        <>
                            <div className="col-10 cashtrans">  
                                <div className='roww'>
                                    <div className='col-4'>
                                        <span id='swapnav' style={{ color: (buttonnActive !== "B" && buttonnActive !== "C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("A"); secondElement1Show(false);thirdElement1Show(false);firstElement1Show(true)}}>All</span>
                                        <span id='swapnav' style={{ color: (buttonnActive =="B" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("B"); firstElement1Show(false);secondElement1Show(true); thirdElement1Show(false)}}>Active</span>
                                        <span id='swapnav' style={{ color: (buttonnActive =="C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("C"); firstElement1Show(false);secondElement1Show(false); thirdElement1Show(true)}}>Inactive</span>
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-6'>
                                        <input id='searchbar' 
                                            type="search"
                                            placeholder="&#61442; Search" 
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='usertrans' id="usertrans">
                                    { firstElement1?
                                        <table data = {data}>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">User name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone Number</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>                              
                                                {data.filter((user, i) => {
                                                    if(query == "") {
                                                        return user
                                                    }
                                                    else if((user.name || user.email || user.phone || user.status || user.vendor_type || user.date || user.start_time || user.major || user.status || user.transactionable_type || user.city || user.amount || user.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return user
                                                    }
                                                })
                                                .map((user, i) => (
                                                    <tr key={i}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>                                           
                                                        <td style={{ color: (user.status == 0 ? "#FF0000" : "#007500") }}>{user.status == 1 ? "active" : "in-active"}</td>
                                                        { user.is_verify == 0 ? 
                                                            <td id="actbtn">
                                                                <button id="appbtn" onClick={e=>clicktover(e,user.id)} className="vbtn">Verify</button>
                                                            </td> :
                                                            <td id="actbtn">
                                                                <button id="appbtn" onClick={e=>clicktoban(e,user.id)}>Ban</button>
                                                                <button id="denbtn" onClick={e=>clicktounban(e,user.id)}>Unban</button>
                                                            </td>
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    :null}
                                    { secondElement1?
                                        <table data = {data}>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">User Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone Number</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {adata.filter((active, i) => {
                                                    if(query == "") {
                                                        return active
                                                    }
                                                    else if((active.name || active.email || active.phone || active.status || active.vendor_type || active.date || active.start_time || active.major || active.status || active.transactionable_type || active.city || active.amount || active.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return active
                                                    }
                                            })                            
                                            .map((active, i) => (
                                                <tr key={i}>
                                                    <td>{active.name}</td>
                                                    <td>{active.email}</td>
                                                    <td>{active.phone}</td>
                                                    <td style={{ color: (active.status == 0 ? "#FF0000" : "#007500") }}>{active.status == 1 ? "active" : "in-active"}</td>
                                                    { active.is_verify == 0 ? 
                                                                <td id="actbtn">
                                                                    <button id="appbtn" onClick={e=>clicktover(e,active.id)} className="vbtn">Verify</button>
                                                                </td> :
                                                                <td id="actbtn">
                                                                    <button id="appbtn">Ban</button>
                                                                    <button id="denbtn" onClick="">Unban</button>
                                                                </td>
                                                    }
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    :null}
                                    { thirdElement1?
                                        <table data = {data}>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">active Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Phone Number</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {indata.filter((inact, i) => {
                                                    if(query == "") {
                                                        return inact
                                                    }
                                                    else if((inact.name || inact.email || inact.phone || inact.status || inact.vendor_type || inact.date || inact.start_time || inact.major || inact.status || inact.transactionable_type || inact.city || inact.amount || inact.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return inact
                                                    }
                                                })    
                                                .map((inact, i) => (
                                                    <tr key={i}>
                                                    <td>{inact.name}</td>
                                                    <td>{inact.email}</td>
                                                    <td>{inact.phone}</td>
                                                    <td style={{ color: (inact.status == 0 ? "#FF0000" : "#007500") }}>{inact.status == 1 ? "active" : "in-active"}</td>
                                                    { inact.is_verify == 0 ? 
                                                        <td id="actbtn">
                                                            <button id="appbtn" onClick={e=>clicktover(e,inact.id)} className="vbtn">Verify</button>
                                                        </td> :
                                                        <td id="actbtn">
                                                            <button id="appbtn">Ban</button>
                                                            <button id="denbtn" onClick="">Unban</button>
                                                        </td>
                                                    }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    :null}
                                </div>
                            </div>
                            <div className="col-2" id="flexdiv">
                                <span id="flexdata">
                                    <h3>All Users</h3>
                                    <span>{users}</span>
                                </span>
                            </div>
                        </>
                    :null}
                    { secondElement? 
                        <>
                            <div className="col-10 cashtrans" id='swaprow'>  
                                <div className='roww'>
                                    <div className='col-4'>
                                    </div>
                                    <div className='col-2'></div>
                                    <div className='col-6'></div>
                                </div>
                                <div className='usertrans'>
                                    <table data = {data}>                                      
                                        <thead>
                                            <tr>
                                                <th scope="col">Users</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rev.map((transaction, i) => (
                                                <tr key={i}>
                                                <td>{transaction.user.name}</td>
                                                <td>{transaction.transactionable_type}</td>
                                                <td>{Intl.NumberFormat("en-NG", {
                                                    style: 'currency',
                                                    currency: 'NGN'
                                                    }).format(transaction.amount)}
                                                </td>
                                                <td>{moment(transaction.created_at).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                                                <td>{transaction.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-2" id="flexdiv">
                                <span id="flexdata">
                                    <h3>Users</h3>
                                    <span>{users}</span>
                                </span>
                                <span id="flexdata">
                                    <h3>Payment</h3>
                                    <span>{Intl.NumberFormat("en-NG", {
                                        style: 'currency',
                                        currency: 'NGN'
                                        }).format(payment)}</span>
                                </span>
                            </div>
                        </>
                    :null}
                </div>
            </div>
        </div>
    )
}

export default Userslist;
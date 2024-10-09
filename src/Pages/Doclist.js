import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import { TabTitle } from '../utils/Functions';
import '../Assets/Doclist.css';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'
import Sidebar from '../Components/Sidebar';

function Doclist() {
    TabTitle('Doctors - Admin');

    const Token = window.localStorage.getItem("token");
    const [query, setQuery] = useState("");
    const [data, setData] = React.useState([]);
    const [adata, setAdata] = useState([]);
    const [indata, setIndata] = useState([]);
    const [pdata, setPdata] = useState([]);
    const navigate = useNavigate();

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
    const [firstElement1, firstElement1Show] = useState(true);
    const [secondElement1, secondElement1Show] = useState(false);
    const [thirdElement1, thirdElement1Show] = useState(false);
    const [buttonActive, setButtonActive] = React.useState(false);
    const [buttonnActive, setButtonnActive] = React.useState(false);

    const [alldoc, setAlldoc] = useState();
    const [totalpayouts, setTotalpayouts] = useState();
    const [docpayouts, setDocpayouts] = useState();
    doctotal();

    React.useEffect(() => {
        docdata()
    }, [])
    
    function docdata() {
      axios.get(`https://staging.hospyta.com/admin/doctors`, {
        headers: {
            Authorization: `Bearer ${Token}`
        }
      }).then(res => {
        console.log(res.data.data)
        if (res.data.status && (res.data.status == "success")) {
            setData(res.data.data.doctor)
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
        docact()
    }, [])

    useEffect(() => {
        docinact()
    }, [])

    useEffect(() => {
        docpay()
    }, [])

    function docact() {
        axios.get(`https://staging.hospyta.com/admin/doctors/active`, {
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

    function docinact() {
        axios.get(`https://staging.hospyta.com/admin/doctors/in-active`, {
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

    function docpay() {
        axios.get(`https://staging.hospyta.com/admin/payout/all`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setPdata(res.data.data.payouts)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function doctotal() {
        axios.get(`https://staging.hospyta.com/admin/doctors/total`, {
          headers: {
              Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setAlldoc(res.data.data.doctors);
            setTotalpayouts(res.data.data.total_payout)
            setDocpayouts(res.data.data.payout);
          }
        }).catch(err => {
              console.log(err)
        })
    }


    return (
        <div className='Doclist'>
            <Sidebar/>
            <div className='Usersmain'>
                <div className="Topnav">
                    <div id="topnav">
                    <div className="col-7">
                        <div className='col-12'>
                        <span id="pagetitle" style={{ color: (buttonActive !== "B" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("A"); secondElementShow(false);firstElementShow(true)}}>Doctors List</span>
                        <span id="pagetitle" style={{ color: (buttonActive == "B" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("B"); firstElementShow(false);secondElementShow(true)}}>Payouts</span>
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
                <div className='row first'>
                    { firstElement? 
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
                                    <table>                                      
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Major</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.filter((doc, i) => {
                                                if(query == "") {
                                                    return doc
                                                }
                                                else if((doc.name || doc.is_verify || doc.email || doc.phone || doc.status || doc.vendor_type || doc.date || doc.start_time || doc.major || doc.status || doc.transactionable_type || doc.city || doc.amount || doc.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                    return doc
                                                }
                                            })
                                            .map((doc, i) => (
                                                <tr key={i}>
                                                    <td>{doc.name}</td>
                                                    <td>{doc.email}</td>
                                                    <td>{doc.work[0].major}</td>
                                                    <td style={{ color: (doc.status == 0 ? "#FF0000" : "#007500") }}>{doc.status == 0 ? "in-active" : "active"}</td>
                                                    { doc.is_verify == 0 ? 
                                                        <td id="actbtn">
                                                            <button id="appbtn" onClick={e=>clicktover(e,doc.id)} className="vbtn">Verify</button>
                                                        </td> :
                                                        <td id="actbtn">
                                                            <button id="denbtn" onClick={e=>clicktoban(e,doc.id)}>Ban</button>
                                                            <button id="appbtn" onClick={e=>clicktounban(e,doc.id)}>Unban</button>
                                                        </td>
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                :null}
                                { secondElement1?
                                    <table>                                      
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Major</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {adata.filter((active, i) => {
                                                if(query == "") {
                                                    return active
                                                }
                                                else if((active.name || active.is_verify || active.email || active.phone || active.status || active.vendor_type || active.date || active.start_time || active.major || active.status || active.transactionable_type || active.city || active.amount || active.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                    return active
                                                }
                                            })
                                            .map((active, i) => (
                                                <tr key={i}>
                                                    <td>{active.name}</td>
                                                    <td>{active.email}</td>
                                                    <td>{active.work[0].major}</td>
                                                    <td style={{ color: (active.status == 0 ? "#FF0000" : "#007500") }}>{active.status == 1 ? "active" : "in-active"}</td>
                                                    { active.is_verify == 0 ? 
                                                        <td id="actbtn">
                                                            <button id="appbtn" onClick={e=>clicktover(e,active.id)} className="vbtn">Verify</button>
                                                        </td> :
                                                        <td id="actbtn">
                                                            <button id="denbtn" onClick={e=>clicktoban(e,active.id)}>Ban</button>
                                                            <button id="appbtn" onClick={e=>clicktounban(e,active.id)}>Unban</button>
                                                        </td>
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    :null}
                                    { thirdElement1?
                                        <table>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Major</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {indata.filter((inact, i) => {
                                                    if(query == "") {
                                                        return inact
                                                    }
                                                    else if((inact.name || inact.is_verify || inact.email || inact.phone || inact.status || inact.vendor_type || inact.date || inact.start_time || inact.major || inact.status || inact.transactionable_type || inact.city || inact.amount || inact.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return inact
                                                    }
                                                })
                                                .map((inact, i) => (
                                                    <tr key={i}>
                                                        <td>{inact.name}</td>
                                                        <td>{inact.email}</td>
                                                        <td>{inact.work[0].major}</td>
                                                        <td style={{ color: (inact.status == 0 ? "#FF0000" : "#007500") }}>{inact.status == 0 ? "in-active" : "active"}</td>
                                                        { inact.is_verify == 0 ? 
                                                        <td id="actbtn">
                                                            <button id="appbtn" onClick={e=>clicktover(e,inact.id)} className="vbtn">Verify</button>
                                                        </td> :
                                                        <td id="actbtn">
                                                            <button id="denbtn" onClick={e=>clicktoban(e,inact.id)}>Ban</button>
                                                            <button id="appbtn" onClick={e=>clicktounban(e,inact.id)}>Unban</button>
                                                        </td>
                                                    }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    :null}
                            </div>
                        </div>
                    :null}
                    { secondElement? 
                        <div id='sec' className="col-10 cashtrans">
                            <div className='roww'>
                                <div className='col-4'>
                                    {/* <span id='swapnav' style={{ color: (buttonnActive !== "B" && buttonnActive !== "C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("A"); secondElement1Show(false);firstElement1Show(true)}}>Complete</span>
                                    <span id='swapnav' style={{ color: (buttonnActive =="B" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("B"); firstElement1Show(false);secondElement1Show(true);}}>Pending</span> */}
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
                            <div className='Dsecondinfo'>
                                <table>                                      
                                        <thead>
                                            <tr>
                                                <th scope="col">Doctor</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pdata.filter((pay, i) => {
                                                if(query == "") {
                                                    return pay
                                                }
                                                else if((pay.user.name || pay.is_verify || pay.status || pay.vendor_type || pay.date || pay.start_time || pay.major || pay.status || pay.transactionable_type || pay.city || pay.amount || pay.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                    return pay
                                                }
                                            })
                                            .map((pay, i) => (
                                                <tr key={i}>
                                                    <td>{pay.user.name}</td>
                                                    <td>{moment(pay.date).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                                                    <td>{moment(pay.date).format("HH:mm")}</td>
                                                    <td>{Intl.NumberFormat("en-NG", {
                                                        style: 'currency',
                                                        currency: 'NGN'
                                                    }).format(pay.amount)}</td>
                                                    {/* { pay.is_verify == 0 ? 
                                                        <td id="actbtn">
                                                            <button id="appbtn" className="vbtn">Verify</button>
                                                        </td> :
                                                        <td id="actbtn">
                                                            <button id="appbtn">Ban</button>
                                                            <button id="denbtn" onClick="">Unban</button>
                                                        </td>
                                                    } */}
                                                </tr>
                                            ))}
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    :null}
                    <div className="col-2" id="flexdiv">
                        <span id="flexdata">
                            <h3>All Doctors</h3>
                            <span>{alldoc}</span>
                        </span>
                        <span id="flexdata">
                            <h3>Total Payouts</h3>
                            <span>{Intl.NumberFormat("en-NG", {
                                style: 'currency',
                                currency: 'NGN'
                            }).format(totalpayouts)}</span>
                        </span>
                        <span id="flexdata">
                            <h3>Payouts</h3>
                            <span>{Intl.NumberFormat("en-NG", {
                                style: 'currency',
                                currency: 'NGN'
                            }).format(docpayouts)}</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Doclist

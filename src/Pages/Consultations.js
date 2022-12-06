import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../utils/Functions';
import axios from "axios";
import moment from 'moment/moment';
import '../Assets/Consultations.css';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'
import Sidebar from '../Components/Sidebar';

function Consultations() {
    TabTitle('Consultation - Admin');

    const Token = window.localStorage.getItem("token");
    const [query, setQuery] = useState("");
    const [data, setData] = React.useState([]);
    const [dname, setDname] = React.useState([]);
    const [adata, setAdata] = React.useState([]);
    const [pdata, setPdata] = React.useState([]);
    const navigate = useNavigate();

    const [firstElement1, firstElement1Show] = useState(true);
    const [secondElement1, secondElement1Show] = useState(false);
    const [thirdElement1, thirdElement1Show] = useState(false);
    const [fourthElement1, fourthElement1Show] = useState(false);
    const [fifthElement1, fifthElement1Show] = useState(false);
    const [buttonnActive, setButtonnActive] = React.useState(false);

    const [allcalls, setAllcalls] = useState();
    const [accepted, setAccepted] = useState();
    const [pending, setPending] = useState();
    consultsum();

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

    React.useEffect(() => {
        consultdata()
    }, [])

    React.useEffect(() => {
        consultacc()
    }, [])

    React.useEffect(() => {
        consultpen()
    }, [])

    function consultdata() {
        axios.get(`https://staging.hospyta.com/admin/booking`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setData(res.data.data.booking)
            setDname(res.data.data.booking.doctor.name)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function consultacc() {
        axios.get(`https://staging.hospyta.com/admin/booking/accepted`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setAdata(res.data.data.booking)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function consultpen() {
        axios.get(`https://staging.hospyta.com/admin/booking/pending`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setPdata(res.data.data.booking)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function consultsum() {
        axios.get(`https://staging.hospyta.com/admin/booking/summary`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setAllcalls(res.data.data.all)
            setAccepted(res.data.data.accepted)
            setPending(res.data.data.pending)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    return (
        <div className='Consultations'>
            <Sidebar/>
            <div className='Consultmain'>
                <div className="Topnav">
                    <div id="topnav">
                    <div className="col-7">
                        <div className='col-12'>
                            <span  id="pagetitle">Consultations</span>
                        </div>
                    </div>
                    <div className="col-5">
                        <div id="profile">
                            <span id="proicon">
                                <img alt='' id="proimg" src={Bags}/>
                                <div id="userid">
                                <span id="userrole">Admin</span>
                                </div>
                            </span>
                        </div>
                        <div id="power">
                            <button onClick={onSubmitClicked}>
                            <img alt='' src={Power}/>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='consultbody'>
                    <div className='col-12'>
                        <div className='row' id='bodynav'>
                            <div className='col-5'>
                                <span id='menutitle' style={{ color: (buttonnActive !== "B" && buttonnActive !== "C" && buttonnActive !== "D" && buttonnActive !== "E" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("A"); secondElement1Show(false);thirdElement1Show(false); fourthElement1Show(false); fifthElement1Show(false);firstElement1Show(true)}}>All</span>
                                <span id='menutitle' style={{ color: (buttonnActive =="B" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("B"); firstElement1Show(false);secondElement1Show(true); thirdElement1Show(false); fourthElement1Show(false); fifthElement1Show(false);}}>Accepted</span>
                                <span id='menutitle' style={{ color: (buttonnActive =="C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("C"); firstElement1Show(false);secondElement1Show(false); thirdElement1Show(true); fourthElement1Show(false); fifthElement1Show(false);}}>Denied</span>
                                <span id='menutitle' style={{ color: (buttonnActive =="D" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("D"); firstElement1Show(false);fifthElement1Show(false);fourthElement1Show(true);secondElement1Show(false); thirdElement1Show(false)}}>Ongoing</span>
                                <span id='menutitle' style={{ color: (buttonnActive =="E" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("E"); fifthElement1Show(true);secondElement1Show(false); thirdElement1Show(false); firstElement1Show(false); fourthElement1Show(false);}}>Scheduled</span>
                            </div>
                            <div className='col-7'>
                                <input id='searchbar' 
                                    type="search"
                                    placeholder="&#61442; Search" 
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='row' id='body2'>
                            <div className='col-10'>
                                <div className='row' id='consrow'>
                                    { firstElement1?
                                        <table>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">Patient</th>
                                                    <th scope="col">Doctor</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start</th>
                                                    <th scope="col">End</th>
                                                    <th scope="col">Duration</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.filter((book, i) => {
                                                    if(query == "") {
                                                        return book
                                                    }
                                                    else if((book.patient.name || book.duration || book.email || book.phone || book.status || book.vendor_type || book.date || book.start_time || book.major || book.status || book.transactionable_type || book.city || book.amount || book.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return book
                                                    }
                                                })
                                                .map((book, i) => (
                                                    <tr key={i}>
                                                        <td>{book.patient.name}</td>
                                                        <td>{}</td>
                                                        <td>{moment(book.date).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                                                        <td>{moment(book.start_time).format("HH:mm")}</td>
                                                        <td>{moment(book.end_time).format("HH:mm")}</td>
                                                        <td>{book.duration + " mins"}</td>
                                                        <td style={{ color: (book.status == "accepted" ? "#007500"  : book.status == "pending" ? "#FEDE00"  : book.status == "hh" ? "#000000" : "#FF0000") }}>{book.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    :null}
                                    { secondElement1?
                                        <table>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">Patient</th>
                                                    <th scope="col">Doctor</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start</th>
                                                    <th scope="col">End</th>
                                                    <th scope="col">Duration</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {adata.filter((book, i) => {
                                                    if(query == "") {
                                                        return book
                                                    }
                                                    else if((book.patient.name || book.duration || book.email || book.phone || book.status || book.vendor_type || book.date || book.start_time || book.major || book.status || book.transactionable_type || book.city || book.amount || book.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return book
                                                    }
                                                })
                                                .map((book, i) => (
                                                    <tr key={i}>
                                                        <td>{book.patient.name}</td>
                                                        <td>{}</td>
                                                        <td>{moment(book.date).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                                                        <td>{moment(book.start_time).format("HH:mm")}</td>
                                                        <td>{moment(book.end_time).format("HH:mm")}</td>
                                                        <td>{book.duration + " mins"}</td>
                                                        <td style={{ color: (book.status == "accepted" ? "#007500"  : book.status == "pending" ? "#FEDE00"  : book.status == "hh" ? "#000000" : "#FF0000") }}>{book.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    :null}
                                    { thirdElement1?
                                        <table>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">Patient</th>
                                                    <th scope="col">Doctor</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start</th>
                                                    <th scope="col">End</th>
                                                    <th scope="col">Duration</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {data.map((book, i) => (
                                                    <tr key={i}>
                                                        <td>{book.patient.name}</td>
                                                        <td>{}</td>
                                                        <td>{moment(book.date).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                                                        <td>{moment(book.start_time).format("HH:mm")}</td>
                                                        <td>{moment(book.end_time).format("HH:mm")}</td>
                                                        <td>{book.duration + " mins"}</td>
                                                        <td>{book.status}</td>
                                                    </tr>
                                                ))} */}
                                            </tbody>
                                        </table>
                                    :null}
                                    { fourthElement1?
                                        <table>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">Patient</th>
                                                    <th scope="col">Doctor</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start</th>
                                                    <th scope="col">End</th>
                                                    <th scope="col">Duration</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* data.map((book, i) => (
                                                    <tr key={i}>
                                                        <td>{book.patient.name}</td>
                                                        <td>{}</td>
                                                        <td>{moment(book.date).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                                                        <td>{moment(book.start_time).format("HH:mm")}</td>
                                                        <td>{moment(book.end_time).format("HH:mm")}</td>
                                                        <td>{book.duration + " mins"}</td>
                                                        <td>{book.status}</td>
                                                    </tr>
                                                ))*/} 
                                            </tbody>
                                        </table>
                                    :null}
                                    { fifthElement1?
                                        <table>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">Patient</th>
                                                    <th scope="col">Doctor</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start</th>
                                                    <th scope="col">End</th>
                                                    <th scope="col">Duration</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pdata.filter((book, i) => {
                                                    if(query == "") {
                                                        return book
                                                    }
                                                    else if((book.patient.name || book.duration || book.email || book.phone || book.status || book.vendor_type || book.date || book.start_time || book.major || book.status || book.transactionable_type || book.city || book.amount || book.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return book
                                                    }
                                                })
                                                .map((book, i) => (
                                                    <tr key={i}>
                                                        <td>{book.patient.name}</td>
                                                        <td>{}</td>
                                                        <td>{moment(book.date).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                                                        <td>{moment(book.start_time).format("HH:mm")}</td>
                                                        <td>{moment(book.end_time).format("HH:mm")}</td>
                                                        <td>{book.duration + " mins"}</td>
                                                        <td style={{ color: (book.status == "accepted" ? "#007500"  : book.status == "pending" ? "#FEDE00"  : book.status == "hh" ? "#000000" : "#FF0000") }}>{book.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    :null}
                                </div>
                            </div>
                            <div className="col-2" id="flexdiv">
                                <span id="flexdata">
                                    <h3>Accepted calls</h3>
                                    <span>{accepted}</span>
                                </span>
                                <span id="flexdata">
                                    <h3>Pending calls</h3>
                                    <span>{pending}</span>
                                </span>
                                    <span id="flexdata">
                                    <h3>Schedule calls</h3>
                                    <span>{allcalls}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Consultations;
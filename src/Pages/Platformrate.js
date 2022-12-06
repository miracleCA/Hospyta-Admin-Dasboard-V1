import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { TabTitle } from '../utils/Functions';
import '../Assets/Platformrate.css';
import Sidebar from '../Components/Sidebar';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'

function Platrate() {
    TabTitle('Platform Rate - Admin');

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const lastRef = useRef(null);
    
    const Token = window.localStorage.getItem("token");
    const navigate = useNavigate();
    const [neww, setNeww] = useState({
        gNew: "",
        vNew: "",
        sNew: ""
    });
    const [gdata, setGdata] = useState(null);
    const [vdata, setVdata] = useState(null);
    const [sdata, setSdata] = useState(null);
    const [gdata1, setGdata1] = useState();
    const [vdata1, setVdata1] = useState();
    const [sdata1, setSdata1] = useState();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    })

    useEffect(() => {
        platrate()
    }, [])

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

    function platrate() {
        axios.get(`https://staging.hospyta.com/logistics/percent`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            if (res.data.status && (res.data.status == "success") && (res.data.data.length == 3)) {
                console.log(res.data.data)
                setVdata(res.data.data.filter(v => v.name == "vendor")[0])
                setGdata(res.data.data.filter(v => v.name == "generalist")[0])
                setSdata(res.data.data.filter(v => v.name == "specialist")[0])
                setVdata1(res.data.data[0].percent)
                setGdata1(res.data.data[1].percent)
                setSdata1(res.data.data[2].percent)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const newrate = async (userId,newRate) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZy5ob3NweXRhLmNvbVwvYXV0aFwvcGF0aWVudFwvbG9naW4iLCJpYXQiOjE2NjAzMDQ1NjEsImV4cCI6MTY2MDMwODE2MSwibmJmIjoxNjYwMzA0NTYxLCJqdGkiOiIwNXpaOUxjRFM5WjNPbVZiIiwic3ViIjoiMjkyNWRmOTUtMGRkMi00MTY4LTg5YTUtNjlhM2EyOTE1YTY2IiwicHJ2IjoiMjYzOWU5YmQ5YTgwNTk2ODFiYjg1OTU2NDM2YjJmMGQzMGVlYTFiNSJ9.azLOe63nsGQnB-3pugRYwkMpnvPG7Q1-kWdiXFZkfrQ");
        myHeaders.append("Accept", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', 'https://localhost:3000');
        myHeaders.append('Access-Control-Allow-Credentials', 'true');
        myHeaders.append('GET', 'POST', 'OPTIONS');

        var formdata = new FormData();
        formdata.append("percent", newRate);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`https://staging.hospyta.com/logistics/percent/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        Promise.all([newrate(gdata.id,neww.gNew), newrate(vdata.id,neww.vNew), newrate(sdata.id,neww.sNew)])
        firstRef.current.value = '';
        lastRef.current.value = '';
    }
    return (
        <div className='Platformrate'>
            <Sidebar/>
            <div className='Platmain'>
                <div className="Topnav">
                    <div id="topnav">
                        <div className="col-7">
                            <div className='col-12'>
                                <span id="pagetitle">Platform Rate</span>
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
                <div className='Platbody'>
                    <form method="POST">
                        <div id='row1'>
                            <span id='formsec1'>
                                <label>Generalist Cost Per Session:</label>
                            </span><br />
                            <span id='formsec2'>
                                <label>Current Rate:</label>
                                <span id='newrate'>{gdata1}%</span>
                                <label>Set new Rate:</label>
                                <input ref={firstRef} type="number" onChange={e => setNeww({...neww,gNew:e.target.value})} id="Prate" />
                            </span>
                        </div>
                        <div id='row2'>
                            <span id='formsec1'>
                                <label>Specialist Cost Per Session:</label>
                            </span><br />
                            <span id='formsec2'>
                                <label>Current Rate:</label>
                                <span id='newrate'>{sdata1}%</span>
                                <label>Set new Rate:</label>
                                <input ref={secondRef} type="number" onChange={e => setNeww({...neww,sNew:e.target.value})} id="Prate" />
                            </span>
                        </div>
                        <div id='row3'>
                            <span id='formsec1'>
                                <label>Platform Rate For Vendor Sale:</label>
                            </span><br />
                            <span id='formsec2'>
                                <label>Current Rate:</label>
                                <span id='newrate'>{vdata1}%</span>
                                <label>Set new Rate:</label>
                                <input ref={lastRef} type="number" onChange={e => setNeww({...neww,vNew:e.target.value})} id="Prate" />
                            </span>
                        </div>
                        <div id='row4'>
                            <button id='subbtn' onClick={handleSubmit} type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Platrate;
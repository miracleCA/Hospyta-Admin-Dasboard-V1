import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../utils/Functions';
import '../Assets/Broadcast.css'
import Sidebar from '../Components/Sidebar';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'
import cal from '../Icons/Calendar.png';

function Broadcast() {
    TabTitle('Broadcast - Admin');

    const navigate = useNavigate();
    const Token = window.localStorage.getItem("token");
    const [target, setTarget] = useState("");
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!localStorage.getItem('token')) {
        navigate("/login");
        }
    })

    const broadcast = async (e) => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);
        myHeaders.append('Access-Control-Allow-Origin', 'https://localhost:3000');
        myHeaders.append('Access-Control-Allow-Credentials', 'true');
        myHeaders.append('GET', 'POST', 'OPTIONS');

        var formdata = new FormData();
        formdata.append("target", target);
        formdata.append("topic", topic);
        formdata.append("message", message);

        var requestOptions = {
        method: 'POST',
        status_code: "405",
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch("https://staging.hospyta.com/admin/broadcast", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        e.target.reset();
    }

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

    return (
        <div className='Broadcast'>
            <Sidebar/>
            <div className='Broadcastmain'>
                <div className="Topnav">
                    <div id="topnav">
                        <div className="col-7">
                            <div className='col-12'>
                                <span  id="pagetitle">Broadcast Message</span>
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
                <div className='bod'>
                    <div className='col-12'>
                        <h2>Create Broadcast</h2>
                        <span id="broadform">
                            <form method='POST' onSubmit={broadcast}>
                                <span id="input1">
                                    <b>Target:</b>
                                    <input type="radio" id="Users" name="Users" value="patient" onChange={(e)=>setTarget(e.target.value)}/>
                                    <label id='users' for="patient"> Users</label>
                                    <input type="radio" id="Users" name="Users" value="doctors" onChange={(e)=>setTarget(e.target.value)}/>
                                    <label id='users' for="doctors"> Doctors</label>
                                    <input type="radio" id="Users" name="Users" value="vendors" onChange={(e)=>setTarget(e.target.value)}/>
                                    <label id='users' for="vendors"> Vendors</label><br/>
                                </span>
                                <span id="input2">
                                    <label id="userr" for="Topic"> Topic:  </label>
                                    <input id="topic" type="text" name="topic" onChange={(e)=>setTopic(e.target.value)} /><br/>
                                </span>
                                <span id="messageinput"> 
                                    <label id="messge" for="Topic"> Message:</label><br/>
                                </span>
                                <textarea id="message" onChange={(e)=>setMessage(e.target.value)}></textarea>
                                <br/>
                                <span id="lastroww">
                                    <span id="lastrowww">
                                        {/* <span id='schetxt'>Schedule Broadcast</span> 
                                        <img src={cal}/> */}
                                    </span>
                                    <input id="submitb" type="submit" value="Submit"/>
                                </span>
                            </form>
                        </span>
                    </div> 
                </div>
            </div>
        </div>
  )
}

export default Broadcast;

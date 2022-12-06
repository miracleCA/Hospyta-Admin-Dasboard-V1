import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../utils/Functions';
import '../Assets/Login.css';
import Log from "../Images/Logo black.png";
import Limg from "../Images/Logimg.png";
import logo from "../Images/Logo.png";

function Login() {    
    TabTitle('Login - Admin');

    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const navigate = useNavigate();

    const onSubmitClicked = async (e) => {
        e.preventDefault()
        
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        var requestOptions = {
        method: 'POST',
        status_code: "405",
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        let result = await fetch("https://staging.hospyta.com/auth/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('profit', result.data.user.wallet.balance);
            navigate('/')
        })
        .catch(error => console.log('error', error));
    }
    
    return (
        <div className="Login">
            <div id="lognav">
                <img src={Log}/>
            </div>
            <div className="logbody">
                <div className="col-5">
                    <img src={Limg}/>
                </div>
                <div className="col-7">
                    <span className="box">
                        <form method="POST" onSubmit={onSubmitClicked}>
                            <h2>Welcome back</h2>
                            <span id="form-field">
                                <label>Email</label>
                                <input type="Email" onChange={(e)=>setEmail(e.target.value)}/>
                            </span>
                            <span id="form-field">
                                <label>Password</label>
                                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                            </span>
                            <button type="submit">Login</button>
                        </form>
                    </span>
                </div>
            </div>
            <div className="logfoot">
                <span id="loftimg">
                    <img src={logo}/>
                    </span>
                <span id="lofftcop">
                    <span>Copyright {new Date().getFullYear()} | Hospyta</span>
                </span>
            </div>
        </div>
  )
}

export default Login;
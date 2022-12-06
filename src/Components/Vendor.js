import React, {useState} from "react";
import axios from 'axios';
import '../Assets/Vendor.css'

function Vendor() {

    const [data, setData] = React.useState([]);
    const [vdata, setVdata] = React.useState([]);
    const Token = window.localStorage.getItem("token");
    const [approve,setApprove]=useState('');
    const [denial,setDenial]=useState('');

    React.useEffect(() => {
        vendata()
    }, [])

    React.useEffect(() => {
        venverig()
    }, [])
    
      function vendata() {
        axios.get(`https://staging.hospyta.com/admin/dashboard/count`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setData(res.data.data)
          }
        }).catch(err => {
          console.log(err)
        })
      }

      function venverig() {
        axios.get(`https://staging.hospyta.com/admin/vendor`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setVdata(res.data.data.vendors)
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

    return (
        <div className='Vendor'>
            <div className="col-9">
                <h2>Vendors Approval</h2>
                <div className='usertrans' id="usertrans">
                    <table>                                      
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Lincense</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vdata.slice(0, 5).map((vd, i) => (
                                <tr key={i}>
                                    <td>{vd.name}</td>
                                    <td>{vd.business_details.license}</td>
                                    { vd.is_verify == 0 ? 
                                        <td id="actbtn">
                                            <button id="appbtn" className="vbtn" onClick={e=>clicktover(e,vd.id)}>Verify</button>
                                        </td> :
                                        <td id="actbtn">
                                            <button id="denbtn" onClick={e=>clicktoban(e,vd.id)}>Ban</button>
                                            <button id="appbtn" onClick={e=>clicktounban(e,vd.id)}>Unban</button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <span id="flexspace"></span>
            <div id="data" className="col-3">
                <div className="row">
                    <span id='col61' className="col-6">
                        <span id="dataid">Users</span>
                        <span id="datanum">{data.users}</span>
                    </span>
                    <span id='col62' className="col-6">
                        <span id="dataid">Doctors</span>
                        <span id="datanum">{data.doctors}</span>
                    </span>
                </div>
                <div className="row">
                    <span id='col63' className="col-6">
                        <span id="dataid">Vendors</span>
                        <span id="datanum">{data.vendors}</span>
                    </span>
                    <span id='col64' className="col-6">
                        <span id="dataid">Products</span>
                        <span id="datanum">{data.products}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Vendor;
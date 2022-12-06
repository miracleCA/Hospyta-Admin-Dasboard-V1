import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../utils/Functions';
import axios from "axios";
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'
import '../Assets/Vendors.css';
import Sidebar from '../Components/Sidebar';

function Vendors() {
    TabTitle('Vendors - Admin');
    
    const Token = window.localStorage.getItem("token");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [adata, setAdata] = useState([]);
    const [idata, setIdata] = useState([]);

    const [proddata, setProddata] = useState([]);
    const [padata, setPadata] = useState([]);
    const [pidata, setPidata] = useState([]);

    const [pdata, setPdata] = useState([]);
    
    const [firstElement, firstElementShow] = useState(true);
    const [secondElement, secondElementShow] = useState(false);
    const [thirdElement, thirdElementShow] = useState(false);
    const [firstElement1, firstElement1Show] = useState(true);
    const [secondElement1, secondElement1Show] = useState(false);
    const [thirdElement1, thirdElement1Show] = useState(false);
    const [firstElement2, firstElement2Show] = useState(true);
    const [secondElement2, secondElement2Show] = useState(false);
    const [thirdElement2, thirdElement2Show] = useState(false);
    const [buttonActive, setButtonActive] = React.useState(false);
    const [buttonnActive, setButtonnActive] = React.useState(false);

    const [vendors, setVendors] = useState();
    const [payouts, setPayouts] = useState();
    const [total, setTotal] = useState();
    const [newprod, setNewprod] = useState();
    ventotal()

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

    useEffect(() => {
        vendata()
    }, [])

    useEffect(() => {
        venact()
    }, [])

    useEffect(() => {
        veninact()
    }, [])

    useEffect(() => {
        prodata()
    }, [])

    useEffect(() => {
        proadata()
    }, [])

    useEffect(() => {
        proidata()
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

    function vendata() {
        axios.get(`https://staging.hospyta.com/admin/vendor`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setData(res.data.data.vendors)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function venact() {
        axios.get(`https://staging.hospyta.com/admin/vendor/active`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setAdata(res.data.data.vendors)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function veninact() {
        axios.get(`https://staging.hospyta.com/admin/vendor/in-active`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setIdata(res.data.data.vendors)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function ventotal() {
        axios.get(`https://staging.hospyta.com/admin/vendor/summary`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setVendors(res.data.data.vendor);
            setPayouts(res.data.data.payout)
            setTotal(res.data.data.total_payout)
            setNewprod()
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function prodata() {
        axios.get(`https://staging.hospyta.com/admin/product`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setProddata(res.data.data.products)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function proadata() {
        axios.get(`https://staging.hospyta.com/admin/product/approved`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setPadata(res.data.data.products)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function proidata() {
        axios.get(`https://staging.hospyta.com/admin/product/unapproved`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setPidata(res.data.data.products)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    const prodapp = async (e, userId) => {
    
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
    
        fetch(`https://staging.hospyta.com/admin/product/isApproved/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <div className='Vendors'>
            <Sidebar/>
            <div className='Vendormain'>
                <div className="Topnav">
                    <div id="topnav">
                        <div className="col-7">
                            <div className='col-12'>
                                <span id="pagetitle" style={{ color: (buttonActive !== "B" && buttonActive !== "C" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("A"); secondElementShow(false);thirdElementShow(false);firstElementShow(true)}}>Vendors</span>
                                <span id="pagetitle" style={{ color: (buttonActive == "B" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("B"); firstElementShow(false);thirdElementShow(false);secondElementShow(true)}}>Vendor Licence Verification</span>
                                <span id="pagetitle" style={{ color: (buttonActive =="C" ? "#0D0C33" : "#606C80") }} onClick={() => {setButtonActive("C"); firstElementShow(false);secondElementShow(false);thirdElementShow(true)}}>Product Approval</span>
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
                        <>
                            <div className="col-10 cashtrans">
                                <div className='row' id="nav3">
                                    <div className='col-4'>
                                        <span id='swapnav' style={{ color: (buttonnActive !== "B" && buttonnActive !== "C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("A"); secondElement1Show(false);thirdElement1Show(false);firstElement1Show(true)}}>All</span>
                                        <span id='swapnav' style={{ color: (buttonnActive =="B" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("B"); firstElement1Show(false);secondElement1Show(true); thirdElement1Show(false)}}>Active</span>
                                        <span id='swapnav' style={{ color: (buttonnActive =="C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("C"); firstElement1Show(false);secondElement1Show(false); thirdElement1Show(true)}}>Inactive</span>
                                    </div>
                                    <div className='col-2' id='stretch'></div>
                                    <div className='col-6'>
                                        <input id='searchbar' 
                                            type="search"
                                            placeholder="&#61442; Search" 
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div id="Vinfo1">
                                    { firstElement1?
                                        <table>                                      
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Vendors Type</th>
                                                    <th scope="col">City</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>                              
                                                {data.filter((vendor, i) => {
                                                    if(query == "") {
                                                        return vendor
                                                    }
                                                    else if((vendor.name || vendor.email || vendor.phone || vendor.status || vendor.vendor_type || vendor.date || vendor.start_time || vendor.major || vendor.status || vendor.transactionable_type || vendor.city || vendor.amount || vendor.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return vendor
                                                    }
                                                })
                                                .map((vendor, i) => (
                                                    <tr key={i}>
                                                        <td>{vendor.name}</td>
                                                        <td>{vendor.phone}</td>
                                                        <td>{vendor.email}</td>
                                                        <td>{vendor.vendor_type}</td> 
                                                        <td>{vendor.profile.city}</td>                                          
                                                        <td style={{ color: (vendor.status == 0 ? "#FF0000" : "#007500") }}>{vendor.status == 0 ? "in-active" : "active"}</td>
                                                        { vendor.is_verify == 0 ? 
                                                            <td id="actbtn">
                                                                <button id="Vappbtn" onClick={e=>clicktover(e,vendor.id)} className="vbtn">Verify</button>
                                                            </td> :
                                                            <td id="actbtn">
                                                                <button id="appbtn" onClick={e=>clicktoban(e,vendor.id)}>Ban</button>
                                                                <button id="denbtn" onClick={e=>clicktounban(e,vendor.id)}>Unban</button>
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
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Vendors Type</th>
                                                    <th scope="col">City</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>                              
                                                {adata.filter((actvendor, i) => {
                                                    if(query == "") {
                                                        return actvendor
                                                    }
                                                    else if((actvendor.name || actvendor.email || actvendor.phone || actvendor.status || actvendor.actvendor_type || actvendor.date || actvendor.start_time || actvendor.major || actvendor.status || actvendor.transactionable_type || actvendor.city || actvendor.amount || actvendor.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return actvendor
                                                    }
                                                })
                                                .map((actvendor, i) => (
                                                    <tr key={i}>
                                                        <td>{actvendor.name}</td>
                                                        <td>{actvendor.phone}</td>
                                                        <td>{actvendor.email}</td>
                                                        <td>{actvendor.vendor_type}</td> 
                                                        <td>{actvendor.profile.city}</td>                                          
                                                        <td style={{ color: (actvendor.status == 0 ? "#FF0000" : "#007500") }}>{actvendor.status == 0 ? "in-active" : "active"}</td>
                                                        { actvendor.is_verify == 0 ? 
                                                            <td id="actbtn">
                                                                <button id="Vappbtn" onClick={e=>clicktover(e,actvendor.id)} className="vbtn">Verify</button>
                                                            </td> :
                                                            <td id="actbtn">
                                                                <button id="appbtn" onClick={e=>clicktoban(e,actvendor.id)}>Ban</button>
                                                                <button id="denbtn" onClick={e=>clicktounban(e,actvendor.id)}>Unban</button>
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
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Vendors Type</th>
                                                    <th scope="col">City</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>                              
                                                {idata.filter((inactvendor, i) => {
                                                    if(query == "") {
                                                        return inactvendor
                                                    }
                                                    else if((inactvendor.name || inactvendor.email || inactvendor.phone || inactvendor.status || inactvendor.inactvendor_type || inactvendor.date || inactvendor.start_time || inactvendor.major || inactvendor.status || inactvendor.transactionable_type || inactvendor.city || inactvendor.amount || inactvendor.created_at).toLowerCase().includes(query.toLowerCase())) {
                                                        return inactvendor
                                                    }
                                                })
                                                .map((inactvendor, i) => (
                                                    <tr key={i}>
                                                        <td>{inactvendor.name}</td>
                                                        <td>{inactvendor.phone}</td>
                                                        <td>{inactvendor.email}</td>
                                                        <td>{inactvendor.vendor_type}</td> 
                                                        <td>{inactvendor.profile.city}</td>                                          
                                                        <td style={{ color: (inactvendor.status == 0 ? "#FF0000" : "#007500") }}>{inactvendor.status == 0 ? "in-active" : "active"}</td>
                                                        { inactvendor.is_verify == 0 ? 
                                                            <td id="actbtn">
                                                                <button id="Vappbtn" onClick={e=>clicktover(e,inactvendor.id)} className="vbtn">Verify</button>
                                                            </td> :
                                                            <td id="actbtn">
                                                                <button id="appbtn" onClick={e=>clicktoban(e,inactvendor.id)}>Ban</button>
                                                                <button id="denbtn" onClick={e=>clicktounban(e,inactvendor.id)}>Unban</button>
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
                                    <h3>Total Payouts</h3>
                                    <span>{Intl.NumberFormat("en-NG", {
                                        style: 'currency',
                                        currency: 'NGN'
                                    }).format(total)}</span>
                                </span>
                                <span id="flexdata">
                                    <h3>Vendors</h3>
                                    <span>{vendors}</span>
                                </span>
                                <span id="flexdata">
                                    <h3>Payouts</h3>
                                    <span>{payouts}</span>
                                </span>
                                <span id="flexdata">
                                    <h3>New Products</h3>
                                    <span>{newprod}</span>
                                </span>
                            </div>
                        </>
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
                                    <table>                                      
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">License Number</th>
                                                <th scope="col">Vendors Type</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>                              
                                            {data.map((vendor, i) => (
                                                <tr key={i}>
                                                    <td>{vendor.name}</td>
                                                    <td>{vendor.email}</td>
                                                    <td>{vendor.business_details.license}</td>
                                                    <td>{vendor.vendor_type}</td> 
                                                    { vendor.is_verify == 0 ? 
                                                            <td id="actbtn">
                                                                <button id="Vappbtn" onClick={e=>clicktover(e,vendor.id)} className="vbtn">Verify</button>
                                                            </td> : null
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-2' id='cont2'>
                                <span id='spancv'>
                                    <span id="title">New Vendors</span>
                                    <span id='figure'></span>
                                </span>
                            </div>
                        </span>
                    :null}
                    { thirdElement?
                        <span id='dlast'>
                            <div className="col-10 cashtrans">
                                <div className='row' id="nav3">
                                    <div className='col-4'>
                                        <span id='swapnav' style={{ color: (buttonnActive !== "B" && buttonnActive !== "C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("A"); secondElement2Show(false);thirdElement2Show(false);firstElement2Show(true)}}>All</span>
                                        <span id='swapnav' style={{ color: (buttonnActive =="B" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("B"); firstElement2Show(false);secondElement2Show(true); thirdElement2Show(false)}}>Approved</span>
                                        <span id='swapnav' style={{ color: (buttonnActive =="C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonnActive("C"); firstElement2Show(false);secondElement2Show(false); thirdElement2Show(true)}}>Unapproved</span>
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
                                <div id="Vinfo3">
                                    { firstElement2?
                                        <table>                               
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>                              
                                                {proddata.filter((prod, i) => {
                                                    if(query == "") {
                                                        return prod
                                                    }
                                                    else if((prod.product.name || prod.is_approved || prod.status || prod.type || prod.expiry_date || prod.brand || prod.price || prod.description || prod.category).toLowerCase().includes(query.toLowerCase())) {
                                                        return prod
                                                    }
                                                })
                                                .map((prod, i) => (
                                                    <tr key={i}>
                                                        <td>{prod.product_name}</td>
                                                        <td>{prod.category}</td>
                                                        <td>{prod.price}</td>
                                                        <td>{}</td> 
                                                        <td>{prod.expiry_date}</td>                                    
                                                        { prod.is_approved == 0 ? 
                                                            <td id="actbtn">
                                                                <button id="Vappbtn" onClick={e=>prodapp(e,prod.id)} className="vbtn">Approve</button>
                                                            </td> : null
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    :null}
                                    { secondElement2?
                                        <table>                               
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>                              
                                                {padata.filter((proda, i) => {
                                                    if(query == "") {
                                                        return proda
                                                    }
                                                    else if((proda.prodauct.name || proda.is_approved || proda.status || proda.type || proda.expiry_date || proda.brand || proda.price || proda.description || proda.category).toLowerCase().includes(query.toLowerCase())) {
                                                        return proda
                                                    }
                                                })
                                                .map((proda, i) => (
                                                    <tr key={i}>
                                                        <td>{proda.product_name}</td>
                                                        <td>{proda.category}</td>
                                                        <td>{proda.price}</td>
                                                        <td>{}</td> 
                                                        <td>{proda.expiry_date}</td>                                    
                                                        { proda.is_approved == 0 ? 
                                                            <td id="actbtn">
                                                                <button id="Vappbtn" onClick={e=>prodapp(e,proda.id)} className="vbtn">Approve</button>
                                                            </td> : null
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    :null}
                                    { thirdElement2?
                                        <table>                               
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>                              
                                                {pidata.filter((prodi, i) => {
                                                    if(query == "") {
                                                        return prodi
                                                    }
                                                    else if((prodi.prodiuct.name || prodi.is_approved || prodi.status || prodi.type || prodi.expiry_date || prodi.brand || prodi.price || prodi.description || prodi.category).toLowerCase().includes(query.toLowerCase())) {
                                                        return prodi
                                                    }
                                                })
                                                .map((prodi, i) => (
                                                    <tr key={i}>
                                                        <td>{prodi.product_name}</td>
                                                        <td>{prodi.category}</td>
                                                        <td>{prodi.price}</td>
                                                        <td>{}</td> 
                                                        <td>{prodi.expiry_date}</td>                                    
                                                        { prodi.is_approved == 0 ? 
                                                            <td id="actbtn">
                                                                <button id="Vappbtn" onClick={e=>prodapp(e,prodi.id)} className="vbtn">Approve</button>
                                                            </td> : null
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
                                    <h3>New products</h3>
                                    <span></span>
                                </span>
                            </div>
                        </span>
                    :null}
                </div>
            </div>

        </div>
    )
}

export default Vendors
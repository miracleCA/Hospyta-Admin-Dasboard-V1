import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TabTitle } from '../utils/Functions';
import moment from 'moment';
import '../Assets/Cashflow.css';
import Sidebar from '../Components/Sidebar';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'

function Cashflow() {
  TabTitle('Cashflow - Admin');

  const [query, setQuery] = useState("");
  const [data, setData] = React.useState([]);
  const [pdata, setpData] = React.useState([]);
  const [wdata, setwData] = React.useState([]);
  const Token = window.localStorage.getItem("token");
  const Profit = window.localStorage.getItem("profit");

  const [firstElement, firstElementShow] = useState(true);
  const [secondElement, secondElementShow] = useState(false);
  const [thirdElement, thirdElementShow] = useState(false);
  const [buttonActive, setButtonActive] = React.useState(false);

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
    cashdata()
  }, [])

  React.useEffect(() => {
    cashpay()
  }, [])

  React.useEffect(() => {
    cashwith()
  }, [])

  function cashdata() {
    axios.get(`https://staging.hospyta.com/admin/cash-flow/tnx`, {
      headers: {
        Authorization: `Bearer ${Token}`
      }
    }).then(res => {
      console.log(res.data.data)
      if (res.data.status && (res.data.status == "success")) {
        setData(res.data.data.transactions)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  function cashpay() {
    axios.get(`https://staging.hospyta.com/admin/cash-flow/payment`, {
      headers: {
        Authorization: `Bearer ${Token}`
      }
    }).then(res => {
      console.log(res.data.data)
      if (res.data.status && (res.data.status == "success")) {
        setpData(res.data.data.payments)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  
  function cashwith() {
    axios.get(`https://staging.hospyta.com/admin/cash-flow/withdrawal`, {
      headers: {
        Authorization: `Bearer ${Token}`
      }
    }).then(res => {
      console.log(res.data.data)
      if (res.data.status && (res.data.status == "success")) {
        setwData(res.data.data.withdrawals)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const [payments, setPayments] = useState();
  const [payouts, setPayouts] = useState();
  payData();
    
  async function payData() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer" + Token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://staging.hospyta.com/admin/cash-flow/counter", requestOptions)
    .then(response => response.json())
    .then(result => 
        {
            setPayments(result.data.payments);
            setPayouts(result.data.withdrawal);
            console.log(result.data);
        }
    )
    .catch(error => console.log('error', error));
  }

  return (
    <div className="Cashflow">
      <Sidebar/>
      <div className='cashmain'>
        <div className="Topnav">
          <div id="topnav">
            <div className="col-7">
                <div className='col-12'>
                  <span  id="pagetitle">Cash flow</span>
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
          <div className="col-9 cashtrans">
            <div className='roww'>
              <div className='col-4'>
                <span id='swapnav' style={{ color: (buttonActive !== "B" && buttonActive !== "C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("A"); secondElementShow(false);thirdElementShow(false);firstElementShow(true)}}>All</span>
                <span id='swapnav' style={{ color: (buttonActive =="B" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("B"); firstElementShow(false);secondElementShow(true); thirdElementShow(false)}}>Payments</span>
                <span id='swapnav' style={{ color: (buttonActive =="C" ? "#00BDFF" : "#606C80") }} onClick={() => {setButtonActive("C"); firstElementShow(false);secondElementShow(false); thirdElementShow(true)}}>Withdrawals</span>
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
            { firstElement?
              <div className='usertrans'>
                <table>                                      
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
                    {data.filter((transaction, i) => {
                      if(query == "") {
                          return transaction
                      }
                      else if((transaction.user.name || transaction.email || transaction.updated_at || transaction.phone || transaction.status || transaction.vendor_type || transaction.date || transaction.amount || transaction.start_time || transaction.major || transaction.status || transaction.transactionable_type || transaction.city || transaction.amount || transaction.created_at).toLowerCase().includes(query.toLowerCase())) {
                          return transaction
                      }
                    })    
                    .map((transaction, i) => (
                      <tr key={i}>
                        <td>{transaction.user.name}</td>
                        <td>{transaction.transactionable_type}</td>
                        <td>
                          {Intl.NumberFormat("en-NG", {
                            style: 'currency',
                            currency: 'NGN'
                          }).format(transaction.amount)}
                        </td>
                        <td>{moment(transaction.updated_at).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                        <td style={{ color: (transaction.status == "successful" ? "#007500"  : transaction.status == "pending" ? "#FEDE00"  : transaction.status == "accepted" ? "#000000" : "#FF0000") }}>{transaction.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            :null}
            { secondElement?
              <div className='usertrans'>
                <table>                                      
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
                    {pdata.filter((pay, i) => {
                      if(query == "") {
                          return pay
                      }
                      else if((pay.user.name || pay.email || pay.amount || pay.updated_at || pay.phone || pay.status || pay.vendor_type || pay.date || pay.start_time || pay.major || pay.status || pay.transactionable_type || pay.city || pay.amount || pay.created_at).toLowerCase().includes(query.toLowerCase())) {
                          return pay
                      }
                    })    
                    .map((pay, i) => (
                        <tr key={i}>
                          <td>{pay.user.name}</td>
                          <td>{pay.transactionable_type}</td>
                          <td>{Intl.NumberFormat("en-NG", {
                              style: 'currency',
                              currency: 'NGN'
                            }).format(pay.amount)}
                          </td>
                          <td>{moment(pay.updated_at).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                          <td style={{ color: (pay.status == "success" ? "#007500"  : "#FF0000")}}>{pay.status}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            :null}
            { thirdElement?
              <div className='usertrans'>
                <table>                                      
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
                    {wdata.filter((withd, i) => {
                      if(query == "") {
                          return withd
                      }
                      else if((withd.user.name || withd.email || withd.amount || withd.updated_at || withd.phone || withd.status || withd.vendor_type || withd.date || withd.start_time || withd.major || withd.status || withd.transactionable_type || withd.city || withd.amount || withd.created_at).toLowerCase().includes(query.toLowerCase())) {
                          return withd
                      }
                    })    
                    .map((withd, i) => (
                        <tr key={i}>
                          <td>{withd.user.name}</td>
                          <td>{withd.transactionable_type}</td>
                          <td>{Intl.NumberFormat("en-NG", {
                              style: 'currency',
                              currency: 'NGN'
                            }).format(withd.amount)}
                          </td>
                          <td>{moment(withd.updated_at).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                          <td>{withd.status}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            :null}
          </div>
          <div className="col-3" id="flexdiv">
            <span id="flexdata">
              <h3>Payment</h3>
              <span>{Intl.NumberFormat("en-NG", {
                style: 'currency',
                currency: 'NGN'
              }).format(payments)}</span>
            </span>
            <span id="flexdata">
              <h3>Withdrawal</h3>
              <span>{Intl.NumberFormat("en-NG", {
                style: 'currency',
                currency: 'NGN'
              }).format(payouts)}</span>
            </span>
            <span id="flexdata">
              <h3>Profit</h3>
              <span>{Intl.NumberFormat("en-NG", {
                style: 'currency',
                currency: 'NGN'
                }).format(Profit)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cashflow;
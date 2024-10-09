import React, {useState} from "react";
import axios from "axios";
import moment from "moment";
import '../Assets/Transactions.css';
import { useNavigate } from "react-router-dom";
import Summary from '../Components/Summary';
import '../Assets/Topnav.css';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'

function Transactions(props) {

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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
  
  const Token = window.localStorage.getItem("token");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    transdata()
  }, [])

  function transdata() {
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

  return (
    <>
      <div className="Topnav">
        <div id="topnav">
          <div className="col-7">
            <div className='col-12'>
              <span id="pagetitle">{props.page1}</span>
              <span id="pagetitle">{props.page2}</span>
              <span id="pagetitle">{props.page3}</span>
            </div>
          </div>
          <div className="col-5">
            <div id="profile">
              <div id="prosrch">
                <input id='searchbar' 
                  type="search"
                  placeholder="&#61442; Search" 
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
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
      <Summary/>
      <div className="Transactions">
        <div className="col-12">
          <div className='usertrans'>
            <h2>Cashflow</h2>
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
                    else if((transaction.user.name || transaction.updated_at || transaction.email || transaction.phone || transaction.status || transaction.vendor_type || transaction.date || transaction.start_time || transaction.major || transaction.status || transaction.transactionable_type || transaction.city || transaction.amount || transaction.created_at).toLowerCase().includes(query.toLowerCase())) {
                      return transaction
                    }
                  })
                  .slice(0, 4).map((transaction, i) => (
                    <tr key={i}>
                      <td>{transaction.user.name}</td>
                      <td>{transaction.transactionable_type}</td>
                      <td>{Intl.NumberFormat("en-NG", {
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
        </div>
      </div>
    </>
  );
}

export default Transactions;

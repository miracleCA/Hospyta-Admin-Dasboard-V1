import React, {useState} from "react";
import Login from "../Pages/Login";
import '../Assets/Summary.css';
import Bags from '../Icons/Bags.png'
import File from '../Icons/File.png'
import Money from '../Icons/Money.png'
import Net from '../Icons/Network.png'
import Sale from '../Icons/Sale.png'
import User from '../Icons/User.png'

function Summary(){

  const Token = window.localStorage.getItem("token");
  const Profit = window.localStorage.getItem("profit");

  const [sales, setSale] = useState("");
  const [products, setProduct] = useState("");
  const [users, setUser] = useState("");
  const [orders, setOrder] = useState("");
  const [booking, setBooking] = useState("");
  apiData();
    
  async function apiData(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer" + Token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://staging.hospyta.com/admin/dashboard/summary", requestOptions)
    .then(response => response.json())
    .then(result => 
        {
          console.log(result)
            setSale(result.data.sales);
            setProduct(result.data.products);
            setUser(result.data.users);
            setOrder(result.data.orders);
            setBooking(result.data.bookings);
        }
    )
    .catch(error => console.log('error', error));
  }
  return (
    <div className="Summary">
        <h2>Summary</h2>
        <div id="sumcont">
          <div className="col-2">
            <span id="sumdata">
              <span id="sumimg">
                <img alt='' src={Sale}/>
              </span>
              <span id="suminfo">
                <p id="id">Total Sales</p>
                <p id="figure">{Intl.NumberFormat("en-NG", {
                          style: 'currency',
                          currency: 'NGN'
                        }).format(sales)}</p>
                <p id="increase"></p>
              </span>
            </span>
          </div>
          <div className="col-2">
            <span id="sumdata">
              <span id="sumimg">
                <img src={Bags} />
              </span>
              <span id="suminfo">
                <p id="id">Product Sold</p>
                <p id="figure">{products}</p>
                <p id="increase"></p>
              </span>
            </span>
          </div>
          <div className="col-2">
            <span id="sumdata">
              <span id="sumimg">
                <img src={Money} />
              </span>
              <span id="suminfo">
                <p id="id">Profit</p>
                <p id="figure">{Intl.NumberFormat("en-NG", {
                              style: 'currency',
                              currency: 'NGN'
                            }).format(Profit)}</p>
                <p id="increase"></p>
              </span>
            </span>
          </div>
          <div className="col-2">
            <span id="sumdata">
              <span id="sumimg">
                <img src={User} />
              </span>
              <span id="suminfo">
                <p id="id">New Users</p>
                <p id="figure">{users}</p>
                <p id="increase"></p>
              </span>
            </span>
          </div>
          <div className="col-2">
            <span id="sumdata">
              <span id="sumimg">
                <img src={File} />
              </span>
              <span id="suminfo">
                <p id="id">Total Orders</p>
                <p id="figure">{orders}</p>
                <p id="increase"></p>
              </span>
            </span>
          </div>
          <div className="col-2">
            <span id="sumdata">
              <span id="sumimg">
                <img src={Net} />
              </span>
              <span id="suminfo">
                <p id="id">New sessions</p>
                <p id="figure">{booking}</p>
                <p id="increase"></p>
              </span>
            </span>
          </div>
        </div>
    </div>
  );
}

export default Summary;
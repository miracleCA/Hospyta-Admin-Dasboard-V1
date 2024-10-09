import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../utils/Functions';
import axios from "axios";
import moment from 'moment';
import '../Assets/Ambulance.css';
import '../Assets/Vendorsales.css';
import Sidebar from '../Components/Sidebar';
import Topnav from '../Components/Topnav';

function Vendorsales() {
    TabTitle('Vendors Sales - Admin');

    const Token = window.localStorage.getItem("token");
    const [query, setQuery] = useState("");
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();

    const [totalrev, setTotalrev] = useState();
    const [totalsales, setTotalsales] = useState();
    const [delivered, setDelivered] = useState();
    const [cancelled, setCancelled] = useState();
    const [pending, setPending] = useState();
    Vsalessum();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
        navigate("/login");
        }
    })

    const onSubmitClicked = async (e) => {
        e.preventDefault()
    
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer" + " " + process.env.token
    
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
        Vsalesdata()
    }, [])

    function Vsalesdata() {
        axios.get(`https://staging.hospyta.com/admin/sales`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setData(res.data.data.sales)
          }
        }).catch(err => {
          console.log(err)
        })
    }

    function Vsalessum() {
        axios.get(`https://staging.hospyta.com/admin/sales/summary`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          console.log(res.data.data)
          if (res.data.status && (res.data.status == "success")) {
            setTotalrev(res.data.data.total_revenue);
            setCancelled();
            setDelivered();
            setPending();
            setTotalsales(res.data.data.total_sales);
          }
        }).catch(err => {
          console.log(err)
        })
    }


    return (
        <div className='Vendorsales'>
            <Sidebar/>
            <div className='Vendorsalesmain'>
                <Topnav
                    page1="Vendor Sales"
                />
                <div className='row first'>
                    <div id="rowfolder" className="col-12 cashtrans">
                        <div className='nav1'>
                            <span className='col-2'>
                                <b>Total Revenue</b>
                                <b id="amoount">{Intl.NumberFormat("en-NG", {
                                    style: 'currency',
                                    currency: 'NGN'
                                }).format(totalrev)}</b>
                            </span>
                            <span className='col-2'>
                                <b>Total Sales</b>
                                <b id="amoount">{totalsales}</b>
                            </span>
                            <span className='col-6'>
                                <span id="navvv">
                                    <b>Delivered</b>
                                    <b id="amoount">{delivered}</b>
                                </span>
                                <span id="navv">
                                    <b> Cancelled</b>
                                    <b id="amoount">{cancelled}</b>
                                </span>
                                <span id="navv">
                                    <b>Pending</b>
                                    <b id="amoount">{pending}</b>
                                </span>
                            </span>
                        </div>
                        <div className='row' id="nav2">
                            <div className='col-4'>
                                <span>All</span>
                                <span>Delivered</span>
                                <span>Pending</span>
                                <span>Cancel</span>
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
                        <div className='usertrans'>
                            <table>                           
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Buyer Contact</th>
                                    </tr>
                                </thead>
                                <tbody>                              
                                    {data.filter((vsales, i) => {
                                        if(query == "") {
                                            return vsales
                                        }
                                        else if((vsales.name || vsales.email || vsales.phone || vsales.status || vsales.vendor_type || vsales.date || vsales.start_time || vsales.major || vsales.status || vsales.transactionable_type || vsales.city || vsales.amount || vsales.created_at).toLowerCase().includes(query.toLowerCase())) {
                                            return vsales
                                        }
                                    })
                                    .map((vsales, i) => (
                                        <tr key={i}>
                                            <td>{vsales.product.name}</td>
                                            <td>{vsales.buyer.name}</td>
                                            <td>{vsales.product.quantity}</td>
                                            <td>{moment(vsales.date).format("DD-MM-YY").replace('-', '/').replace('-', '/')}</td>
                                            <td>{vsales.buyer.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="col-3" id="flexdiv">
                        <span className='products'>
                            <h3>Hot Products</h3>
                            <div className='row'>
                                <span>
                                    <b>1. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>2. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>3. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>4. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>5. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>6. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>7. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>8. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>9. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>10.</b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            
                            <button>More</button>

                        </span>
                        <span className='products'>
                            <h3>Slow Moving Products</h3>
                            <div className='row'>
                                <span>
                                    <b>1. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>2. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>3. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>4. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>5. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>6. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>7. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>8. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>9. </b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            <div className='row'>
                                <span>
                                    <b>10.</b>    
                                </span>
                                <span>
                                    <b>Products</b>         
                                </span>
                                <span>N13,000</span>
                                <span id="Vproddet">Details</span>
                            </div>
                            
                            <button>More</button>

                        </span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Vendorsales;

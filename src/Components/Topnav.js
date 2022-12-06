import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../Assets/Topnav.css';
import Bags from '../Icons/Bags.png'
import Power from '../Icons/Power.png'

function Topnav(props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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

  return (
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
  );
}

export default Topnav;
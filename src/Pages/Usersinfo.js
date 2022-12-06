import '../Assets/Usersinfo.css';
import Sidebar from '../Components/Sidebar';
import Topnav from '../Components/Topnav';

function Usersinfo() {
  return (
    <div className='Usersinfo'>
      <Sidebar/>
      <div className='Usersinfomain'>
        <Topnav/>
        <div id='inforow1'>
            <span className='col-5'>
              <span className='col-4' id='imgcontr'>
                <img/>
              </span>
              <span className='col-8' id='firstcoll'>
                <div className='row' id='fname'>
                  <span id='title'>Full Name</span>
                  <span id='data'>10000</span>
                </div>
                <div className='row' id='Age'>
                  <span id='title'>Age</span>
                  <span id='data'>10000</span>
                </div>
                <div className='row' id='email'>
                  <span id='title'>Email</span>
                  <span id='data'>10000</span>
                </div>
                <div className='row' id='cont'>
                  <span id='title'>Contact Number</span>
                  <span id='data'>10000</span>
                </div>
              </span>
            </span>
            <span className='col-3'>
                <div className='row' id='count'>
                  <span id='title'>Country</span>
                  <span id='data'>10000</span>
                </div>
                <div className='row' id='state'>
                  <span id='title'>State</span>
                  <span id='data'>10000</span>
                </div>
                <div className='row' id='City'>
                  <span id='title'>City</span>
                  <span id='data'>10000</span>
                </div>
                <div className='row' id='gender'>
                  <span id='title'>Gender</span>
                  <span id='data'>10000</span>
                </div>
            </span>
            <span className='col-4' id='lastcoll'>
                <div className='row' id='Bgroup'>
                    <span id='title'>Blood Group</span>
                    <span id='data'>10000</span>
                </div>
                <div className='row' id='Gtype'>
                  <span id='title'>Genotype</span>
                  <span id='data'>10000</span>
                </div>
                <div className='row' id='Weight'>
                  <span id='title'>Weight - KG</span>
                  <span id='data'>10000</span>
                </div>
                <div className='row' id='Height'>
                  <span id='title'>Height - FTS</span>
                  <span id='data'>10000</span>
                </div>
            </span>
        </div>
        <div id='maindata'>
          <h2>Recent Transactions</h2>
        </div>
        <div className='usertransroww'>
          <div className='row'>
            <span id="Utranstitle">Great</span>
            <span id="Utranstitle">Great</span>
            <span id="Utranstitle">Great</span>
            <span id="Utranstitle">Great</span>
            <span id="Utranstitle">Great</span>
            <span id="Utranstitle">Great</span>
          </div>
          <div className='row'>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
          </div>
          <div className='row'>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
          </div>
          <div className='row'>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
          </div>
          <div className='row'>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
          </div>
          <div className='row'>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
          </div>
          <div className='row' id='lastrow'>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
            <span id="Utransdata">Great</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usersinfo;
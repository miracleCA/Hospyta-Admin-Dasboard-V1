import '../Assets/Mainsec.css';
import Transactions from '../Components/Transactions';
import Vendor from '../Components/Vendor';

function Mainsec() {
  return (
    <div className="Mainsec">
        <Transactions/>
        <Vendor/>
    </div>
  );
}

export default Mainsec;
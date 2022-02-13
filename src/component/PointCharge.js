import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useEffect, useState} from 'react'
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';
import Preloader from './Layout/preloader'
import { setRangeValue } from 'tsparticles';

const baseurl = process.env.REACT_APP_API_BASE_URL;
const PointCharge = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [point, setPoint] = useState('');
  const [value, setValue] = useState('')
  const [value1, setValue1] = useState('')
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
        return;
    }
  
      const card = elements.getElement(CardElement);
      console.log(card)
      setLoading(true);
      const result = await stripe.createToken(card);
      setLoading(false)
      if (result.error) {
        console.log(result.error.message);
      } else {
        stripeTokenHandler(result.token);
      }
  };  

  async function stripeTokenHandler(stripetoken) {
    setLoading(true);
    var userData = JSON.parse(localStorage.userData);
    var token = userData.token;
    var amount1 = parseInt(amount.replace(/,/g, ''));
    var point1 = parseInt(point.replace(/,/g, ''));
    var data = JSON.stringify({stripetoken:stripetoken.id, amount:amount1, point:point1});
    var config = {
        method: 'POST',
        url: `${baseurl}/api/point/charge`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data:data
    };
    axios(config)
    .then((response) => {
        console.log(response);
        setLoading(false)
        window.location.assign('/home')
    })
    .catch((error)=>{
        
        setLoading(false);
        if (error.response) {
            if(error.response.status===401){
                localStorage.removeItem("userData");
                window.location.assign('/');
            }
        }
    })
  }

  const handlChangePoint = (event)=>{
    setAmount(parseInt(parseInt(value) * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setPoint(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  
  const handleChangeAmount = (event)=>{
    setPoint(parseInt(parseInt(value1) / 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setAmount(value1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  const handlePointKeyPress = (e) => {
    if (e.keyCode == 48 || e.keyCode == 96) {
      setValue(value.toString() + '0')
    }
    if (e.keyCode == 49 || e.keyCode == 97) {
      setValue(value.toString() + '1')
    }
    if (e.keyCode == 50 || e.keyCode == 98) {
      setValue(value.toString() + '2')
    }
    if (e.keyCode == 51 || e.keyCode == 99) {
      setValue(value.toString() + '3')
    }
    if (e.keyCode == 52 || e.keyCode == 100) {
      setValue(value.toString() + '4')
    }
    if (e.keyCode == 53 || e.keyCode == 101) {
      setValue(value.toString() + '5')
    }
    if (e.keyCode == 54 || e.keyCode == 102) {
      setValue(value.toString() + '6')
    }
    if (e.keyCode == 55 || e.keyCode == 103) {
      setValue(value.toString() + '7')
    }
    if (e.keyCode == 56 || e.keyCode == 104) {
      setValue(value.toString() + '8')
    }
    if (e.keyCode == 57 || e.keyCode == 105) {
      setValue(value.toString() + '9')
    }
    if (e.keyCode == 8) {
      if (value != '') {
        setValue(value.slice(0, -1));
      }
    }
  }

  const handleAmountKeyPress = (e) => {
    if (e.keyCode == 48 || e.keyCode == 96) {
      setValue1(value1.toString() + '0')
    }
    if (e.keyCode == 49 || e.keyCode == 97) {
      setValue1(value1.toString() + '1')
    }
    if (e.keyCode == 50 || e.keyCode == 98) {
      setValue1(value1.toString() + '2')
    }
    if (e.keyCode == 51 || e.keyCode == 99) {
      setValue1(value1.toString() + '3')
    }
    if (e.keyCode == 52 || e.keyCode == 100) {
      setValue1(value1.toString() + '4')
    }
    if (e.keyCode == 53 || e.keyCode == 101) {
      setValue1(value1.toString() + '5')
    }
    if (e.keyCode == 54 || e.keyCode == 102) {
      setValue1(value1.toString() + '6')
    }
    if (e.keyCode == 55 || e.keyCode == 103) {
      setValue1(value1.toString() + '7')
    }
    if (e.keyCode == 56 || e.keyCode == 104) {
      setValue1(value1.toString() + '8')
    }
    if (e.keyCode == 57 || e.keyCode == 105) {
      setValue1(value1.toString() + '9')
    }
    if (e.keyCode == 8) {
      if (value1 != '') {
        setValue1(value1.slice(0, -1));
      }
    }
  }

  return (
    <>
    <div className="container">
    <Header pageName="ポイント" />
        <form onSubmit={handleSubmit}>
            <div className="seminar-card seminar-detail-card">
                    <h3 style={{color:'black'}}>ポイント</h3>
                    <div className="time-input-container">
                        <div className="time-input-box">
                            <label >ポイント</label>
                            <input type="text" value={point == 'NaN'? '': point} onChange={handlChangePoint} onKeyDown={handlePointKeyPress} />
                        </div>
                        <div className="time-input-box">
                            <label >JPY</label>
                            <input type="text" value={amount == 'NaN'? '': amount} onChange={handleChangeAmount} onKeyDown={handleAmountKeyPress} />
                        </div>
                    </div>
                <div className="card-element-container">
                <CardElement/>
                </div>
            
                <div className="profile-input-upload event-input-upload">
                    <button type="submit">今支払う</button>
                </div>
            </div>
        </form>
    <Footer/>
    </div>
    {loading && <Preloader/>}
    </>
  );
};

export default PointCharge;
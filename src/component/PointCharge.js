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

  const handlChangePoint = (e) =>{
    setPoint((e.target.value.replace(/,/g, "")).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    setAmount((e.target.value.replace(/,/g, "")).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }
  
  const handleChangeAmount = (e) =>{
    setPoint((e.target.value.replace(/,/g, "")).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    setAmount((e.target.value.replace(/,/g, "")).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }

  return (
    <>
    <div className="container">
      <div className="container-main">
        <Header pageName="ポイント" />
          <form onSubmit={handleSubmit}>
            <div className="seminar-card seminar-detail-card">
              <div className="time-input-container">
                  <div className="time-input-box">
                      <label >ポイント</label>
                      <input type="text" value={point == 'NaN'? '': point} onChange={handlChangePoint}/>
                  </div>
                  <div className="time-input-box">
                      <label >JPY</label>
                      <input type="text" value={amount == 'NaN'? '': amount} onChange={handleChangeAmount}/>
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
    </div>
    {loading && <Preloader/>}
    </>
  );
};

export default PointCharge;
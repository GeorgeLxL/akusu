import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useEffect, useState} from 'react'
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';
import Preloader from './Layout/preloader'

const baseurl = process.env.REACT_APP_API_BASE_URL;
const PointCharge = () => {
  const stripe = useStripe();
  const elements = useElements();
  const[amount, setAmount] = useState(0);
  const[point, setPoint] = useState(0);
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
    var data = JSON.stringify({stripetoken:stripetoken.id, amount:amount, point:point});
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
    setPoint(event.target.value);
    setAmount(event.target.value * 10)
  }
  
  const handleChangeAmount = (event)=>{
    setAmount(event.target.value);
    setPoint(parseInt(event.target.value / 10));
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
                            <input type="number" value={point} onChange={handlChangePoint} />
                        </div>
                        <div className="time-input-box">
                            <label >JPY</label>
                            <input type="number" value={amount} onChange={handleChangeAmount} />
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
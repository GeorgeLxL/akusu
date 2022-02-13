import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import Preloader from './Layout/preloader';
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function ScanAmount() {

    const history = useHistory();
    const location = useLocation();
    const email = location.state?.email

    const [loading, setLoading] = useState(false);
    const [totalPoint, settotalPoint] = useState(0);
    const [sendPoint, setSendPoint] = useState('');
    const [value, setValue] = useState('')
    const [errorReceiver, setErrorReceiver] = useState('');
    const [errorPoint, setErrorPoint] = useState('');
    const [receiver, setReceiver] = useState('');

    useEffect(()=>{
        setLoading(true)
        getUserdata()
    },[])

    const getUserdata = () => {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        
        var data = JSON.stringify({'email': email});
        var config = {
            method: 'post',
            url: `${baseurl}/api/account/getScanProfile1`,
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data : data,
        };
        axios(config)
        .then((response) => {
            var userData = response.data.user;
            setLoading(false)
            settotalPoint(userData.userPoint)
            setReceiver(response.data.receiver)
        })
        .catch((error)=>{
            setLoading(false)
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
            }
        })
    }

    const handlChangeSendPoint = (e) =>{
        setSendPoint(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
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
        if (parseFloat(value) > parseFloat(totalPoint)) setValue(totalPoint.toString());
    }

    const sendPointConfirm = (e) => {
        e.preventDefault();
        
        var sendpoint1 = parseFloat(sendPoint.replace(/,/g, ''))
        if(email==="")
        {
            setErrorReceiver("受信者のメールアドレスを入力してください。")
            return;
        }
        setLoading(true)
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token;
        var data = JSON.stringify({email:email, point:sendpoint1});
        var config = {
            method: 'POST',
            url: `${baseurl}/api/point/scan`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            data:data
        };
        axios(config)
        .then((response) => {
            console.log(response);
            setLoading(false);
            history.push({
                pathname: 'send_success',
                state: {
                    point: sendpoint1,
                    receiver: receiver
                }
            })
        })
        .catch((error)=>{
            setLoading(false);
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
                if(error.response.status===400) {
                    if(error.response.data.send_yourself)
                    {
                        setErrorReceiver("自分にポイントを送ることはできません。")
                    }
                    
                    if(error.response.data.send_user_error){
                        setErrorReceiver("受信者が存在しません。")
                    }
                    if(error.response.data.points)
                    {
                        setErrorPoint("ポイントが足りません。")
                    }
                }
            }
        })
    }

    return(
        <>
            <div className="container">
                <Header pageName="バーコードで送受信"/>
                    <div className="seminar-detail-card">
                        <div className='scan'>
                            <h2>スキャンに成功しました</h2>
                            <h4>現在の保有ポイント : {totalPoint}</h4>
                            <div className="time-input-box">
                                <label >送信ポイント</label>
                                <input type="text" value={sendPoint == 'NaN'? '': sendPoint} onChange={handlChangeSendPoint}  onKeyDown={handlePointKeyPress} />
                            </div>
                            <span className="error">{errorReceiver}</span>
                            <span className="error">{errorPoint}</span>
                            <h4>送信相受</h4>
                            <h4>{receiver}</h4>
                            <a onClick={sendPointConfirm}>ポイントを送信</a>
                        </div>
                    </div>
                <Footer/>
            </div>
            {loading && <Preloader/> }
        </>
    )
}

export default ScanAmount;
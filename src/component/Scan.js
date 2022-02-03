import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';

import Preloader from './Layout/preloader';
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function Scan() {

    const [loading, setLoading] = useState(false);
    const [totalPoint, settotalPoint] = useState(0);
    const [sendPoint, setSendPoint] = useState(0);
    const [receivePoint, setReceivePoint] = useState(0);
    const [value, setValue] = useState('');
    const [errorPoint, setErrorPoint] = useState('')

    useEffect(()=>{
        var userData = JSON.parse(localStorage.userData);
        var email = userData.email
        getUserdata()
        setValue(email.toString() + ' ' + sendPoint.toString())
    },[sendPoint])

    const getUserdata = () => {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'get',
            url: `${baseurl}/api/account/getProfile`,
            headers: { 
            'Authorization': 'Bearer ' + token,
            },
                data : {},
        };
        axios(config)
        .then((response) => {
            var userData = response.data.user;
            setLoading(false)
            settotalPoint(userData.userPoint)
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

    const handlChangeSendPoint = e =>{
        if (e.target.value < parseFloat(totalPoint)) {
            setSendPoint(e.target.value)
            setReceivePoint(e.target.value * 0.973)
        }
        else {
            setSendPoint(totalPoint)
            setReceivePoint(totalPoint * 0.973)
        }
        if (e.target.value < 1) setErrorPoint('送信するポイントの量を入力してください。')
        else setErrorPoint('')
    }

    const handleChangeReceive =  e =>{
        if (e.target.value < (parseFloat(totalPoint) * 0.973)) {
            setSendPoint(e.target.value / 0.973)
            setReceivePoint(e.target.value)
        }
        else {
            setSendPoint(totalPoint)
            setReceivePoint(totalPoint * 0.973)
        }
        if (e.target.value < 0.973) setErrorPoint('送信するポイントの量を入力してください。')
        else setErrorPoint('')
    }

    return(
        <>
            <div className="container">
                <Header pageName="バーコードで送受信"/>
                    <div className="seminar-detail-card">
                        <div className='scan'>
                            <h2>バーコードで支払う</h2>
                            <h4>現在の保有ポイント : {totalPoint}</h4>
                            <div className="time-input-container">
                                <div className="time-input-box">
                                    <label >送信ポイント</label>
                                    <input type="number" value={sendPoint} onChange={(e)=>handlChangeSendPoint(e)} />
                                </div>
                                <div className="time-input-box">
                                    <label >受け取りポイント</label>
                                    <input type="number" value={receivePoint} onChange={(e)=>handleChangeReceive(e)} />
                                </div>
                            </div>
                            <span className="error">{errorPoint}</span>
                            <div className='scan-qrcode-container'>
                                <QRCode size={500} value={value} />
                            </div>
                            <Link to="/scan/receive">スキャンしで受け取る</Link>
                        </div>
                    </div>
                <Footer/>
            </div>
            {loading && <Preloader/> }
        </>
    )
}

export default Scan;
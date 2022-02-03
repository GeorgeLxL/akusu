import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRScan from 'qrscan';

import Preloader from './Layout/preloader';
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function ScanReceive() {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [sendPoint, setSendPoint] = useState(0);
    const [errorSender, setErrorSender] = useState('')
    const [errorPoint, setErrorPoint] = useState('')

    useEffect(()=>{
        const data = 'xxx@gmail.com 100'
        const email = data.split(' ')[0]
        const point = data.split(' ')[1]
        console.log(email)
    },[])

    const handleFind = (value) => {
        setEmail(value.split(' ')[0])
        setSendPoint(parseFloat(value.split(' ')[1]))
        if(email==="")
        {
            setErrorSender('送信者のメールアドレスを入力してください。')
        }
        if(0<sendPoint<1)
        {
            setErrorPoint("送信するポイントの量を入力してください。")
        }
        setLoading(true);
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token;
        var data = JSON.stringify({email:email, point:sendPoint});
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
            window.location.assign('/home')
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
                        setErrorSender("自分にポイントを送ることはできません。")
                    }
                    
                    if(error.response.data.send_user_error){
                        setErrorSender("送信者が存在しません。")
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
                            <h2>スキャンしで受け取る</h2>
                            <div className='scan-qrcode-container'>
                                <QRScan onFind={handleFind} />
                            </div>
                            <spna className="error">{errorSender}</spna>
                            <span className="error">{errorPoint}</span>
                            <Link to="/scan">バーコードで支払う</Link>
                        </div>
                    </div>
                <Footer/>
            </div>
            {loading && <Preloader/> }
        </>
    )
}

export default ScanReceive;
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';

import Preloader from './Layout/preloader';
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function Scan() {

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [totalPoint, settotalPoint] = useState(0);
    const [value, setValue] = useState('');

    useEffect(()=>{
        var userData = JSON.parse(localStorage.userData);
        var email = userData.email
        setValue(email.toString())
        getUserdata()
        const interval = setInterval(() => getScanStatus(), 3000);
        return () => clearInterval(interval)
    },[])

    const getUserdata = () => {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'post',
            url: `${baseurl}/api/account/getScanProfile`,
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

    const getScanStatus = () => {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'post',
            url: `${baseurl}/api/point/getScanStatus`,
            headers: { 
            'Authorization': 'Bearer ' + token,
            },
                data : {},
        };
        axios(config)
        .then((response) => {
            console.log(response.data)
            if (response.data.scanStatus===1 && response.data.sender !== null && response.data.senderID !== null && response.data.point !== null) {
                history.push({
                    pathname: '/scan/receive_success',
                    state: {
                        sender: response.data.sender,
                        senderID: response.data.senderID,
                        point: response.data.point
                    }
                })
            }
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

    return(
        <>
            <div className="container">
                    <div className="container-main">
                <Header pageName="バーコードで送受信"/>
                    <div className="seminar-detail-card">
                        <div className='scan'>
                            <h2>バーコードで送受信</h2>
                            <h4>現在の保有ポイント : {totalPoint}</h4>
                            <div className='scan-qrcode-container'>
                                <QRCode size={500} value={value} />
                            </div>
                            <Link to="/scan/send">スキャンして送る</Link>
                        </div>
                    </div>
                <Footer/>
                </div>
            </div>
            {loading && <Preloader/> }
        </>
    )
}

export default Scan;
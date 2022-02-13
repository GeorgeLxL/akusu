import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Preloader from './Layout/preloader';
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function ScanReceiveSuccess() {

    const location = useLocation();
    const point = location.state?.point
    const sender = location.state?.sender
    const senderID = location.state?.senderID

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setScanStatus();
    },[])

    const setScanStatus = () => {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var data = JSON.stringify({'sender': senderID})
        var config = {
            method: 'post',
            url: `${baseurl}/api/point/setScanStatus`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data : data,
        };
        axios(config)
        .then((response) => {
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
                <Header pageName="成功"/>
                    <div className="seminar-detail-card">
                        <div className='scan'>
                            <h2>ポイントを受信しました。</h2>
                            <div className='scan-table'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>受け取りポイント</td>
                                            <td> : {point}pt</td>
                                        </tr>
                                        <tr>
                                            <td>送信元</td>
                                            <td> : {sender}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Link to="/home">トップページ</Link>
                        </div>
                    </div>
                <Footer/>
            </div>
            {loading && <Preloader/> }
        </>
    )
}

export default ScanReceiveSuccess;
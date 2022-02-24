import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import QRScan from 'qrscan';

import Preloader from './Layout/preloader';
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function ScanSend() {
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [errorReceiver, setErrorReceiver] = useState('')

    const handleFind = (value) => {
        setEmail(value.toString())
        if(email==="")
        {
            setErrorReceiver('受信者のメールアドレスを入力してください。')
            return;
        }
        history.push({
            pathname: 'send_amount',
            state: {
                email: email
            },
        })
    }

    return(
        <>
            <div className="container">
                <div className="container-main">
                <Header pageName="バーコードで送受信"/>
                    <div className="seminar-detail-card">
                        <div className='scan'>
                            <h2>スキャンして送る</h2>
                            <div className='scan-qrcode-container'>
                                <QRScan onFind={handleFind} />
                            </div>
                            <span className="error">{errorReceiver}</span>
                            <Link to="/scan">バーコードで送受信</Link>
                            {/* <button onClick={()=>history.push({
                                pathname: 'send_amount',
                                state: {
                                    email: 'geolxl@hotmail.com'
                                },
                            })}>aaa</button> */}
                        </div>
                    </div>
                <Footer/>
                </div>
            </div>
            {loading && <Preloader/> }
        </>
    )
}

export default ScanSend;
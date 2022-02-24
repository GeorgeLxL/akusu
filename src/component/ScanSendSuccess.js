import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Preloader from './Layout/preloader';
import Footer from './Layout/footer';
import Header from './Layout/header';

function ScanSendSuccess() {

    const location = useLocation();
    const point = location.state?.point
    const receiver = location.state?.receiver

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        
    },[])

    return(
        <>
            <div className="container">
                <div className="container-main">
                <Header pageName="成功"/>
                    <div className="seminar-detail-card">
                        <div className='scan'>
                            <h2>ポイントを送信しました。</h2>
                            <div className='scan-table'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>送信ポイント</td>
                                            <td> : {point}pt</td>
                                        </tr>
                                        <tr>
                                            <td>送信相受</td>
                                            <td> : {receiver}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Link to="/home">トップページ</Link>
                        </div>
                    </div>
                <Footer/>
                </div>
            </div>
            {loading && <Preloader/> }
        </>
    )
}

export default ScanSendSuccess;
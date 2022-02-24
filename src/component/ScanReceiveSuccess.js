import React, { useState, useEffect, Component } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Preloader from './Layout/preloader';
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function ScanReceiveSuccess() {

    const location = useLocation();
    return(
        <ScanReceiveSuccessView location = {location} />
    )
}

class ScanReceiveSuccessView extends Component {
    constructor(props){
        super(props);
        this.state={
            verifyCode:"",
            loading:false,
            error_verificationcode:"",
            point: '',
            sender: '',
            senderID: '',
        }
    }
    

    componentDidMount() {
        const point1 = this.props.location.state?.point
        const sender1 = this.props.location.state?.sender
        const senderID1 = this.props.location.state?.senderID
        this.setState({
            point: point1,
            sender: sender1,
            senderID: senderID1
        })
        this.setScanStatus(senderID1);
    }

    setScanStatus = (senderID) => {
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
            this.setState({loading: false})
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
            }
        })
    }

    render() {
        const {
            senderID,
            point,
            sender,
            loading
        } = this.state
        return(
            <>
                <div className="container">
                    <div className="container-main">
                    <Header pageName="成功"/>
                        <div className="seminar-detail-card">
                            <div className='scan'>
                                <h2>ポイントを受信しました。</h2>
                                <p>{point}ポイントのうち決済手数料(2.75%)を引いて{parseInt(parseInt(point) * 0.9725)}ポイントを受け取りました。</p>
                                <div className='scan-table'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>受け取りポイント</td>
                                                <td> : {parseInt(parseInt(point) * 0.9725)}pt</td>
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
                </div>
                {loading && <Preloader/> }
            </>
        )
    }
}

export default ScanReceiveSuccess;
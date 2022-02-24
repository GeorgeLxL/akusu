import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';
import { 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Slide,
} from '@material-ui/core';

import Preloader from './Layout/preloader';
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function Scan() {

    const history = useHistory();

    const audio = new Audio('/assets/sound/sound.mp3')

    const [loading, setLoading] = useState(false);
    const [totalPoint, settotalPoint] = useState(0);
    const [value, setValue] = useState('');
    const [sender, setSender] = useState('');
    const [senderID, setSenderID] = useState('');
    const [point, setPoint] = useState('');
    const [successModal, setSuccessModal] = useState(false);

    const interval = useRef()

    useEffect(()=>{
        if (point!=='') {
            return;
        }
        var userData = JSON.parse(localStorage.userData);
        var email = userData.email
        setValue(email.toString())
        getUserdata()
        
        interval.current = setInterval(() => getScanStatus(), 3000);
        return () => clearInterval(interval.current)
    },[point])

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
                setSender(response.data.sender)
                setSenderID(response.data.senderID)
                setPoint(response.data.point)
                setSuccessModal(true)
                audio.load()
                playAudio()
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

    const playAudio = () => {
        const audioPromise = audio.play()
        if (audioPromise !== undefined) {
            audioPromise
                .then(_ => {
                    console.log('play')
                })
                .catch(err => {
                    console.info(err)
                })
        }
    }

    const successModalClose = e => {
        history.push({
            pathname: '/scan/receive_success',
            state: {
                sender: sender,
                senderID: senderID,
                point: point
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
            <Dialog
                open={successModal}
                onClose={()=>successModalClose()}
            >
                <DialogContent>
                    <DialogContentText style={{textAlign: 'center'}}>ポイントを受理しました。</DialogContentText>
                </DialogContent>
                <a style = {{textAlign: 'center', fontSize: '20px', height: '2em', display: 'block', color: '#3f64ee'}} onClick={()=>successModalClose()}>OK</a>
            </Dialog>
            {loading && <Preloader/> }
        </>
    )
}

export default Scan;
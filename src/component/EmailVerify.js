

import React, { Component } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Preloader from './Layout/preloader'
const baseurl = process.env.REACT_APP_API_BASE_URL;

const en ={
    code: 'Confirmation code',
    confirm: 'Confirm',
    resend: 'Resend',
    error_code: 'Confirmation code incorrect',
}

const jp = {
    code: '検証コード',
    confirm: '確認',
    resend: '再送信',
    error_code: '確認コードが正しくありません。',
}

function EmailVerify() {
    const location = useLocation()
    return(
        <EmailVerifyView location = {location} />
    )
}

class EmailVerifyView extends Component{
    constructor(props){
        super(props);
        this.state={
            verifyCode:"",
            loading:false,
            error_verificationcode:"",
            email: '',
            language: JSON.parse(localStorage.language).language,
        }
    }

    componentDidMount() {
        var email1 = this.props.location.state?.email
        this.setState({email: email1})
    }

    handleChange = filedName => e =>{
        this.setState({
            [filedName]:e.target.value,
            error_verificationcode:"",
        });
    }

    handleSubmit = e =>{
        const {language} = this.state
        e.preventDefault();
        this.setState({loading:true});
        var data = JSON.stringify({email: this.state.email, code:this.state.verifyCode});
        var config = {
            method: 'POST',
            url: `${baseurl}/api/veryfyemailaddress`,
            headers: { 
            'Content-Type': 'application/json',
            },
            data:data
        };
        axios(config)
        .then((response) => {
            this.setState({loading:false});
            window.location.assign('/login')
        })
        .catch((error)=>{
            this.setState({loading:false})
            if (error.response) {
                if(error.response.status===400) {
                    this.setState({error_verificationcode: eval(language).error_code})
                }
            }
        })   
    }

    handleResendCode = e =>{
        var data = JSON.stringify({email: this.state.email})
        var config = {
            method: 'post',
            url: `${baseurl}/api/resendveryfyemailcode`,
            headers: { 
            'Content-Type': 'application/json',
            },
            data:data
        };
        axios(config)
        .then((response) => {
            this.setState({loading:false});
        })
        .catch((error)=>{
            this.setState({loading:false})
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
            }
        }) 
    }
  
    render(){
        const {language} = this.state
        return(
            <>
                <div className="container">
                    <div className="container-main">
                    <div className="seminar-card seminar-detail-card">
                        <form onSubmit={this.handleSubmit}>
                                <div className="profile-input-box">
                                    <div className="profile-title">
                                        <h3>{eval(language).code}</h3>
                                    </div>
                                    <div className="profile-input-container">
                                        <input style={{width:'100%'}} className="profile-input-input" type="number" value={this.state.verifyCode}  onChange={this.handleChange("verifyCode")} />
                                    </div>
                                    <span className="error">{this.state.error_verificationcode}</span>
                                </div>
                        
                                <div className="profile-input-upload event-input-upload">
                                    <button type="submit">{eval(language).confirm}</button><br/>
                                    <button onClick={this.handleResendCode} type="button">{eval(language).resend}</button>
                                </div>
                        </form>
                    </div>
                    </div>
                </div>
                {
                    this.state.loading && <Preloader />
                }
            </>
        )
    }
}

export default EmailVerify
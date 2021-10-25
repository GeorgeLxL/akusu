

import React, { Component } from 'react';
import axios from 'axios';
import Preloader from './Layout/preloader'
const baseurl = process.env.REACT_APP_API_BASE_URL;

class Terms extends Component{
    constructor(props){
        super(props);
        this.state={
            verifyCode:"",
            loading:false,
            error_verificationcode:""
        }
    }

    handleChange = filedName => e =>{
        this.setState({
            [filedName]:e.target.value,
            error_verificationcode:"",
        });
    }

    handleSubmit = e =>{
        e.preventDefault();
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token;
        var data = JSON.stringify({code:this.state.verifyCode});
        var config = {
            method: 'POST',
            url: `${baseurl}/api/veryfyemailaddress`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            data:data
        };
        axios(config)
        .then((response) => {
            var userData = JSON.parse(localStorage.userData);
            userData.userstatus = 1;
            localStorage.setItem("userData", JSON.stringify(userData))
            this.setState({loading:false});
            window.location.assign('/home')
        })
        .catch((error)=>{
            this.setState({loading:false})
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
                if(error.response.status===400) {
                    this.setState({error_verificationcode:"確認コードが正しくありません。"})
                }
            }
        })   
    }

    handleResendCode = e =>{
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token;
        var config = {
            method: 'get',
            url: `${baseurl}/api/resendveryfyemailcode`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            data:{}
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
       
        return(
            <div className="container">
                <header>
                    <div className="content">
                        <button onClick={() => this.props.history.goBack()} className="back-button">
                            <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.0401 20.5802L0.790059 11.45C0.400059 11.06 0.400059 10.4401 0.790059 10.0501L10.0401 0.92C10.6001 0.36 11.51 0.36 12.08 0.92C12.64 1.47 12.64 2.38001 12.08 2.93001L4.17006 10.7501L12.08 18.5701C12.64 19.1201 12.64 20.0302 12.08 20.5802C11.51 21.1402 10.6001 21.1402 10.0401 20.5802Z" fill="#6F738D"/>
                            </svg>
                        </button>
                        <h4>メールアドレスの確認</h4>
                    </div>
                </header>
                <div className="seminar-card seminar-detail-card">
                    <form onSubmit={this.handleSubmit}>
                            <div className="profile-input-box">
                                <div className="profile-title">
                                    <h3>検証コード</h3>
                                </div>
                                <div className="profile-input-container">
                                    <input style={{width:'100%'}} className="profile-input-input profile-input-input1" type="number" value={this.state.verifyCode}  onChange={this.handleChange("verifyCode")} />
                                </div>
                                <span className="error">{this.state.error_verificationcode}</span>
                            </div>
                    
                            <div className="profile-input-upload event-input-upload">
                                <button type="submit">確認</button><br/>
                                <button onClick={this.handleResendCode} type="button">再送信</button>
                            </div>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default Terms
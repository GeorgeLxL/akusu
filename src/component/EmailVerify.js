

import React, { Component } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Preloader from './Layout/preloader'
const baseurl = process.env.REACT_APP_API_BASE_URL;

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
        e.preventDefault();
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
                    this.setState({error_verificationcode:"確認コードが正しくありません。"})
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
       
        return(
            <div className="container">
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

export default EmailVerify
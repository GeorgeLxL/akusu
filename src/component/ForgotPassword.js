

import React, { Component } from 'react';
import axios from 'axios';
import Preloader from './Layout/preloader';
import { 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Slide,
} from '@material-ui/core';

const baseurl = process.env.REACT_APP_API_BASE_URL;

const en = {
    login:"Sign in",
    loginwithEmail:"Login with Email",
    email:"Email",
    password:"Password",
    remember:"Remember me",
    forgotpassword:"Forgot password",
    signup:"Sign up",
    require_error:"This field is required.",
    close:"Close",
    login_failed:"Login failed",
    login_failed_content:"Password is not correct.",
    send: 'Send',
    password_reset: 'Password Rest',
}

const jp = {
    login:"ログイン",
    loginwithEmail:"メールアドレスでログイン",
    email:"メールアドレス",
    password:"パスワード（8文字）",
    remember:"ログイン状態を保持",
    forgotpassword:"パスワードを忘れた方はこちら",
    signup:"アカウントを作成する",
    require_error:"この項目は必須です。",
    close:"閉じる",
    login_failed:"ログインに失敗",
    login_failed_content:"パスワードが正しくありません。",
    send: '送信',
    password_reset: "パスワードリセット",
}

const Transitionalert = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ForgotPassword extends Component{   
    constructor(props) {
        super(props);
        this.state={
            focusemail:false,
            loading:false,
            email:"",
            erroremail:"",
            language:JSON.parse(localStorage.language).language,
            email_sent: false,
        }
    }

    handleFocus = focusName => e=>{
        this.setState({
            [focusName]:true
        })
    }

    handleBlur = blurName => e=>{
        if(e.target.value===""){
            this.setState({
                [blurName]:false
            })
        }
    }

    handleChange = filedName => e=>{
        this.setState({
            erroremail:"",
            [filedName]:e.target.value
        })
    }

    handleSubmit = e =>{
        
        const {email, language} = this.state
        var validate = true;
        if(email===""){
            this.setState({erroremail:eval(language).require_error})
            validate = false;
        }

        if(!validate){
            return;
        }

        this.setState({loading:true})
        var data = JSON.stringify({"email":email});
        var config = {
          method: 'post',
          url: `${baseurl}/api/forgot_password`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then((response)=>{
            this.setState({
               loading:false,
               email_sent: true
            });
            window.location.assign("/password_reset")
        })
        .catch((error)=>{
            this.setState({
                loading:false
            });
            if (error.response.data.email == 'False') {
                this.setState({
                    erroremail: 'メールが正確ではありません。',
                })
            }
        });
    }


    render() {
        const {language, focusemail, email, loading, erroremail, email_sent} = this.state
        return(
            <>
                <div className="container container1">
                    <div className="main-title">
                        <img src="/assets/image/logo.png" />
                        <h2>{eval(language).password_reset}</h2>
                    </div>
                    {
                        email_sent?
                        <p className='forgot-text'>確認メールが送信されました。<br />メールをご確認ください。</p>
                        :
                        <div className="login-form content">
                            <div className={focusemail ||email!=="" ? "login-input-focused login-input-box" : "login-input-box"}>
                                <label className="login-input-title">{eval(language).email}</label>
                                <input name="email" type="email" value={email} onChange={this.handleChange("email")}  onFocus={this.handleFocus("focusemail")} onBlur={this.handleBlur("focusemail")}/>
                            </div>
                            <span style={{textAlign: 'center', display: 'block'}} className="error">{erroremail}</span>
                            <button style={{marginTop: '2em'}} onClick={this.handleSubmit} className="main-button">{eval(language).send}</button>
                            <div className="forgot-password">
                                <a href="/login">{eval(language).login}</a>
                            </div>
                        </div>
                    }
                    
                </div>
                {loading && <Preloader/>}
                
            </>
        )
    }
}

export default ForgotPassword
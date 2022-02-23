

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
    newPassword:"New Password",
    comfirmPassword:"Password Confirm",
    remember:"Remember me",
    forgotpassword:"Forgot password",
    signup:"Sign up",
    require_error:"This field is required.",
    match_error:"Passwords doesn't match.",
    close:"Close",
    password_reset: "Password Reset",
    code: 'Confirmation Code',
    confirmCode: 'Check Code',
}

const jp = {
    login:"ログイン",
    loginwithEmail:"メールアドレスでログイン",
    email:"メールアドレス",
    newPassword:"新しいパスワード（8文字）",
    confirmPassword:"新しいパスワード確認",
    remember:"ログイン状態を保持",
    forgotpassword:"パスワードを忘れた方はこちら",
    signup:"アカウントを作成する",
    require_error:"この項目は必須です。",
    match_error:"パスワードが一致しません。",
    close:"閉じる",
    password_reset: "パスワードリセット",
    code: '確認コード',
    confirmCode: 'コード確認',
}

const Transitionalert = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PasswordReset extends Component{
    constructor(props) {
        super(props);
        this.state={
            focusNewPassword:false,
            focusConfirmPassword:false,
            loading:false,
            showNewPassword:false,
            showConfirmPassword: false,
            newPassword:"",
            confirmPassword:'',
            errorpassword:"",
            language:JSON.parse(localStorage.language).language,
            verified: false,
            email: '',
            error: '',
            code: '',
            errorcode: '',
            focusCode: false,
        }
    }

    verify = e=> {
        const {code} = this.state
        var data = JSON.stringify({'code': code});
        console.log(data)
        var config = {
            method: 'post',
            url: `${baseurl}/api/password_reset_verify`,
            headers: {
                'content-type': 'application/json'
            },
            data : data
        }
        axios(config)
        .then((response)=>{
            console.log(response)
            this.setState({
                verified: true,
                email: response.data.email
            })
        })
        .catch((error)=>{
            console.log(error.response.data)
        })
    }

    handleCloseAlertModal =(event)=>{
        this.setState({
            Alertmodal:false
        });
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
            errorpassword:"",
            errorcode: "",
            [filedName]:e.target.value
        })
    }

    handleShowNewPassword = e =>{
        this.setState({
            showNewPassword:!this.state.showNewPassword
        });
    }

    handleShowConfirmPassword = e =>{
        this.setState({
            showConfirmPassword:!this.state.showConfirmPassword
        });
    }

    handleSubmit = e =>{
        
        const {language, email, newPassword, confirmPassword} = this.state
        var validate = true;
        if(newPassword===""){
            this.setState({errorpassword:eval(language).require_error})
            validate = false;
        }

        if(confirmPassword===""){
            this.setState({errorpassword:eval(language).require_error})
            validate = false;
        }

        if (newPassword != confirmPassword) {
            this.setState({errorpassword:eval(language).match_error})
            validate = false;
        }

        if(!validate){
            return;
        }

        this.setState({loading:true})
        var data = JSON.stringify({"email": email, "password":newPassword});
        var config = {
          method: 'post',
          url: `${baseurl}/api/password_reset`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then((response)=>{
            window.location.assign('/login')
            this.setState({loading:false});
        })
        .catch((error)=>{
            this.setState({
                loading:false,
                error: 'パスワード変更でエラーが発生しました。'
            });
        });
    }


    render(){
        const { language,
            loading,
            errorpassword,
            focusNewPassword,
            focusConfirmPassword,
            showNewPassword,
            showConfirmPassword,
            newPassword,
            confirmPassword,
            verified,
            error,
            code,
            errorcode,
            focusCode
        } = this.state
        console.log(code)
        return(
            <>
                <div className="container container1">
                    <div className="container-main">
                    <div className="main-title">
                        <img src="/assets/image/logo.png" />
                        <h2>{eval(language).password_reset}</h2>
                    </div>
                    {
                        verified?
                        <div className="login-form content">
                            <div className={focusNewPassword || newPassword!=="" ? "login-input-focused login-input-box" : "login-input-box"}>
                                <label className="login-input-title">{eval(language).newPassword}</label>
                                <input name="password" value={newPassword} type={showNewPassword ? "text" : "password"} id="loginPassword" minLength="8" onChange={this.handleChange("newPassword")} onFocus={this.handleFocus("focusNewPassword")} onBlur={this.handleBlur("focusNewPassword")}/>
                                <i className={showNewPassword ? "bi bi-eye-slash": "bi bi-eye bi-eye-slash"} onClick={this.handleShowNewPassword}></i>
                            </div>
                            <span className="error">{errorpassword}</span>
                            <div className={focusConfirmPassword || confirmPassword!=="" ? "login-input-focused login-input-box" : "login-input-box"}>
                                <label className="login-input-title">{eval(language).confirmPassword}</label>
                                <input name="password" value={confirmPassword} type={showConfirmPassword ? "text" : "password"} id="loginPassword" minLength="8" onChange={this.handleChange("confirmPassword")} onFocus={this.handleFocus("focusConfirmPassword")} onBlur={this.handleBlur("focusConfirmPassword")}/>
                                <i className={showConfirmPassword ? "bi bi-eye-slash": "bi bi-eye bi-eye-slash"} onClick={this.handleShowConfirmPassword}></i>
                            </div>
                            <span className="error">{errorpassword}</span>
                            <button style={{marginTop: '2em'}} onClick={this.handleSubmit} className="main-button">{eval(language).password_reset}</button>
                            <p className='error'>{error}</p>
                        </div>
                        :
                        <div className='login-form content'>
                            <div className={focusCode || code!=="" ? "login-input-focused login-input-box" : "login-input-box"}>
                                <label className="login-input-title">{eval(language).code}</label>
                                <input name="code" value={code} type="text" id="code" onChange={this.handleChange("code")} onFocus={this.handleFocus("focusCode")} onBlur={this.handleBlur("focusCode")}/>
                            </div>
                            <span className="error">{errorcode}</span>
                            <button style={{marginTop: '2em'}} onClick={this.verify} className="main-button">{eval(language).confirmCode}</button>
                        </div>
                    }
                    </div>
                </div>
                {loading && <Preloader/>}
            </>
        )
    }
}

export default PasswordReset
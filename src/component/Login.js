

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
    login_failed_content:"Password is not correct."
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
    login_failed_content:"パスワードが正しくありません。"
}

const Transitionalert = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Login extends Component{   
    constructor(props) {
        super(props);
        this.state={
            Alertmodal:false,
            alertTitle:"",
            alertContent:"",
            focusemail:false,
            focuspassword:false,
            loading:false,
            showpassword:false,
            email:"",
            password:"",
            erroremail:"",
            errorpassword:"",
            language:JSON.parse(localStorage.language).language,
            Alertmodal:false,
            alertTitle:"",
            alertContent:""
        }
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
            erroremail:"",
            errorpassword:"",
            [filedName]:e.target.value
        })
    }

    handleShowPassword = e =>{
        this.setState({
            showpassword:!this.state.showpassword
        });
    }

    handleSubmit = e =>{
        
        const {email, password, language} = this.state
        var validate = true;
        if(email===""){
            this.setState({erroremail:eval(language).require_error})
            validate = false;
        }

        if(password===""){
            this.setState({errorpassword:eval(language).require_error})
            validate = false;
        }

        if(!validate){
            return;
        }

        this.setState({loading:true})
        var data = JSON.stringify({"email":email,"password":password});
        var config = {
          method: 'post',
          url: `${baseurl}/api/login`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then((response)=>{
           localStorage.setItem("userData", JSON.stringify(response.data))
           window.location.assign('/home')
           this.setState({loading:false});
        })
        .catch((error)=>{
            this.setState({
                Alertmodal:true,
                alertTitle:eval(language).login_failed,
                alertContent:eval(language).login_failed_content,
                loading:false
            });
        });
    }


    render(){
        const {Alertmodal, alertTitle, alertContent, language, focusemail, focuspassword, email, password, loading, showpassword, erroremail, errorpassword} = this.state
        return(
            <>
                <div className="container container1">
                    <div className="main-title">
                        <h1>AKUSHU</h1>
                        <h2>{eval(language).login}</h2>
                    </div>
                    <div className="login-form content">
                        <h3>{eval(language).loginwithEmail}</h3>
                        <div className={focusemail ||email!=="" ? "login-input-focused login-input-box" : "login-input-box"}>
                            <label className="login-input-title">{eval(language).email}</label>
                            <input name="email" type="email" value={email} onChange={this.handleChange("email")}  onFocus={this.handleFocus("focusemail")} onBlur={this.handleBlur("focusemail")}/>
                        </div>
                        <span className="error">{erroremail}</span>
                        <div className={focuspassword || password!=="" ? "login-input-focused login-input-box" : "login-input-box"}>
                            <label className="login-input-title">{eval(language).password}</label>
                            <input name="password" value={password} type={showpassword ? "text" : "password"} id="loginPassword" minLength="8" onChange={this.handleChange("password")} onFocus={this.handleFocus("focuspassword")} onBlur={this.handleBlur("focuspassword")}/>
                            <i className={showpassword ? "bi bi-eye-slash": "bi bi-eye bi-eye-slash"} onClick={this.handleShowPassword}></i>
                        </div>
                        <span className="error">{errorpassword}</span>
                        <div className="login-checkbox">
                            <label htmlFor="login-check">
                                <input type="checkbox" id="login-check" />
                                <span></span>
                                {eval(language).remember}
                            </label>
                        </div>
                        <button onClick={this.handleSubmit} className="main-button">{eval(language).login}</button>
                        <div className="forgot-password">
                            <a>{eval(language).forgotpassword}</a>
                        </div>
                        <div className="create-account">
                            <a href="/signup">{eval(language).signup}</a>
                        </div>
                    </div>
                </div>
                {loading && <Preloader/>}
                <Dialog
                    className="alert-modal"
                    open={Alertmodal}
                    TransitionComponent={Transitionalert}
                    keepMounted
                    onClose={this.handleCloseAlertModal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogTitle id="alert-dialog-slide-title" style={{textAlign:"center"}}>{alertTitle}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {alertContent}
                    </DialogContentText>
                    <div className="search-btn">
                        <Button onClick={this.handleCloseAlertModal} className="btn btn-search">
                            {eval(language).close}
                        </Button>
                    </div>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

export default Login
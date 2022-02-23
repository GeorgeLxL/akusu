

import React, { Component } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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
    welcome:"Welcome",
    email:"Email",
    password:"Password(8 characters)",
    terms:"Terms of Service",
    privacy:"Privacy policy",
    agreement:"I agree and start",
    remember:"Remember me",
    haveaccount:"I have an account",
    require_error:"This field is required.",
    duplicate_error:"A user with this email already exists.",
    invalid_email_error:"Enter a valid email address.",
    close:"Close",
}

const jp = {
    welcome:"はじめる",
    email:"メールアドレス",
    password:"パスワード（8文字）",
    terms:"利用規約",
    privacy:"個人情報の取扱",
    agreement:"同意してはじめる",
    remember:"ログイン状態を保持",
    haveaccount:"アカウントをお持ちの方",
    require_error:"この項目は必須です。",
    duplicate_error:"このメールを持つユーザーはすでに存在します。",
    invalid_email_error:"有効なメールアドレスを入力してください。",
    close:"閉じる",
}

const Transitionalert = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Signup() {
    const history = useHistory()
    return(
        <SignupView history={history} />
    )
}

class SignupView extends Component{   
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
            successModal: false,
        }
    }

    handleFocus = focusName => e=>{
        this.setState({
            [focusName]:true
        })
    }

    handleBlur = blurName => e=> {
        if(e.target.value===""){
            this.setState({
                [blurName]:false
            })
        }
    }

    handleChange = filedName => e=>{
        this.setState({
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

        this.setState({loading:true});
        var data = JSON.stringify({"email":email,"password":password});
        var config = {
          method: 'post',
          url: `${baseurl}/api/signup`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then((response)=>{
            this.setState({loading:false, successModal: true});
        })
        .catch((error)=>{
            if(error.response){
                if(error.response.data)
                {
                    var errordata = error.response.data;
    
                    if(errordata.email)
                    {
                        if((errordata.email[0]).indexOf('exists')!==-1)
                        {
                            this.setState({erroremail:eval(language).duplicate_error})
                        }
                        if((errordata.email[0]).indexOf('valid')!==-1)
                        {
                            this.setState({erroremail:eval(language).invalid_email_error})
                        }
                    }
                }
            }
            this.setState({
                loading:false
            });
        });
    }

    successModalClose = e => {
        this.props.history.push({
            pathname: '/emailverify',
            state: {
                email: this.state.email
            },
        })
    }

    render(){
        const {Alertmodal, alertTitle, alertContent, language, focusemail, focuspassword, email, password, showpassword, erroremail, errorpassword, loading, successModal} = this.state
        return(
            <>
                <div className="container container1">
                    <div className="container-main">
                    <div className="main-title">
                        <img src="/assets/image/logo.png" />
                        <h2>{eval(language).welcome}</h2>
                    </div>
                    <div className="login-form content">
                        <div className={focusemail ||email!=="" ? "login-input-focused login-input-box" : "login-input-box"}>
                            <label className="login-input-title">{eval(language).email}</label>
                            <input type="email" value={email} onChange={this.handleChange("email")}  onFocus={this.handleFocus("focusemail")} onBlur={this.handleBlur("focusemail")} autoComplete="new-password" />
                        </div>
                        <span className="error">{erroremail}</span>
                        <div className={focuspassword || password!=="" ? "login-input-focused login-input-box" : "login-input-box"}>
                            <label className="login-input-title">{eval(language).password}</label>
                            <input value={password} type={showpassword ? "text" : "password"} id="loginPassword" minLength="8" onChange={this.handleChange("password")} onFocus={this.handleFocus("focuspassword")} onBlur={this.handleBlur("focuspassword")} autoComplete="new-password"/>
                            <i className={showpassword ? "bi bi-eye-slash": "bi bi-eye bi-eye-slash"} onClick={this.handleShowPassword}></i>
                        </div>
                        <span className="error">{errorpassword}</span>
                        <div className="login-checkbox">
                           {language==='jp' ? <p><a href="/terms">利用規約</a>と<a href="/privacy">個人情報の取扱</a>についてに同意の上、お進みください</p> : <p>Please continue after you agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></p> }
                        </div>
                        <button onClick={this.handleSubmit} className="main-button">{eval(language).agreement}</button>
                        <div className="login-checkbox">
                            <label htmlFor="login-check">
                                <input type="checkbox" id="login-check"/>
                                <span></span>
                                {eval(language).remember}
                            </label>
                        </div>
                        <div className="create-account">
                            <a href="/login">{eval(language).haveaccount}</a>
                        </div>
                    </div>
                    </div>
                </div>
                {loading && <Preloader/>}
                <Dialog
                    open={successModal}
                    onClose={this.successModalClose}
                >
                    <DialogTitle style={{fontWeight: 'bold'}}>確認コードを送信しました。</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{textAlign: 'center'}}>登録したメールアドレスに確認コードを送信しました。<br />確認後、ログインしてください。</DialogContentText>
                    </DialogContent>
                    <a style = {{textAlign: 'center', fontSize: '20px', height: '2em', display: 'block', color: '#3f64ee'}} onClick={this.successModalClose}>OK</a>
                </Dialog>
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

export default Signup
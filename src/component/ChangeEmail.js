import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader'
const baseurl = process.env.REACT_APP_API_BASE_URL;

const en ={
    mail_change:"Email address change",
    mail_chage_description:"You will need login information to change email address.",
    current_email:"Current email",
    current_password:"Current password",
    new_mail_description:"If you change it, you will receive a verification email at your new email address. It is not completed until it is authenticated.",
    newemail:"New email",
    change:"Change"
}

const jp ={
    mail_change:"メールアドレスの変更",
    mail_chage_description:"メールアドレスを変更するには、ログイン情報が必要です。",
    current_email:"現在のメールアドレス",
    current_password:"現在のパスワード",
    new_mail_description:"変更すると、新しいメールアドレスに認証メールが届きます。認証するまでは完了していません。",
    newemail:"新しいメールアドレス",
    change:"変更する"
}

class ChangeEmail extends Component{
    constructor(props){
        super(props);
        this.state={
            currentEmail:"",
            passWord:"",
            newEmail:"",
            focuscurrentEmail:false,
            focuspassWord:false,
            focusnewEmail:false,
            showpassword:false,
            loading:false,
            language:JSON.parse(localStorage.language).language
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
            [filedName]:e.target.value
        })
    }

    handleShowPassword = e =>{
        this.setState({
            showpassword:!this.state.showpassword
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({loading:true});
        const {currentEmail, passWord, newEmail} = this.state
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var data = JSON.stringify({email:currentEmail,password:passWord, newemail:newEmail});
        var config = {
            method: 'post',
            url: `${baseurl}/api/account/updateEmail`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
                data : data,
        };
        axios(config)
        .then((response) => {
            this.setState({loading:false});
            localStorage.setItem("userData", JSON.stringify(response.data))
            window.location.assign("/home");
        })
        .catch((error)=>{
            this.setState({loading:false});
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
            }
        })
    }


    render(){
        const {language,currentEmail, passWord, newEmail, focuscurrentEmail, focuspassWord, focusnewEmail,showpassword, loading} = this.state;
        return(
            <>
                <div className="container">
                    <Header pageName={eval(language).mail_change}/>
                    <div className="profile-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="change-password-card">
                                <p>{eval(language).mail_chage_description}</p>
                                <div className={focuscurrentEmail || currentEmail!=="" ? "login-input-focused change-input-box1" : "change-input-box1"} >
                                    <label htmlFor="old-email">{eval(language).current_email}</label>
                                    <input type="email" value={currentEmail} onChange={this.handleChange("currentEmail")}  onFocus={this.handleFocus("focuscurrentEmail")} onBlur={this.handleBlur("focuscurrentEmail")} />
                                </div>
                                <div className={focuspassWord ||passWord!=="" ? "login-input-focused change-input-box1" : "change-input-box1"}>
                                    <label htmlFor="old-email">{eval(language).current_password}</label>
                                    <input type={showpassword ? "text" : "password"} name="password" id="loginPassword" value={passWord} onChange={this.handleChange("passWord")}  onFocus={this.handleFocus("focuspassWord")} onBlur={this.handleBlur("focuspassWord")}/>
                                    <i className={showpassword ? "bi bi-eye-slash": "bi bi-eye bi-eye-slash"} onClick={this.handleShowPassword}></i>
                                </div>
                            </div>
                            <div className="change-password-card">
                                <p>{eval(language).new_mail_description}</p>
                                <div className={focusnewEmail ||newEmail!=="" ? "login-input-focused change-input-box1" : "change-input-box1"}>
                                    <label htmlFor="old-email">{eval(language).newemail}</label>
                                    <input type="email" value={newEmail} onChange={this.handleChange("newEmail")}  onFocus={this.handleFocus("focusnewEmail")} onBlur={this.handleBlur("focusnewEmail")} />
                                </div>
                            </div>
                            <div className="change-password-card">
                                <div className="change-password-submit">
                                    <input type="submit" value={eval(language).change} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer/>
                </div>
                {loading &&
                    <Preloader/>
                }
            </>
        )
    }
}

export default ChangeEmail;
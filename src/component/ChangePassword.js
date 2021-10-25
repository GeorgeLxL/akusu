import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader'

const baseurl = process.env.REACT_APP_API_BASE_URL;

const en ={
    change_password:"Change password",
    change_password_description:"You will need login information to change password.",
    current_email:"Current email",
    current_password:"Current password",
    new_password_description:"When the password change procedure is completed, you will receive completion email.",
    new_password:"New password",
    confirm_new_password:"Confirm new password",
    change:"Change"
}

const jp ={
    change_password:"パスワードの変更",
    change_password_description:"パスワードを変更するには、ログイン情報が必要です。",
    current_email:"現在のメールアドレス",
    current_password:"現在のパスワード",
    new_password_description:"パスワード変更の手続きが完了すると、メールアドレスに変更完了メールが届きます。",
    new_password:"新しいパスワード",
    confirm_new_password:"新しいパスワード（確認用）",
    change:"変更する"
}

class ChangePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            newPassword:"",
            confirmPassword:"",
            focuscurrentEmail:false,
            focuspassword:false,
            focusnewPassword:false,
            focusconfirmPassword:false,
            showpassword:false,
            shownewPassword:false,
            showconfirmPassword:false,
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

    handleShowPassword = filedName => e=>{
        
        this.setState({
            [filedName]:!this.state[filedName]
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({loading:true});
        const {email, password, newPassword} = this.state
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var data = JSON.stringify({email:email,password:password, newpassword:newPassword});
        var config = {
            method: 'post',
            url: `${baseurl}/api/account/updatePassword`,
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
        const {language, email, password, newPassword, confirmPassword, focusEmail, focuspassword, focusnewPassword, focusconfirmPassword,showpassword, shownewPassword, showconfirmPassword, loading} = this.state;
        return(
            <>
                <div className="container">
                    <Header pageName={eval(language).change_password}/>
                    <div className="profile-content">
                            <form action="">
                                <div className="change-password-card">
                                    <p>{eval(language).change_password_description}</p>
                                    <div className={focusEmail || email!=="" ? "login-input-focused change-input-box1" : "change-input-box1"}>
                                        <label htmlFor="old-email">{eval(language).current_email}</label>
                                        <input type="email"  value={email} onChange={this.handleChange("email")}  onFocus={this.handleFocus("focusEmail")} onBlur={this.handleBlur("focusEmail")} />
                                    </div>
                                    <div className={focuspassword || password!=="" ? "login-input-focused change-input-box1" : "change-input-box1"}>
                                        <label htmlFor="old-email">{eval(language).current_password}</label>
                                        <input  type={showpassword ? "text" : "password"} value={password} onChange={this.handleChange("password")}  onFocus={this.handleFocus("focuspassword")} onBlur={this.handleBlur("focuspassword")} />
                                        <i className={showpassword ? "bi bi-eye-slash": "bi bi-eye bi-eye-slash"} onClick={this.handleShowPassword("showpassword")}></i>
                                    </div>
                                </div>
                                <div className="change-password-card">
                                    <p>{eval(language).new_password_description}</p>
                                    <div className={focusnewPassword || newPassword!=="" ? "login-input-focused change-input-box1" : "change-input-box1"}>
                                        <label htmlFor="old-email">{eval(language).new_password}</label>
                                        <input type={shownewPassword ? "text" : "password"}  value={newPassword} onChange={this.handleChange("newPassword")}  onFocus={this.handleFocus("focusnewPassword")} onBlur={this.handleBlur("focusnewPassword")}/>
                                        <i className={shownewPassword ? "bi bi-eye-slash": "bi bi-eye bi-eye-slash"} onClick={this.handleShowPassword("shownewPassword")}></i>
                                    </div>
                                    <div className={focusconfirmPassword || confirmPassword!=="" ? "login-input-focused change-input-box1" : "change-input-box1"}>
                                        <label htmlFor="old-email">{eval(language).confirm_new_password}</label>
                                        <input type={showconfirmPassword ? "text" : "password"}   value={confirmPassword} onChange={this.handleChange("confirmPassword")}  onFocus={this.handleFocus("focusconfirmPassword")} onBlur={this.handleBlur("focusconfirmPassword")} />
                                        <i className={showconfirmPassword ? "bi bi-eye-slash": "bi bi-eye bi-eye-slash"}  onClick={this.handleShowPassword("showconfirmPassword")}></i>
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

export default ChangePassword;
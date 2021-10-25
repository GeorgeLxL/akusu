import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';

const en = {
    account_setting:"Account setting",
    login_security:"Login and security",
    email_change:"Change e-mail address",
    password_change:"Change password",
    account:"Account",
    profileSettings:"Profile settings",
    others:"Others",
    change_request_inquiry:"Change request/inquiry"
}

const jp={
    account_setting:"アカウント設定",
    login_security:"ログインとセキュリティ",
    email_change:"メールアドレスの変更",
    password_change:"パスワードの変更",
    account:"アカウント",
    profileSettings:"プロフィール設定",
    others:"その他",
    change_request_inquiry:"変更依頼・お問い合わせ"
}

class SetProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            language:JSON.parse(localStorage.language).language
        }
    }

    render(){
        const { language } = this.state
        return(
        <div className="container">
            <Header pageName={eval(language).account_setting}/>
            <div className="seminar-card-container">
                <div className="seminar-card">
                    <h3>{eval(language).login_security}</h3>
                    <div onClick={(e)=>{window.location.assign("/changeEmail")}} className="mypage-link"><a>{eval(language).email_change}</a></div>
                    <div onClick={(e)=>{window.location.assign("/changePassword")}} className="mypage-link"><a>{eval(language).password_change}</a></div>
                </div>
                <div className="seminar-card">
                    <h3>{eval(language).account}</h3>
                    <div onClick={(e)=>{window.location.assign("/updateProfile")}} className="mypage-link"><a>{eval(language).profileSettings}</a></div>
                </div>
                <div className="seminar-card">
                    <h3>{eval(language).others}</h3>
                    <div className="mypage-link"><a>{eval(language).change_request_inquiry}</a></div>
                </div>
            </div>
            <Footer/>
        </div>
        )
    }
}

export default SetProfile
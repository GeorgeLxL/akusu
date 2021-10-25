import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';

const en = {
    mypage:"My page",
    common:"Common",
    account_setting:"Accounts",
    account_setting_description:"You can change your information.",
    notify:"Notify",
    notification:"Notification",
    mail_delivery:"Mail delivery",
    others:"Others",
    logout:"Sign out"
}

const jp = {
    mypage:"マイページ",
    common:"一般",
    account_setting:"アカウント設定",
    account_setting_description:"登録情報を変更できます。",
    notify:"通知",
    notification:"プッシュ通知",
    mail_delivery:"メール配信",
    others:"その他",
    logout:"ログアウト"
}

class Mypage extends Component{
    constructor(props) {
        super(props);
        this.state={
           language:JSON.parse(localStorage.language).language
        }
    }

    handleLogout = e =>{
        localStorage.removeItem("userData");
        window.location.assign('/');
    }

    render(){
        const {language} = this.state
        return(
            <div className="container">
                <Header pageName={eval(language).mypage}/>
                <div className="seminar-card-container">
                    <div className="seminar-card">
                        <h3>{eval(language).common}</h3>
                        <div onClick={(e)=>{window.location.assign("/setProfile")}} className="mypage-link"><a>{eval(language).account_setting}<span>{eval(language).account_setting_description}</span></a></div>
                    </div>
                    <div className="seminar-card">
                        <h3>{eval(language).notify}</h3>
                        <div onClick={(e)=>{window.location.assign("/comingsoon")}} className="mypage-link"><a>{eval(language).notification}</a></div>
                        <div onClick={(e)=>{window.location.assign("/comingsoon")}} className="mypage-link"><a>{eval(language).mail_delivery}</a></div>
                    </div>
                    <div className="seminar-card">
                        <h3>{eval(language).others}</h3>
                        <div onClick={this.handleLogout} className="mypage-link"><a>{eval(language).logout}</a></div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Mypage
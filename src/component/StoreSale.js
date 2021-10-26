import React, { Component } from 'react';
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader'

const baseurl = process.env.REACT_APP_API_BASE_URL;
const en = {
    home:"Home",
    user_name:"User name",
    user_type:"User type",
    points:"Points",
    store:"Store",
    usertypes:['Individual', 'Company', 'Administrator', 'Introducer A', 'Introducer B','Introducer C'],
    sale_title:"Sell the Property",
    name:"Full name",
    phone_number:"Phone number",
    email:"Email address",
    address:"Address",
    send:"Send",
    contact_content:"Contact content",
    immediate:"Immediately",
    consider:"Consider",
    other:"Other",
}

const jp ={
    home:"ホーム",
    user_name:"ユーザー名",
    user_type:"会員種類",
    points:"保有ポイント",
    store:"店舗売買",
    usertypes:['個人会員', '企業', '運営者', '紹介者A', '紹介者B','紹介者C'],
    sale_title:"物件を売りたい人",
    name:"氏名",
    phone_number:"電話番号",
    email:"メールアドレス",
    address:"住所",
    send:"保存する",
    contact_content:"お問い合わせ内容",
    immediate:"即売却希望",
    consider:"売却検討中",
    other:"その他",
}

class StoreSale extends Component{   
    constructor(props) {
        super(props);
        this.state={
           loading:true,
           userName:"",
           userType:"",
           userPoint:0,
           avartar:"",
           newEventNum:0,
           language:JSON.parse(localStorage.language).language
        }
    }

    componentDidMount()
    {
        var userData = JSON.parse(localStorage.userData);
        console.log(userData)
        if(userData.userstatus===0)
        {
            this.props.history.push("/emailverify");
        }
        
        if(userData.userstatus===1)
        {
            this.props.history.push("/register");
        }
        if(userData.userstatus===2)
        {
            this.getUserdata()
        }
    }

    getUserdata()
    {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'get',
            url: `${baseurl}/api/account/getProfile`,
            headers: { 
            'Authorization': 'Bearer ' + token,
            },
                data : {},
        };
        axios(config)
        .then((response) => {
            var userData = response.data.user;
            var srcBase64 = userData.userAvatar;
            this.setState({
                loading:false,
                userName: userData.userName,
                userType:userData.userType,
                userPoint: userData.userPoint,
                avartar: srcBase64
            })
        })
        .catch((error)=>{
            this.setState({
                loading:false
            })
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
            }
        })
    }

    render(){  
        const {loading, language, userName, userPoint, userType, avartar, newEventNum} = this.state
        return(
        <>
            <div className="real-container1">
                <div className="real-title"><h3>{eval(language).sale_title}</h3></div>
                <div className="real-sale-container">
                    <form>
                        <div className="real-sale-input">
                            <label>{eval(language).name}</label>
                            <input type="text" required />
                        </div>
                        <div className="real-sale-input">
                            <label>{eval(language).phone_number}</label>
                            <input type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required />
                        </div>
                        <div className="real-sale-input">
                            <label>{eval(language).email}</label>
                            <input type="email" required />
                        </div>
                        <div className="real-sale-input">
                            <label>{eval(language).address}</label>
                            <input type="text" required />
                        </div>
                        <div className="real-sale-input">
                            <label>{eval(language).contact_content}</label>
                            <div className="real-sale-type">
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" />
                                    <span></span>
                                    {eval(language).immediate}
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" />
                                    <span></span>
                                    {eval(language).consider}
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" />
                                    <span></span>
                                    {eval(language).other}
                                </label>
                            </div>
                        </div>
                        <div className="real-sale-input">
                            <input type="submit" value={eval(language).send} />
                        </div>
                    </form>
                </div>
            </div>
        </>
        )
    }
}

export default StoreSale
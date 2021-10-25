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
    real_estate:"Real Estate",
    usertypes:['Individual', 'Company', 'Administrator', 'Introducer A', 'Introducer B','Introducer C'],
    buy_title:"Buy property",
    name:"Full name",
    phone_number:"Phone number",
    email:"Email address",
    address:"Address",
    send:"Send",
    area:"Area choice",
}

const jp ={
    home:"ホーム",
    user_name:"ユーザー名",
    user_type:"会員種類",
    points:"保有ポイント",
    real_estate:"不動産",
    usertypes:['個人会員', '企業', '運営者', '紹介者A', '紹介者B','紹介者C'],
    buy_title:"物件を買いたい人",
    name:"氏名",
    phone_number:"電話番号",
    email:"メールアドレス",
    address:"住所",
    send:"保存する",
    area:"ご希望の地域"
}

class RealEstateBuy extends Component{   
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
                <div className="real-title"><h3>{eval(language).buy_title}</h3></div>
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
                            <label>{eval(language).area}</label>
                            <select>
                                <option>那覇市</option>
                            </select>
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

export default RealEstateBuy
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
    store:"店舗売買",
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
        <div className="real-container1 real-container3">
            <div className="real-title"><h3>{eval(language).buy_title}</h3></div>
            <form>
                <div className="real-sale-container">
                    <div className="real-sale-input-box">
                        <h4>種目</h4>
                        <div className="real-sale-type">
                            <label className="real-sale-type-select">
                                <input name="real-sale-type" type="radio" />
                                <span></span>
                                土地
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-type" type="radio" />
                                <span></span>
                                戸建
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-type" type="radio" />
                                <span></span>
                                マンション
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-type" type="radio" />
                                <span></span>
                                収益物件
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-type" type="radio" />
                                <span></span>
                                ホテル
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-type" type="radio" />
                                <span></span>
                                軍用地
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-type" type="radio" />
                                <span></span>
                                ヤード
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-type" type="radio" />
                                <span></span>
                                農地
                            </label>
                        </div>
                    </div>
                    <div className="real-sale-input-box">
                        <h4>エリア</h4>
                        <div className="real-sale-type">
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                県内全域
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                那覇市内
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                南部
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                中部
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                北部
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                各市町村
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                リゾート用地
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                県外
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-area" type="radio" />
                                <span></span>
                                その他
                            </label>
                        </div>
                    </div>
                    <div className="real-sale-input-box">
                        <h4>㎡/坪</h4>
                        <div className="real-sale-input-box1">
                            <input type="number"/>
                            <span>坪</span>
                        </div>
                    </div>
                    <div className="real-sale-input-box">
                        <h4>希望予算</h4>
                        <div className="real-sale-input-box1">
                            <input type="number"/>
                            <span>円</span>
                        </div>
                    </div>
                    <div className="real-sale-input-box">
                        <h4>氏名</h4>
                        <div className="real-sale-input-box1">
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="real-sale-input-box">
                        <h4>TEL</h4>
                        <div className="real-sale-input-box1">
                            <input type="tel"/>
                        </div>
                    </div>
                    <div className="real-sale-input-box">
                        <h4>メールアドレス</h4>
                        <div className="real-sale-input-box1">
                            <input type="email"/>
                        </div>
                    </div>
                    <div className="real-sale-input-box">
                        <h4>期日・見込</h4>
                        <div className="real-sale-type">
                            <label className="real-sale-type-select">
                                <input name="real-sale-date" type="radio" />
                                <span></span>
                                3ヵ月以内
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-date" type="radio" />
                                <span></span>
                                半年以内
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-date" type="radio" />
                                <span></span>
                                1年以内
                            </label>
                            <label className="real-sale-type-select">
                                <input name="real-sale-date" type="radio" />
                                <span></span>
                                査定希望
                            </label>
                        </div>
                    </div>
                    <div className="real-sale-input-box real-sale-input-service">
                        <label className="real-sale-type-select">
                            <input name="real-sale-date" type="checkbox" />
                            <span></span>
                            利用規約に同意します。
                        </label>
                    </div>
                </div>
                <input className="real-sale-submit" type="submit" value="送信する​"/>
            </form>
        </div>
        </>
        )
    }
}

export default RealEstateBuy
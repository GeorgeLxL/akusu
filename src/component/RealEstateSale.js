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

class RealEstateSale extends Component{   
    constructor(props) {
        super(props);
        this.state={
           newEventNum:0,
           type:0,
           area:0,
           size:0,
           quatation:0,
           selfMoney:0,
           name:"",
           phoneNumber:"",
           emailAddress:"",
           period:0,
           agreement:false,
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
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        const {agreement, type, area, size, quatation, name, emailAddress, phoneNumber, period, selfMoney} = this.state
        if(!agreement){
            return;
        }
        else{
            this.setState({loading:true});
            var userData = JSON.parse(localStorage.userData);
            var token = userData.token
            var data = JSON.stringify({"type":type,"area":area, "size":size , "quatation":quatation, "name":name, "emailAddress":emailAddress, "phoneNumber":phoneNumber, "period":period, "selfMoney":selfMoney, "buysell":2});
            var config = {
                method: 'post',
                url: `${baseurl}/api/estimate/register`,
                headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
                data : data
            };
            axios(config)
            .then((response)=>{
                this.props.history.push('/home')
            })
            .catch((error)=>{
            });
        }

    }

    render(){  
        const {language} = this.state
        return(
        <>
            <div className="real-container1 real-container3">
                <div className="real-title"><h3>{eval(language).sale_title}</h3></div>
                <form onSubmit={this.handleSubmit}>
                    <div className="real-sale-container">
                        <div className="real-sale-input-box">
                            <h4>種目</h4>
                            <div className="real-sale-type">
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({type:0})}} checked={this.state.type===0}/>
                                    <span></span>
                                    土地
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({type:1})}} checked={this.state.type===1}/>
                                    <span></span>
                                    戸建
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({type:2})}} checked={this.state.type===2}/>
                                    <span></span>
                                    マンション
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({type:3})}} checked={this.state.type===3}/>
                                    <span></span>
                                    収益物件
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({type:4})}} checked={this.state.type===4}/>
                                    <span></span>
                                    ホテル
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({type:5})}} checked={this.state.type===5}/>
                                    <span></span>
                                    軍用地
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({type:6})}} checked={this.state.type===6}/>
                                    <span></span>
                                    ヤード
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({type:7})}} checked={this.state.type===7}/>
                                    <span></span>
                                    農地
                                </label>
                            </div>
                        </div>
                        <div className="real-sale-input-box">
                            <h4>エリア</h4>
                            <div className="real-sale-type">
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:0})}} checked={this.state.area===0}/>
                                    <span></span>
                                    県内全域
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:1})}} checked={this.state.area===1}/>
                                    <span></span>
                                    那覇市内
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:2})}} checked={this.state.area===2}/>
                                    <span></span>
                                    南部
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:3})}} checked={this.state.area===3}/>
                                    <span></span>
                                    中部
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:4})}} checked={this.state.area===4}/>
                                    <span></span>
                                    北部
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:5})}} checked={this.state.area===5}/>
                                    <span></span>
                                    各市町村
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:6})}} checked={this.state.area===6}/>
                                    <span></span>
                                    リゾート用地
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:7})}} checked={this.state.area===7}/>
                                    <span></span>
                                    県外
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({area:8})}} checked={this.state.area===8}/>
                                    <span></span>
                                    その他
                                </label>
                            </div>
                        </div>
                        <div className="real-sale-input-box">
                            <h4>㎡/坪</h4>
                            <div className="real-sale-input-box1">
                                <input type="number" onChange={(e)=>{this.setState({size:e.target.value})}} value={this.state.size}/>
                                <span>坪</span>
                            </div>
                        </div>
                        <div className="real-sale-input-box">
                            <h4>希望予算</h4>
                            <div className="real-sale-input-box1">
                                <input type="number" onChange={(e)=>{this.setState({quatation:e.target.value})}} value={this.state.quatation}/>
                                <span>円</span>
                            </div>
                        </div>
                        <div className="real-sale-input-box">
                            <h4>自己資金</h4>
                            <div className="real-sale-type">
                                <label className="real-sale-type-select">
                                    <input name="real-sale-equity" type="radio" onClick={()=>{this.setState({selfMoney:0})}} checked={this.state.selfMoney==0}/>
                                    <span></span>
                                    無
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-equity" type="radio" onClick={()=>{this.setState({selfMoney:1})}} checked={this.state.selfMoney==1}/>
                                    <span></span>
                                    10%
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-equity" type="radio" onClick={()=>{this.setState({selfMoney:2})}} checked={this.state.selfMoney==2}/>
                                    <span></span>
                                    20%
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-equity" type="radio" onClick={()=>{this.setState({selfMoney:3})}} checked={this.state.selfMoney==3}/>
                                    <span></span>
                                    30%
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-equity" type="radio" onClick={()=>{this.setState({selfMoney:4})}} checked={this.state.selfMoney==4}/>
                                    <span></span>
                                    現金購入
                                </label>
                            </div>
                        </div>
                        <div className="real-sale-input-box">
                            <h4>氏名</h4>
                            <div className="real-sale-input-box1">
                                <input type="text" onChange={(e)=>{this.setState({name:e.target.value})}} value={this.state.name} />
                            </div>
                        </div>
                        <div className="real-sale-input-box">
                            <h4>TEL</h4>
                            <div className="real-sale-input-box1">
                                <input type="tel" onChange={(e)=>{this.setState({phoneNumber:e.target.value})}} value={this.state.phoneNumber}/>
                            </div>
                        </div>
                        <div className="real-sale-input-box">
                            <h4>メールアドレス</h4>
                            <div className="real-sale-input-box1">
                                <input type="email" onChange={(e)=>{this.setState({emailAddress:e.target.value})}} value={this.state.emailAddress}/>
                            </div>
                        </div>
                        <div className="real-sale-input-box">
                            <h4>期日・見込</h4>
                            <div className="real-sale-type">
                                <label className="real-sale-type-select">
                                    <input name="real-sale-date" type="radio" onClick={()=>{this.setState({period:0})}} checked={this.state.period==0}/>
                                    <span></span>
                                    3ヵ月以内
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-date" type="radio" onClick={()=>{this.setState({period:1})}} checked={this.state.period==1}/>
                                    <span></span>
                                    半年以内
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-date" type="radio" onClick={()=>{this.setState({period:2})}} checked={this.state.period==2}/>
                                    <span></span>
                                    1年以内
                                </label>
                                <label className="real-sale-type-select">
                                    <input name="real-sale-date" type="radio" onClick={()=>{this.setState({period:3})}} checked={this.state.period==3}/>
                                    <span></span>
                                    いい物件があれば
                                </label>
                            </div>
                        </div>
                        <div className="real-sale-input-box real-sale-input-service">
                            <label className="real-sale-type-select">
                                <input name="real-sale-date" type="checkbox" checked={this.state.agreement} onClick={()=>{this.setState({agreement:!this.state.agreement})}}/>
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

export default RealEstateSale
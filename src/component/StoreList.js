import React, { Component } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay, Controller } from 'swiper';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation, Autoplay, Controller]);

const baseurl = process.env.REACT_APP_API_BASE_URL;
const en = {
    home:"Home",
    user_name:"User name",
    user_type:"User type",
    points:"Points",
    store:"Store",
    usertypes:['Individual', 'Company', 'Administrator', 'Introducer A', 'Introducer B','Introducer C'],
    property_list:"Property list",
    featured_property:"Featured Property!!",
}

const jp ={
    home:"ホーム",
    user_name:"ユーザー名",
    user_type:"会員種類",
    points:"保有ポイント",
    store:"店舗売買",
    usertypes:['個人会員', '企業', '運営者', '紹介者A', '紹介者B','紹介者C'],
    property_list:"物件一覧",
    featured_property:"注目物件!!"
}

class StoreList extends Component{   
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
        var i,j;
        var swiper = document.querySelectorAll(".swiper-container .swiper-slide")
        for (i=0;i<swiper.length-1;i++) {
            if (swiper[i].innerHTML == swiper[i+1].innerHTML) {
                j=1;
            }
        }
        if(j==1) {
            document.querySelector('.swiper-wrapper').classList.add('disabled');
            document.querySelector('.swiper-button-prev').classList.add('disabled');
            document.querySelector('.swiper-button-next').classList.add('disabled');
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
        const { language, userName, userPoint, userType, avartar, newEventNum} = this.state
        return(
        <>
            <div className="real-container2">
                <h2 className="real-title">{eval(language).property_list}</h2>
                <div className="real-list-title"><h3>{eval(language).featured_property}</h3></div>
                <Swiper
                    spaceBetween={0}
                    navigation
                    centeredSlides
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    loop={true}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    className="real-estate-slide-container"
                >
                    <SwiperSlide
                        className="real-estate-slide"
                    >
                        <div className="real-estate-slide-img">
                            <img src="/assets/image/real-main.jpg" />
                        </div>
                        <h4>売リ物件</h4>
                        <h3>貸店舗（クラブ）</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>住所</td>
                                    <td>那覇市牧志</td>
                                </tr>
                                <tr>
                                    <td>貸賃料</td>
                                    <td>264,815</td>
                                </tr>
                                <tr>
                                    <td>設備売買金額</td>
                                    <td>8,000,000</td>
                                </tr>
                                <tr>
                                    <td>階層</td>
                                    <td>3F</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>那覇市牧志（軽飲食可）の居抜き物件出ました</p>
                    </SwiperSlide>
                    <SwiperSlide
                        className="real-estate-slide"
                    >
                        <div className="real-estate-slide-img">
                            <img src="/assets/image/real-main.jpg" />
                        </div>
                        <h4>売リ物件</h4>
                        <h3>貸店舗（クラブ）</h3>
                        <table>
                            <tr>
                                <td>住所</td>
                                <td>那覇市牧志</td>
                            </tr>
                            <tr>
                                <td>貸賃料</td>
                                <td>264,815</td>
                            </tr>
                            <tr>
                                <td>設備売買金額</td>
                                <td>8,000,000</td>
                            </tr>
                            <tr>
                                <td>階層</td>
                                <td>3Fadf</td>
                            </tr>
                        </table>
                        <p>那覇市牧志（軽飲食可）の居抜き物件出ました</p>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
        )
    }
}

export default StoreList
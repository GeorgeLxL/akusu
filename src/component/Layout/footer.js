import React, { Component } from 'react';
import axios from 'axios';
const baseurl = process.env.REACT_APP_API_BASE_URL;

const en ={
    mypage:"My page",
    guide:"Guide",
    home:"Home",
    profile:"Profile",
    notification:"Notice"
}

const jp ={
    mypage:"マイページ",
    guide:"ガイド",
    home:"ホーム",
    profile:"登録情報",
    notification:"お知らせ"
}

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state={
            language:JSON.parse(localStorage.language).language,
            notificationcount:0,
            notifications:[],
        }
    }

    componentDidMount(){
        this.getNotification();
    }

    getNotification(){
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'get',
            url: `${baseurl}/api/getnotifications`,
            headers: { 
            'Authorization': 'Bearer ' + token,
            },
                data : {},
        };
        axios(config)
        .then((response) => {
            console.log(JSON.parse(response.data.notifications));
            this.setState({
                notificationcount:response.data.count,
                notifications:JSON.parse(response.data.notifications),
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
        const {language} = this.state;
        return(
            <footer>
            <div className="footer-link">
                <a href="/mypage">
                    <img src="/assets/image/icon1.png" alt="" />
                    <p>{eval(language).mypage}</p>
                </a>
            </div>
            <div className="footer-link">
                <a href="/comingsoon">
                    <img src="/assets/image/icon2.png" alt="" />
                    <p>{eval(language).guide}</p>
                </a>
            </div>
            <div className="footer-link">
                <a href="/home">
                    <img src="/assets/image/icon0.png" alt="" />
                    <p>{eval(language).home}</p>
                </a>
                <div></div>
            </div>
            <div className="footer-link">
                <a href="/myProfile">
                    <img src="/assets/image/icon3.png" alt="" />
                    <p>{eval(language).profile}</p>
                </a>
            </div>
            <div className="footer-link">
                <a href="/notifications">
                    <img src="/assets/image/icon4.png" alt="" />
                    <p>{eval(language).notification}</p>
                    {this.state.notificationcount!==0 && <div>{this.state.notificationcount}</div>}
                </a>
            </div>
        </footer>
        )
    }
}

export default Footer
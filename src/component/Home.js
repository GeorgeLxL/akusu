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
    money:"Money",
    store_sale:"Event",
    life:"Life",
    inheritance:"Inheritance",
    before_marriage:"Before marriage",
    scan:"Scan",
    send_receive:"Send/Receive",
    save:"Save",
    charge:"Charge",
    owned_point:"Owned points:",
    usertypes:['Individual', 'Company', 'Administrator', 'Introducer A', 'Introducer B','Introducer C']
}

const jp ={
    home:"ホーム",
    user_name:"ユーザー名",
    user_type:"会員種類",
    points:"保有ポイント",
    real_estate:"不動産",
    money:"お金",
    store_sale:"店舗売買",
    life:"遊びライフ",
    inheritance:"相続",
    before_marriage:"相続",
    scan:"スキャン",
    send_receive:"送る・受け取る",
    save:"貯める",
    charge:"チャージ",
    owned_point:"保有ポイント：",
    usertypes:['個人会員', '企業', '運営者', '紹介者A', '紹介者B','紹介者C']
}

class Home extends Component{   
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
            <div className="container">
                <Header notback={true} Intro={true} pageName={eval(language).home}/>
                <div className="top-profile">
                    <div className="top-profile-img">
                        <img src={avartar ? `${baseurl}/media/${avartar}`: './assets/image/avatar.svg'} alt="" />
                    </div>
                    <table className="top-profile-table">
                        <tbody>
                            <tr>
                                <td>{eval(language).user_name}</td>
                                <td>{userName}</td>
                            </tr>
                            <tr>
                                <td>{eval(language).user_type}</td>
                                <td>{eval(language).usertypes[userType]}</td>
                            </tr>
                            <tr>
                                <td>{eval(language).points}</td>
                                <td>{userPoint}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="top-content-spec top-main-link">
                    <div className="top-step-link">
                        <a href="/prequestion">STEP1.アンケート記入</a>
                    </div>
                    <div className="top-link-container">
                        <div className="top-link">
                            <a href="/real_estate"><img src="./assets/image/top-link1.png" alt="" /></a>
                            <p>{eval(language).real_estate}</p>
                        </div>
                        <div className="top-link">
                            <a href="/money_seminar"><img src="./assets/image/top-link2.png" alt="" /></a>
                            <p>{eval(language).money}</p>
                        </div>
                        <div className="top-link">
                            <a href="/store">
                                <img src="./assets/image/top-link3.png" alt="" />
                                {newEventNum!==0 && <div>{newEventNum}</div>}
                            </a>
                             <p>{eval(language).store_sale}</p>
                        </div>
                        {/* <div className="top-link">
                            <a href="/comingsoon"><img src="./assets/image/top-link4.png" alt="" /></a>
                            <p>{eval(language).life}</p>
                        </div>
                        <div className="top-link">
                            <a href="/comingsoon"><img src="./assets/image/top-link5.png" alt="" /></a>
                            <p>{eval(language).inheritance}</p>
                        </div>
                        <div className="top-link">
                            <a href="/comingsoon"><img src="./assets/image/top-link6.png" alt="" /></a>
                            <p>{eval(language).before_marriage}</p>
                        </div> */}
                    </div>
                </div>
                <div className="top-content-spec">
                    <div className="top-foot">
                        <div className="top-foot-main">
                            <div className="top-foot-main-link">
                                <a href="/comingsoon">
                                    <div><img src="./assets/image/top-foot-link1.png" alt="" /></div>
                                    <p>{eval(language).scan}</p>
                                </a>
                                <a href="/sendPoint">
                                    <div><img src="./assets/image/top-foot-link2.png" alt="" /></div>
                                    <p>{eval(language).send_receive}</p>
                                </a>
                                <a href="/comingsoon">
                                    <div><img src="./assets/image/top-foot-link3.png" alt="" /></div>
                                    <p>{eval(language).save}</p>
                                </a>
                                <a href="/pointCharge">
                                    <div><img src="./assets/image/top-foot-link4.png" alt="" /></div>
                                    <p>{eval(language).charge}</p>
                                </a>
                            </div>
                            <div className="top-foot-point">
                                <img src="./assets/image/top-foot-point.png" alt="" />
                                <div className="top-foot-point-text">
                                    <h4>{eval(language).owned_point}</h4>
                                    <p>
                                        {userPoint}
                                        <span>pt</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="top-foot-top">
                            <div><img src="./assets/image/logo1.png" alt="" /></div>
                            <div><img src="./assets/image/qr-code1.png" alt="" /></div>
                        </div>
                    </div>
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

export default Home
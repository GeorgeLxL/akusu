import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader'
const baseurl = process.env.REACT_APP_API_BASE_URL;
const en = {
   
    scan:"Scan",
    send_receive:"Send/Receive",
    save:"Save",
    charge:"Charge",
    owned_point:"Owned points:",
    
}

const jp ={
    
    scan:"スキャン",
    send_receive:"送る・受け取る",
    save:"貯める",
    charge:"チャージ",
    owned_point:"保有ポイント：",

}

class Points extends Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            language:JSON.parse(localStorage.language).language,
            userPoint:"",
        }
    }

    componentDidMount()
    {
        var userData = JSON.parse(localStorage.userData);
        if(userData.userstatus===0)
        {
            this.props.history.push("/emailverify");
        }
        
        if(userData.userstatus===1 || userData.userstatus===0)
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
        const{language,userPoint,loading} = this.state
        return(
            <>
            <div className="container">
                <Header pageName="ポイント" />
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
                {loading && <Preloader/>}
            </>
        )
    }
}

export default Points
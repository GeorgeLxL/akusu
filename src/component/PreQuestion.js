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

class PreQuestion extends Component{

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
                    <Header pageName="事前アンケート" />
                    <div className="top-content-spec top-main-link prequestion-container">
                        <h3>まずは下記の簡単なアンケートにお答え下さい。</h3>
                        <div className="prequestion-input">
                            <h4>項目１</h4>
                            <input type="text" />
                        </div>
                        <div className="prequestion-input">
                            <h4>項目２</h4>
                            <input type="text" />
                        </div>
                        <div className="prequestion-input">
                            <h4>項目３</h4>
                            <input type="text" />
                        </div>
                        <div className="prequestion-input">
                            <h4>項目４</h4>
                            <input type="text" />
                        </div>
                        <div className="prequestion-input">
                            <h4>項目５</h4>
                            <input type="text" />
                        </div>
                        <div className="prequestion-input">
                            <h4>項目６</h4>
                            <input type="text" />
                        </div>
                        <button className="prequestion-btn">送信</button>
                    </div>
                    <Footer/>
                </div>
                {loading && <Preloader/>}
            </>
        )
    }
}

export default PreQuestion
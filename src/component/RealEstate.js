import { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader';
import RealEstateList from "./RealEstateList";
import RealEstateSale from "./RealEstateSale";
import RealEstateBuy from "./RealEstateBuy";
import RealEstateGuide from "./RealEstateGuide";

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

class RealEstate extends Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            language:JSON.parse(localStorage.language).language,
            userPoint:"",
            activeTab:(window.location.pathname).split("/")[2],
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
        const{activeTab,language,userPoint,loading} = this.state
        return(
            <>
                <div className="container">
                    <div className="container-main">
                    <Header pageName="不動産​" />
                    <div className="real-container">
                        <div className="real-detail-link">
                            <a href="/real_estate/list" className={activeTab=="list" ? "current" : ""}>物件<br />一覧</a>
                            <a href="/real_estate/sale" className={activeTab=="sale" ? "current" : ""}>物件を<br />売る</a>
                            <a href="/real_estate/buy" className={activeTab=="buy" ? "current" : ""}>物件を<br />買う</a>
                            <a href="/real_estate/guide" className={activeTab=="guide" ? "current" : ""}>初めての<br />方へ</a>
                        </div>
                    </div>
                        <Switch>
                            <Route exact path='/real_estate/list' component={RealEstateList} />
                            <Route exact path='/real_estate/sale' component={RealEstateSale} />
                            <Route exact path='/real_estate/buy' component={RealEstateBuy} />
                            <Route exact path='/real_estate/guide' component={RealEstateGuide} />
                        </Switch>
                    <Footer/>
                    </div>
                </div>
                {loading && <Preloader/>}
            </>
        )
    }
}

export default RealEstate
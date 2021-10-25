import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader'
import RealEstateList from './RealEstateList';
import RealEstateSale from './RealEstateSale';
import RealEstateBuy from './RealEstateBuy';
import RealEstateGuide from './RealEstateGuide';

const baseurl = process.env.REACT_APP_API_BASE_URL;
const en = {
    home:"Home",
    user_name:"User name",
    user_type:"User type",
    points:"Points",
    real_estate:"Real Estate",
    usertypes:['Individual', 'Company', 'Administrator', 'Introducer A', 'Introducer B','Introducer C'],
    property_list:"Property<br />list",
}

const jp ={
    home:"ホーム",
    user_name:"ユーザー名",
    user_type:"会員種類",
    points:"保有ポイント",
    real_estate:"不動産",
    usertypes:['個人会員', '企業', '運営者', '紹介者A', '紹介者B','紹介者C'],
    property_list:"物件<br />一覧",
}

class RealEstateDetail extends Component{   
    constructor(props) {
        super(props);
        this.state={
           loading:true,
           activeTab:(window.location.pathname).split("/")[3],
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
        const {loading, language, userName, userPoint, userType, avartar, newEventNum, activeTab} = this.state
        return(
        <>
            <div className="container">
                <Header notback={false} pageName={eval(language).real_estate}/>
                <div className="top-profile">
                    <div className="top-profile-img">
                        <img src={avartar ? `${baseurl}/media/${avartar}`: '/assets/image/avatar.svg'} alt="" />
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
                <div className="crumb">
                    <p><a href="/home">{eval(language).home}</a> &#62; <a href="/realEstate">{eval(language).real_estate}</a> &#62; 居抜きBank.com &#62; </p>
                </div>
                <div className="real-container1">
                    <div className="real-detail-link">
                        <a href="/realEstate/company/list" className={activeTab=="list" ? "current" : ""}>物件<br />一覧</a>
                        <a href="/realEstate/company/sale" className={activeTab=="sale" ? "current" : ""}>物件を<br />売る</a>
                        <a href="/realEstate/company/buy" className={activeTab=="buy" ? "current" : ""}>物件を<br />買う</a>
                        <a href="/realEstate/company/guide" className={activeTab=="guide" ? "current" : ""}>初めての<br />方へ</a>
                    </div>
                </div>
                <Switch>
                      <Route exact path='/realEstate/company/list' component={RealEstateList} />
                      <Route exact path='/realEstate/company/sale' component={RealEstateSale} />
                      <Route exact path='/realEstate/company/buy' component={RealEstateBuy} />
                      <Route exact path='/realEstate/company/guide' component={RealEstateGuide} />
                </Switch> 
                <Footer/>
            </div>
            {loading &&
                <Preloader/>
            }
        </>
        )
    }
}

export default RealEstateDetail
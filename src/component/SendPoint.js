import { Component } from "react";

import Preloader from './Layout/preloader'
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';


const baseurl = process.env.REACT_APP_API_BASE_URL;
class SendPoint extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            email:"",
            sendpoint:'',
            receivepoint:'',
            value: '',
            value1: '',
            error_receptance:"",
            error_point:"",
            loading:false,
            totalPoint: '',
        }
    }

    componentDidMount(){
        this.getUserdata()
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
                totalPoint: userData.userPoint,
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

    handlChangeSendPoint =  e =>{
        this.setState({
            sendpoint: (e.target.value.replace(/,/g, "")).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            receivepoint: (parseInt(e.target.value.replace(/,/g, "")) * 0.9725).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
        if (parseInt(e.target.value.replace(/,/g, "")) > parseInt(this.state.totalPoint)) {
            this.setState({
                sendpoint: (this.state.totalPoint).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                receivepoint: (parseInt(this.state.totalPoint) * 0.9725).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            });
        }
    }

    handleChangeReceive =  e =>{
        this.setState({
           sendpoint: (parseInt(e.target.value.replace(/,/g, "")) / 0.9725).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
           receivepoint: (e.target.value.replace(/,/g, "")).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
        if (parseInt(e.target.value.replace(/,/g, "")) > parseInt(parseInt(this.state.totalPoint) * 0.9725)) {
            this.setState({
                sendpoint: (this.state.totalPoint).replace(/\B(?=(\d{3})+(?!\d))/g, ",") ,
                receivepoint: (parseInt(this.state.totalPoint) * 0.9725).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            });
        }
    }

    handleSendKeyPress = e => {
        
        if (parseFloat(this.state.value) > parseFloat(this.state.totalPoint)) this.setState({value: ((this.state.totalPoint).toString())})
    }
    
    handleReceiveKeyPress = e => {
        
        if (parseFloat(this.state.value1 / 0.9725) > parseFloat(this.state.totalPoint)) this.setState({value1: (parseInt(this.state.totalPoint * 0.9725)).toString()})
    }

    handleChange = filedName => e=>{
        this.setState({
            erroremail:"",
            errorpassword:"",
            [filedName]:e.target.value
        })
    }

    handleSubmit = event =>{
        
        event.preventDefault();
        const {email, sendpoint} = this.state
        var sendpoint1 = parseFloat(sendpoint.replace(/,/g, ''))
        var validate = true;
        if(email==="")
        {
            this.setState({error_receptance:"受信者のメールアドレスを入力してください。"})
            validate = false;
        }
        if(sendpoint1<1)
        {
            this.setState({error_point:"送信するポイントの量を入力してください。"})
            validate = false;
        }
        if(!validate)
        {
            return;
        }
        this.setState({loading:true});
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token;
        var data = JSON.stringify({email:email, point:sendpoint1});
        var config = {
            method: 'POST',
            url: `${baseurl}/api/point/send`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            data:data
        };
        axios(config)
        .then((response) => {
            console.log(response);
            this.setState({loading:false});
            window.location.assign('/home')
        })
        .catch((error)=>{
            this.setState({loading:false})
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
                if(error.response.status===400) {
                    if(error.response.data.send_yourself)
                    {
                        this.setState({error_receptance:"自分にポイントを送ることはできません。"})
                    }
                    
                    if(error.response.data.send_user_error){
                        this.setState({error_receptance:"受信者が存在しません。"})
                    }
                    if(error.response.data.points)
                    {
                        this.setState({error_point:"ポイントが足りません。"})
                    }
                }
            }
        })
    }

    render(){
        const {email, sendpoint, receivepoint,error_point, error_receptance, loading, totalPoint} = this.state
        return(
            <>
                <div className="container">
                    <div className="container-main">
                    <Header pageName="ポイント送信"/>
                        <div className="seminar-card seminar-detail-card">
                        <h2 style={{marginBottom: '1em'}}>現在の保有ポイント : {totalPoint}</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="profile-input-box">
                                <div className="profile-title">
                                    <h3>受信者メールアドレス</h3>
                                </div>
                                <div className="profile-input-container">
                                    <input style={{width:'100%'}} className="profile-input-input" type="email" value={email} onChange={this.handleChange("email")} />
                                </div>
                                <span className="error">{error_receptance}</span>
                            </div>
                            <div className="profile-input-box">
                                <div className="profile-title">
                                    <h3>ポイント</h3>
                                </div>
                                <div className="time-input-container">
                                    <div className="time-input-box">
                                        <label >送信ポイント</label>
                                        <input type="text" value={sendpoint === 'NaN'? '': sendpoint} onChange={this.handlChangeSendPoint} />
                                    </div>
                                    <div className="time-input-box">
                                        <label >受け取りポイント</label>
                                        <input type="text" value={receivepoint === 'NaN'? '': receivepoint} onChange={this.handleChangeReceive} />
                                    </div>
                                </div>
                                <span className="error">{error_point}</span>
                            </div>
                    
                            <div className="profile-input-upload event-input-upload">
                                <button type="submit">送信</button>
                            </div>
                            </form>
                        </div>
                    <Footer/>
                    </div>
                </div>
                {loading && <Preloader/> }
            </>
        )
    }
}

export default SendPoint;
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
            sendpoint: this.state.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            receivepoint: parseFloat(parseFloat(this.state.value) * 0.973).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    }

    handleChangeReceive =  e =>{
        this.setState({
           sendpoint: parseFloat(parseFloat(this.state.value1) / 0.973).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
           receivepoint: this.state.value1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            
        });
    }

    handleSendKeyPress = e => {
        if (e.keyCode == 48 || e.keyCode == 96) {
          this.setState({value: this.state.value.toString() + '0'})
        }
        if (e.keyCode == 49 || e.keyCode == 97) {
          this.setState({value: this.state.value.toString() + '1'})
        }
        if (e.keyCode == 50 || e.keyCode == 98) {
          this.setState({value: this.state.value.toString() + '2'})
        }
        if (e.keyCode == 51 || e.keyCode == 99) {
          this.setState({value: this.state.value.toString() + '3'})
        }
        if (e.keyCode == 52 || e.keyCode == 100) {
          this.setState({value: this.state.value.toString() + '4'})
        }
        if (e.keyCode == 53 || e.keyCode == 101) {
          this.setState({value: this.state.value.toString() + '5'})
        }
        if (e.keyCode == 54 || e.keyCode == 102) {
          this.setState({value: this.state.value.toString() + '6'})
        }
        if (e.keyCode == 55 || e.keyCode == 103) {
          this.setState({value: this.state.value.toString() + '7'})
        }
        if (e.keyCode == 56 || e.keyCode == 104) {
          this.setState({value: this.state.value.toString() + '8'})
        }
        if (e.keyCode == 57 || e.keyCode == 105) {
          this.setState({value: this.state.value.toString() + '9'})
        }
        if (e.keyCode == 8) {
            if (this.state.value != '') {
                this.setState({value: this.state.value.slice(0, -1)});
            }
        }
        if (parseFloat(this.state.value) > parseFloat(this.state.totalPoint)) this.setState({value: ((this.state.totalPoint).toString())})
    }
    
    handleReceiveKeyPress = e => {
        if (e.keyCode == 48 || e.keyCode == 96) {
          this.setState({value1: this.state.value1.toString() + '0'})
        }
        if (e.keyCode == 49 || e.keyCode == 97) {
          this.setState({value1: this.state.value1.toString() + '1'})
        }
        if (e.keyCode == 50 || e.keyCode == 98) {
          this.setState({value1: this.state.value1.toString() + '2'})
        }
        if (e.keyCode == 51 || e.keyCode == 99) {
          this.setState({value1: this.state.value1.toString() + '3'})
        }
        if (e.keyCode == 52 || e.keyCode == 100) {
          this.setState({value1: this.state.value1.toString() + '4'})
        }
        if (e.keyCode == 53 || e.keyCode == 101) {
          this.setState({value1: this.state.value1.toString() + '5'})
        }
        if (e.keyCode == 54 || e.keyCode == 102) {
          this.setState({value1: this.state.value1.toString() + '6'})
        }
        if (e.keyCode == 55 || e.keyCode == 103) {
          this.setState({value1: this.state.value1.toString() + '7'})
        }
        if (e.keyCode == 56 || e.keyCode == 104) {
          this.setState({value1: this.state.value1.toString() + '8'})
        }
        if (e.keyCode == 57 || e.keyCode == 105) {
          this.setState({value1: this.state.value1.toString() + '9'})
        }
        if (e.keyCode == 8) {
            if (this.state.value1 != '') {
                this.setState({value1: this.state.value1.slice(0, -1)});
            }
        }
        if (parseFloat(this.state.value1 / 0.973) > parseFloat(this.state.totalPoint)) this.setState({value1: (parseInt(this.state.totalPoint * 0.973)).toString()})
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
                    <Header pageName="ポイント送信"/>
                        <div className="seminar-card seminar-detail-card">
                        <h2 style={{marginBottom: '1em'}}>現在の保有ポイント : {totalPoint}</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="profile-input-box">
                                <div className="profile-title">
                                    <h3>受信者メールアドレス</h3>
                                </div>
                                <div className="profile-input-container">
                                    <input style={{width:'100%'}} className="profile-input-input profile-input-input1" type="email" value={email} onChange={this.handleChange("email")} />
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
                                        <input type="text" value={sendpoint == 'NaN'? '': sendpoint} onChange={this.handlChangeSendPoint} onKeyDown={this.handleSendKeyPress} />
                                    </div>
                                    <div className="time-input-box">
                                        <label >受け取りポイント</label>
                                        <input type="text" value={receivepoint == 'NaN'? '': receivepoint} onChange={this.handleChangeReceive} onKeyDown={this.handleReceiveKeyPress} />
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
                {loading && <Preloader/> }
            </>
        )
    }
}

export default SendPoint;
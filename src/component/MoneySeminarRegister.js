import { Component } from "react";
import axios from 'axios';
import Preloader from './Layout/preloader'
import MoneySeminar from "./MoneySeminar";
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

class MoneySeminarRegister extends Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            language:JSON.parse(localStorage.language).language,
            userPoint:"",
            activeTab:(window.location.pathname).split("/")[2],
            interest:0,
            want:0,
            agreement:false,
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
                userinterest:userData.userType,
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
    handleSubmit = (event)=>{
        event.preventDefault();
        const {agreement, interest, want} = this.state
        if(!agreement){
            return;
        }
        else{
            this.setState({loading:true});
            var userData = JSON.parse(localStorage.userData);
            var token = userData.token
            var data = JSON.stringify({"interest":interest,"want":want,});
            var config = {
                method: 'post',
                url: `${baseurl}/api/money/register`,
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
        const{activeTab,language,userPoint,loading} = this.state
        return(
            <>
                <div className="real-container1 real-container3">
                    <form onSubmit={this.handleSubmit}>
                        <div className="real-sale-container">
                            <div className="real-sale-input-box">
                                <h4>興味のあるお金のセミナー</h4>
                                <div className="real-sale-type">
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:0})}} checked={this.state.interest===0}/>
                                        <span></span>
                                        保険
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:1})}} checked={this.state.interest===1}/>
                                        <span></span>
                                        貯蓄
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:2})}} checked={this.state.interest===2}/>
                                        <span></span>
                                        資産運用
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:3})}} checked={this.state.interest===3}/>
                                        <span></span>
                                        節税
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:4})}} checked={this.state.interest===4}/>
                                        <span></span>
                                        不動産活用
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:5})}} checked={this.state.interest===5}/>
                                        <span></span>
                                        ライフプラニング/家計の見直し
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:6})}} checked={this.state.interest===6}/>
                                        <span></span>
                                        老後資金
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:7})}} checked={this.state.interest===7}/>
                                        <span></span>
                                        投資信託
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:8})}} checked={this.state.interest===8}/>
                                        <span></span>
                                        IDECO/NISA
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:9})}} checked={this.state.interest===9}/>
                                        <span></span>
                                        教育資金
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:10})}} checked={this.state.interest===10}/>
                                        <span></span>
                                        不動産投資
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:11})}} checked={this.state.interest===11}/>
                                        <span></span>
                                        相続
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:12})}} checked={this.state.interest===12}/>
                                        <span></span>
                                        生前贈与
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:13})}} checked={this.state.interest===13}/>
                                        <span></span>
                                        リースバック
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:14})}} checked={this.state.interest===14}/>
                                        <span></span>
                                        リバースモーゲージ
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:15})}} checked={this.state.interest===15}/>
                                        <span></span>
                                        資金調達
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-type" type="radio" onClick={(e)=>{this.setState({interest:16})}} checked={this.state.interest===16}/>
                                        <span></span>
                                        補助金/助成金
                                    </label>
                                </div>
                            </div>
                            <div className="real-sale-input-box">
                                <h4>どのようなことをしたいですか？</h4>
                                <div className="real-sale-type">
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:0})}} checked={this.state.want===0}/>
                                        <span></span>
                                        お金の勉強がしたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:1})}} checked={this.state.want===1}/>
                                        <span></span>
                                        株の勉強がしたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:2})}} checked={this.state.want===2}/>
                                        <span></span>
                                        暗号通貨の勉強がしたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:3})}} checked={this.state.want===3}/>
                                        <span></span>
                                        FXの勉強がしたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:4})}} checked={this.state.want===4}/>
                                        <span></span>
                                        補助金申請をお願いしたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:5})}} checked={this.state.want===5}/>
                                        <span></span>
                                        住宅ローンの返済で困っている
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:6})}} checked={this.state.want===6}/>
                                        <span></span>
                                        海外外貨稼ぎたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:7})}} checked={this.state.want===7}/>
                                        <span></span>
                                        ポイント活用
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:8})}} checked={this.state.want===8}/>
                                        <span></span>
                                        老後の資金を貯めたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:9})}} checked={this.state.want===9}/>
                                        <span></span>
                                        保険を見直したい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:10})}} checked={this.state.want===10}/>
                                        <span></span>
                                        家計を見直したい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:11})}} checked={this.state.want===11}/>
                                        <span></span>
                                        教育資金を貯めたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:12})}} checked={this.state.want===12}/>
                                        <span></span>
                                        土地を活用したい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:13})}} checked={this.state.want===13}/>
                                        <span></span>
                                        社会活動的な寄付をしたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:14})}} checked={this.state.want===14}/>
                                        <span></span>
                                        サイドビジネスをやりたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:15})}} checked={this.state.want===15}/>
                                        <span></span>
                                        販路拡大したい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:16})}} checked={this.state.want===16}/>
                                        <span></span>
                                        隙間時間の活用をしたい
                                    </label>
                                    <label className="real-sale-type-select">
                                        <input name="real-sale-area" type="radio" onClick={(e)=>{this.setState({want:17})}} checked={this.state.want===17}/>
                                        <span></span>
                                        自社ビジネスを展開
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
                {loading && <Preloader/>}
            </>
        )
    }
}

export default MoneySeminarRegister
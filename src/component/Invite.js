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
    user_name:"User name",
    user_type:"User type",
    points:"Points",
    usertypes:['Individual', 'Company', 'Administrator', 'Introducer A', 'Introducer B','Introducer C'],
    invite:"Invite",
    send:"Send",
    intro:"Invite",
    
}

const jp ={
    
    scan:"スキャン",
    send_receive:"送る・受け取る",
    save:"貯める",
    charge:"チャージ",
    owned_point:"保有ポイント：",
    user_name:"ユーザー名",
    user_type:"会員種類",
    points:"保有ポイント",
    usertypes:['個人会員', 'ビジネス利用', '運営者', '紹介者A', '紹介者B','紹介者C'],
    invite:"友達紹介",
    send:"保存する",
    intro:"友達紹介",

}

class Invite extends Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            userName:"",
            userType:"",
            userPoint:0,
            avartar:"",
            language:JSON.parse(localStorage.language).language,
            invite: true,
            referalcode: '',
            emailModal: false,
            copied: false,
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
                avartar: srcBase64,
                invite: userData.invite,
                referalcode:(userData.referalcode==='null' || userData.referalcode===null)?'':userData.referalcode,
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

    codeCopy =() => {
        navigator.clipboard.writeText(this.state.referalcode)
        this.setState({copied: true})
        setTimeout(() => {
            this.setState({ copied: false });
          }, 3000);
    }

    render(){
        const{language,userPoint,loading, avartar, userName, userType, referalcode, emailModal, copied} = this.state
        return(
            <>
                <div className="container">
                    <div className="container-main">
                    <Header pageName={eval(language).invite} />
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
                    <div className="invite-container">
                        {
                            this.state.invite?
                            <></>
                            :
                            <h3>友達を招待して、<br />50ポイントを確実にゲットしよう！</h3>
                        }
                        <p>招待コード：<span className={copied?"copied":""} onClick={this.codeCopy} >{referalcode}</span></p>
                        <h3>友達を招待する方法</h3>
                        <div>
                            <p>1.友達のスマートフォンに<br />AKUSHUアプリを入れてもらう。</p>
                            <p>2.友達があなたの招待コードを入力して登録</p>
                        </div>
                        {/* <div className="invite-main">
                            <h4>シェア</h4>
                            <div>
                                <a>
                                    <img src="/assets/image/invite-icon-line.png" alt="Line Icon" />
                                    <p>Line</p>
                                </a>
                                <a>
                                    <img src="/assets/image/invite-icon-link.png" alt="Link Icon" />
                                    <p>リンクを<br />コピー</p>
                                </a>
                                <a>
                                    <img src="/assets/image/invite-icon-twitter.png" alt="Twitter Icon" />
                                    <p>Twitter</p>
                                </a>
                                <a onClick={()=>this.setState({emailModal: true})}>
                                    <img src="/assets/image/invite-icon-mail.png" alt="mail Icon" />
                                    <p>メール</p>
                                </a>
                                <a>
                                    <img src="/assets/image/invite-icon-facebook.png" alt="Facebook Icon" />
                                    <p>Facebook</p>
                                </a>
                                <a>
                                    <img src="/assets/image/invite-icon-sms.png" alt="SMS Icon" />
                                    <p>SMS</p>
                                </a>
                            </div>
                            <div>
                                <a onClick={(e)=>window.location.reload()}>
                                    <img src="/assets/image/invite-icon-refresh.png" alt="Refresh" />
                                    <p>更新</p>
                                </a>
                                <a>
                                    <img src="/assets/image/invite-icon-safari.png" alt="Safari Icon" />
                                    <p>Safari で<br />開く</p>
                                </a>
                            </div>
                        </div> */}
                        {/* <h3>獲得ポイント：0 &#62;</h3> */}
                    </div>
                    <Footer/>
                    </div>
                </div>
                {/* <div className={`intro-modal ${emailModal?'intro-modal-show':''}`} onClick={()=>this.setState({emailModal: false})}>
                    <div className="container">
                        <div className="intro-modal-body" onClick={(e)=>e.stopPropagation()}>
                            <h3>{eval(language).intro}</h3>
                            <input type="email" required />
                            <button onClick={()=>this.setState({emailModal: false})} >{eval(language).send}</button>
                        </div>
                    </div>
                </div> */}
                {loading && <Preloader/>}
            </>
        )
    }
}

export default Invite
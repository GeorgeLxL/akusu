import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader'
const baseurl = process.env.REACT_APP_API_BASE_URL;

const en={
    addnew:"Add New",
    events:"Seminars-Events",
    general:"General",
    special:"Special",
    free:"Free",
    yen:"JPY",
    detail:"Detail"
}

class Notifications extends Component{

    constructor(props) {
        super(props);
        this.state={
            language:JSON.parse(localStorage.language).language,
            notifications:[],
            messages: [],
            message: '',
            loading:false,
            avatar: '',
        }
    }

    componentDidMount(){
        this.getNotification();
        this.getMessages();
        var chatContent = document.getElementsByClassName('chat-card-content')[0];
        chatContent.scrlltop = chatContent.scrollHeight - chatContent.offsetHeight;
    }

    getNotification(){
        this.setState({loading:true})
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
            this.setState({
                loading:false,
                notificationcount:response.data.count,
                notifications:JSON.parse(response.data.notifications),
            });
            this.setReadMark();

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

    setReadMark(){
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'get',
            url: `${baseurl}/api/setnotificationsread`,
            headers: { 
            'Authorization': 'Bearer ' + token,
            },
                data : {},
        };
        axios(config)
        .then((response) => {
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

    getMessages(){
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'post',
            url: `${baseurl}/api/getusermessages`,
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            data : {},
        };
        axios(config)
        .then((response) => {
            this.setState({
                messages:response.data.messages,
                avatar: response.data.avatar
            });
            console.log(JSON.parse(response.data.messages))
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
    
        this.interval = setInterval(() => {
            var userData = JSON.parse(localStorage.userData);
            var token = userData.token
            var config = {
                method: 'post',
                url: `${baseurl}/api/getusermessages`,
                headers: { 
                'Authorization': 'Bearer ' + token,
                },
                    data : {},
            };
            axios(config)
            .then((response) => {
                this.setState({
                    messages:response.data.messages,
                    avatar: response.data.avatar
                });
                this.setMessageRead()
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
        },5000)
    }

    setMessageRead() {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'post',
            url: `${baseurl}/api/setmessagesread`,
            headers: { 
                'Authorization': 'Bearer ' + token,
            },
            data : {},
        };
        axios(config)
        .then((response) => {
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

    handleChangeMessage = filedName => e=>{
        this.setState({
            [filedName]:e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {message} = this.state;
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        if(message==""){
            return
        }
        var fd = new FormData();
        fd.append('message', message)
        fd.append('user', 'user')
        fd.append('photo', null)
        var config = {
            method: 'post',
            url: `${baseurl}/api/sendmessage`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data : fd
        };
        axios(config)
        .then((response)=>{
            this.setState({message:""});
            this.getMessages();
        })
        .catch((error)=>{
            if(error.response.status===401){
                localStorage.removeItem("userData");
                window.location.assign('/');
            }
        });
    }

    sendPhotoMessage = e => {
        var photo = e.target.files[0];
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var fd = new FormData()
        fd.append('message', '')
        fd.append('photo', photo)
        fd.append('user', 'user')
        var config = {
            method: 'post',
            url: `${baseurl}/api/sendmessage`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: fd
        };
        axios(config)
        .then((response)=>{
            this.setState({message: ""});
            this.getMessages();
        })
        .catch((error)=>{
            if(error.response.status===401){
                localStorage.removeItem("userData");
                window.location.assign('/');
            }
        });
    }

    componentWillMount() {
        clearInterval(this.interval)
    }

    render()
    {
        const {loading, notifications, messages, avatar} = this.state
        return(
            <>
                <div className="container" onScroll={this.handleScroll}>
                    <Header pageName="お知らせ"/>
                    <div className="notification-container-main">
                        <div className="notification-container notification-container-spec">
                            <div className="notification-card">
                                <h3>お知らせ一覧</h3>
                                <div className="notification-main-container">
                                    {notifications.map((notification, index)=>(
                                        <div key={index}  className={notification.fields.readStatus ? "notification-main" : "notification-main unread"}>
                                            <p>{(new Date(notification.fields.created_at)).getFullYear().toString() + '年' + ((new Date(notification.fields.created_at)).getMonth()+1).toString() + '月' + (new Date(notification.fields.created_at)).getDate().toString() + '日'}</p>
                                            <p>{notification.fields.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="notification-container">
                            <div className="chat-card">
                                <div className="chat-card-content">
                                    <div className="chat-card-content1">
                                    {messages.map((item)=>(
                                        <div key={item.pk} className={`${item.send ? "chat-inbox" : "chat-outbox"} ${item.first? "first":""}`}>
                                            
                                            {!item.send ? "": item.first? <img src={avatar ? `${baseurl}/media/${avatar}`:"/assets/image/avatar.svg"} /> : ""}
                                            <div>
                                                {
                                                    item.content != ''?
                                                    <p>{item.content}</p>
                                                    :
                                                    <></>
                                                }
                                                {
                                                    item.photo?
                                                    <img src={`${baseurl}/media/${item.photo}`} />
                                                    :
                                                    <></>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                <div className="chat-photo">
                                    <input type="file" onChange={this.sendPhotoMessage} ref={(ref) => this.upload = ref} hidden accept="image/*" />
                                    <button onClick={(e) => this.upload.click()} ><img src="/assets/image/top-foot-link4.png" /></button>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="chat-input">
                                        <input type="text" onChange={this.handleChangeMessage("message")} value={this.state.message}/>
                                        <button onClick={this.handleSubmit}><img src="/assets/image/top-foot-link2.png" /></button>
                                    </div>
                                </form>
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

export default Notifications
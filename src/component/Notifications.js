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
            loading:false,
        }
    }

    componentDidMount(){
        this.getNotification();
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



    render()
    {
        const {loading, notifications} = this.state
        return(
            <>
                <div className="container" onScroll={this.handleScroll}>
                    <Header pageName="お知らせ"/>
                    <div className="" >

                        {notifications.map((notification, index)=>(
                            <div key={index}  className={notification.fields.readStatus ? "seminar-card" : "seminar-card unread"}>
                                <p>{notification.fields.content}</p>
                            </div>
                        ))}
                            
                    </div>
                    <div className="notification-container">
                        <div className="notification-card">
                            <h3>お知らせ一覧</h3>
                            <div className="notification-main-container">
                                <div className="notification-main">
                                    <p>2021/10/21</p>
                                    <h4>お知らせお知らせお知らせお知らせお知らせお知らせお知らせ</h4>
                                </div>
                                <div className="notification-main">
                                    <p>2021/10/21</p>
                                    <h4>お知らせ</h4>
                                </div>
                                <div className="notification-main">
                                    <p>2021/10/21</p>
                                    <h4>お知らせ</h4>
                                </div>
                                <div className="notification-main">
                                    <p>2021/10/21</p>
                                    <h4>お知らせ</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="notification-container">
                        <div className="chat-card">
                            <div className="chat-card-content">
                                <div className="chat-card-content1">
                                    <div className="chat-inbox">
                                        <img src="assets/image/top-profile-img.png" />
                                        <p>abcdab adfa asd aasdfasdf asdff</p>
                                    </div>
                                    <div className="chat-outbox">
                                        <p>お知らせ</p>
                                    </div>
                                    <div className="chat-inbox">
                                        <img src="assets/image/top-profile-img.png" />
                                        <p>abcdab adfa asd aasdfasdf asdff</p>
                                    </div>
                                    <div className="chat-outbox">
                                        <p>お知らせ</p>
                                    </div>
                                    <div className="chat-inbox">
                                        <img src="assets/image/top-profile-img.png" />
                                        <p>abcdab adfa asd aasdfasdf asdff</p>
                                    </div>
                                    <div className="chat-outbox">
                                        <p>お知らせ</p>
                                    </div>
                                    <div className="chat-inbox">
                                        <img src="assets/image/top-profile-img.png" />
                                        <p>abcdab adfa asd aasdfasdf asdff</p>
                                    </div>
                                    <div className="chat-unread">
                                        <div></div>
                                        <p>お知らせ</p>
                                        <div></div>
                                    </div>
                                    <div className="chat-outbox">
                                        <p>aasdfasdf</p>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-input">
                                <input type="text" />
                                <button><img src="assets/image/top-foot-link2.png" /></button>
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
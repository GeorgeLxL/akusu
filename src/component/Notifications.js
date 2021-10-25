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
                    <div className="seminar-card-container" >

                        {notifications.map((notification, index)=>(
                            <div key={index}  className={notification.fields.readStatus ? "seminar-card" : "seminar-card unread"}>
                                <p>{notification.fields.content}</p>
                            </div>
                        ))}
                            
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
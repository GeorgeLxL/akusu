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

class MoneySeminar extends Component{

    constructor(props){
        super(props);
        this.state = {
            loading:false,
            eventList:[],
            offset:0,
            totalCount:0,
            language:JSON.parse(localStorage.language).language
        }
    }

    componentDidMount(){
        this.getEventList(0);
    }  
      
    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            var {offset, totalCount, eventList} = this.state;
            offset+=5;
            this.setState({offset:offset})
            if(totalCount!== eventList.length)
            {
                this.getEventList(offset)
            }
        }
    };

    getEventList(offset)
    {
        this.setState({loading:true}) 
        var data = JSON.stringify({"offset":offset,"limit":5});
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token;

        var config = {
            method: 'post',
            url: `${baseurl}/api/events`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
                data : data,
        };
        
        axios(config)
        .then((response) => {
            var {eventList} = this.state;
            eventList = eventList.concat(response.data.events);
            this.setState({
                loading:false,
                eventList:eventList,
                totalCount:response.data.count
            });
        })
        .catch((error)=>{
            this.setState({loading:false});
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
        const {loading, eventList} = this.state
        return(
            <>
                <div className="container" onScroll={this.handleScroll}>
                    <Header pageName="お金のセミナー"/>
                    <div>
                        <div className="seminar-card" style={{textAlign:'right'}}>
                            <button className="seminar-link seminar-link-brown"  onClick={(e)=>{window.location.assign("/addNewEvent")}} >追加する</button>
                        </div>
                    </div>
                    <div className="iframe-container">
                        <iframe src="https://otonanookane.com/"></iframe>
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

export default MoneySeminar
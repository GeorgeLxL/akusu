import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader'
const baseurl = process.env.REACT_APP_API_BASE_URL;

class EventDetail extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            loading:false,
            detailevent:{
                fields:{
                    date:""
                }
            }
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.getEventdetail(id)
    }

    getEventdetail(id){
        this.setState({loading:true})      
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token;
        var config = {
            method: 'get',
            url: `${baseurl}/api/event/${id}`,
            headers: { 
                'Authorization': 'Bearer ' + token
            },
            data:{}
        };
        
        axios(config)
        .then((response) => {
            var responseData = JSON.parse(response.data.event)[0]
            console.log(responseData)
            this.setState({
                loading:false,
                detailevent:responseData
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


    render(){
        const {loading, detailevent} = this.state
        return(
            <>
                <div className="container">
                   <Header pageName="セミナー・イベント詳細"/>
                    <div className="seminar-card-container">
                        <div className="seminar-card seminar-detail-card">
                            <h2>{detailevent.fields.title}</h2>
                            <div className="seminar-main-img">
                                {detailevent.fields.main_image && <img src={`${baseurl}/media/${detailevent.fields.main_image}`} alt="" />}
                            </div>
                            <h3>開催日時</h3>
                            {detailevent.fields.date && <p>{`${detailevent.fields.date.slice(0,10).replaceAll("-", "/")}  ${detailevent.fields.start_time} ~ ${detailevent.fields.end_time}`}</p>}
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>イベント内容</h3>
                            <p>{detailevent.fields.content}
                            </p>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>タイムテーブル</h3>
                            <div className="seminar-main-img">
                                <div>
                                    {detailevent.fields.schedule1_image && <img src={`${baseurl}/media/${detailevent.fields.schedule1_image}`} alt="" />}
                                </div>
                                <div>
                                    {detailevent.fields.schedule2_image && <img src={`${baseurl}/media/${detailevent.fields.schedule2_image}`} alt="" />}
                                </div>
                                <div>
                                    {detailevent.fields.schedule3_image && <img src={`${baseurl}/media/${detailevent.fields.schedule3_image}`} alt="" />}
                                </div>
                            </div>
                            <div className="seminar-detail-desc">
                                {detailevent.fields.schedule1_starttime && <p className="seminar-detail-subtitle">{`${detailevent.fields.schedule1_starttime} ~ ${detailevent.fields.schedule1_endtime} ${detailevent.fields.schedule1_title}`}</p>}
                                <p>{detailevent.fields.schedule1_content?detailevent.fields.schedule1_content:""}</p>
                            </div>
                            <div className="seminar-detail-desc">
                                {detailevent.fields.schedule2_starttime && <p className="seminar-detail-subtitle">{`${detailevent.fields.schedule2_starttime} ~ ${detailevent.fields.schedule2_endtime} ${detailevent.fields.schedule2_title}`}</p>}
                                <p>{detailevent.fields.schedule2_content?detailevent.fields.schedule2_content:""}</p>
                            </div>
                            <div className="seminar-detail-desc">
                                {detailevent.fields.schedule3_starttime && <p className="seminar-detail-subtitle">{`${detailevent.fields.schedule3_starttime} ~ ${detailevent.fields.schedule3_endtime} ${detailevent.fields.schedule3_title}`}</p>}
                                <p>{detailevent.fields.schedule3_content?detailevent.fields.schedule3_content:""}</p>
                            </div>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>ランチ会場</h3>
                            <div className="seminar-main-img">
                                {detailevent.fields.restaurant_image && <img src={`${baseurl}/media/${detailevent.fields.restaurant_image}`} alt="" />}
                            </div>
                            <p className="seminar-detail-subtitle">{detailevent.fields.lunch_location}</p>
                            <p>
                                {detailevent.fields.lunch_location_description?detailevent.fields.lunch_location_description:""}
                            </p>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>講師紹介</h3>
                            <div className="seminar-lecturer">
                            {detailevent.fields.lecturer_image && <img src={`${baseurl}/media/${detailevent.fields.lecturer_image}`} alt="" />}
                            </div>
                            <p className="seminar-detail-subtitle">{detailevent.fields.lecturer_name}</p>
                            <p>
                                {detailevent.fields.lecturer_introduction?detailevent.fields.lecturer_introduction:""}
                            </p>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>参加費</h3>
                            <p>般参加枠：{detailevent.fields.fee}円</p>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>参加申し込み</h3>
                            <div className="seminar-detail-button-container">
                                <button onClick={(e)=>{window.location.assign(`/applyEvent/${detailevent.pk}`)}} className="seminar-detail-button seminar-detail-button-green">当日現金払い</button>
                                {/* <button className="seminar-detail-button seminar-detail-button-red">事前支払い<br/>クレジットカード</button> */}
                            </div>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>会場</h3>
                            <div className="seminar-detail-desc">
                                <p>{detailevent.fields.location_room_name}</p>
                            </div>
                            <div className="seminar-detail-desc">
                                <p>{detailevent.fields.location_building_name}</p>
                            </div>
                            <div className="seminar-detail-desc">
                                <p>{detailevent.fields.location_way}<br/>
                                    {detailevent.fields.location_detail_link !=="" && <a target="_blank" className="seminar-detail-link" href={detailevent.fields.location_detail_link}>{detailevent.fields.location_detail_link}</a>}
                                </p>
                            </div>
                            {detailevent.fields.location_map_link !=="" && <iframe src={detailevent.fields.location_map_link} style={{border:0}} allowfullscreend="true" loading="lazy"></iframe>}
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

export default EventDetail;
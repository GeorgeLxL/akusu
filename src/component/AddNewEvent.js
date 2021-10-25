import { Component } from "react";
import Footer from './Layout/footer';
import Header from './Layout/header';
import axios from 'axios';
import Preloader from './Layout/preloader';

const baseurl = process.env.REACT_APP_API_BASE_URL;

class AddNewEvent extends Component{

    constructor(props){
        super(props);
        this.state={
            loading:false,
            eventTitle:"",
            eventDate:"",
            eventStartTime:"",
            eventEndTime:"",
            eventContent:"",
            schedule1Title:"",
            schedule1StartTime:"",
            schedule1EndTime:"",
            schedule1Content:"",
            schedule2Title:"",
            schedule2StartTime:"",
            schedule2EndTime:"",
            schedule2Content:"",
            schedule3Title:"",
            schedule3StartTime:"",
            schedule3EndTime:"",
            schedule3Content:"",
            lunchLocation:"",
            lunchLocationDescription:"",
            lecturerName:"",
            lecturerIntroduction:"",
            fee:"",
            locationRoomName:"",
            locationBuildingName:"",
            locationWay:"",
            detailLink:"",
            googleMapLink:"",
            mainImg:"",
            mainImgFile:null,
            schedule1Img:"",
            schedule1ImgFile:null,
            schedule2Img:"",
            schedule2ImgFile:null,
            schedule3Img:"",
            schedule3ImgFile:null,
            restaurantImg:"",
            restaurantImgFile:null,
            lecturerImg:"",
            lecturerImgFile:null,
        }
    }

    handleChange = filedName => e=>{
        this.setState({
            [filedName]:e.target.value
        })
    }

    updateImage = filedName => e=>{
        let fileObj = e.target.files[0];
        let image = URL.createObjectURL(fileObj);
        this.setState({
            [filedName]:image,
            [`${filedName}File`]:fileObj,
        })
    }

    handleSubmit = e =>{
        const fd = new FormData();
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token;
        const {mainImgFile,eventTitle, eventDate, eventStartTime, eventEndTime, eventContent, fee} = this.state;
        const {schedule1Title, schedule1StartTime, schedule1EndTime, schedule1Content, schedule1ImgFile} = this.state;
        const {schedule2Title, schedule2StartTime, schedule2EndTime, schedule2Content, schedule2ImgFile} = this.state;
        const {schedule3Title, schedule3StartTime, schedule3EndTime, schedule3Content, schedule3ImgFile} = this.state;
        const {lunchLocation, lunchLocationDescription, restaurantImgFile} = this.state;
        const {lecturerName, lecturerIntroduction, lecturerImgFile,locationRoomName,locationBuildingName,locationWay,detailLink,googleMapLink} = this.state;
        
        this.setState({loading:true});
        fd.append('eventTitle', eventTitle);
        fd.append('eventDate', eventDate);
        fd.append('eventStartTime', eventStartTime);
        fd.append('eventEndTime', eventEndTime);
        fd.append('eventContent', eventContent);
        fd.append('mainImgFile', mainImgFile);
        fd.append('fee', fee);
        fd.append('schedule1Title', schedule1Title);
        fd.append('schedule1StartTime', schedule1StartTime);
        fd.append('schedule1EndTime', schedule1EndTime);
        fd.append('schedule1Content', schedule1Content);
        fd.append('schedule1ImgFile', schedule1ImgFile);
        fd.append('schedule2Title', schedule2Title);
        fd.append('schedule2StartTime', schedule2StartTime);
        fd.append('schedule2EndTime', schedule2EndTime);
        fd.append('schedule2Content', schedule2Content);
        fd.append('schedule2ImgFile', schedule2ImgFile);
        fd.append('schedule3Title', schedule3Title);
        fd.append('schedule3StartTime', schedule3StartTime);
        fd.append('schedule3EndTime', schedule3EndTime);
        fd.append('schedule3Content', schedule3Content);
        fd.append('schedule3ImgFile', schedule3ImgFile);
        fd.append('lunchLocation', lunchLocation);
        fd.append('lunchLocationDescription', lunchLocationDescription);
        fd.append('restaurantImgFile', restaurantImgFile);
        fd.append('lecturerName', lecturerName);
        fd.append('lecturerIntroduction', lecturerIntroduction);
        fd.append('lecturerImgFile', lecturerImgFile);
        fd.append('locationRoomName', locationRoomName);
        fd.append('locationBuildingName', locationBuildingName);
        fd.append('locationWay', locationWay);
        fd.append('detailLink', detailLink);
        fd.append('googleMapLink', googleMapLink);
        axios.post(`${baseurl}/api/event/register`, fd, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then((response)=>{
           this.setState({loading:false});
           console.log(response);
        }).catch((error)=> {
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
            }
           this.setState({loading:false});
        })


    }


    render(){
        const {loading, eventTitle, eventDate, eventStartTime, eventEndTime, eventContent} = this.state;
        const {schedule1Title, schedule1StartTime, schedule1EndTime, schedule1Content, schedule2Title, schedule2StartTime, schedule2EndTime, schedule2Content, schedule3Title, schedule3StartTime, schedule3EndTime, schedule3Content} = this.state
        const {lunchLocation, lunchLocationDescription, lecturerName, lecturerIntroduction, fee} = this.state;
        const {locationRoomName, locationBuildingName, locationWay, detailLink, googleMapLink,mainImg,schedule1Img, schedule2Img, schedule3Img, restaurantImg, lecturerImg} = this.state;

        return(
            <>
                <div className="container">
                    <Header pageName="セミナー・イベント追加" />
                    <div className="seminar-card-container">
                        <div className="seminar-card seminar-detail-card">
                            <h3>セミナー・イベント題名</h3>
                            <div className="change-input-box2">
                                <input type="text" value={eventTitle} onChange={this.handleChange("eventTitle")} placeholder="セミナー・イベント題名" />
                            </div>
                            <div className="seminar-main-img">
                                {mainImg!=="" && <img src={mainImg} alt="" />}
                            </div>
                            <div className="profile-input-upload event-input-upload">
                                <input type="file" onChange={this.updateImage("mainImg")} ref={(ref) => this.uploadmainImg = ref}/>
                                <button type="button" onClick={(e) => this.uploadmainImg.click()} >画像をアップロードする</button>
                            </div>
                            <h3>開催日時</h3>
                            <div className="time-input-box">
                                <label>開催日</label>
                                <input type="date" value={eventDate} onChange={this.handleChange("eventDate")}/>
                            </div>
                            <div className="time-input-container">
                                <div className="time-input-box">
                                    <label >始まる時間</label>
                                    <input type="time"  value={eventStartTime} onChange={this.handleChange("eventStartTime")}/>
                                </div>
                                <div className="time-input-box">
                                    <label >終了時間</label>
                                    <input type="time" value={eventEndTime} onChange={this.handleChange("eventEndTime")}/>
                                </div>
                            </div>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>イベント内容</h3>
                            <div className="change-input-box2">
                                <textarea placeholder="イベント内容"  value={eventContent} onChange={this.handleChange("eventContent")}></textarea>
                            </div>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>タイムテーブル</h3>
                            <div className="timetable-input-box">
                                <div className="change-input-box2">
                                    <input type="text" placeholder="タイムテーブル題名" value={schedule1Title} onChange={this.handleChange("schedule1Title")}/>
                                </div>
                                <div className="time-input-container">
                                    <div className="time-input-box">
                                        <label >始まる時間</label>
                                        <input type="time" value={schedule1StartTime} onChange={this.handleChange("schedule1StartTime")}/>
                                    </div>
                                    <div className="time-input-box">
                                        <label >終了時間</label>
                                        <input type="time" value={schedule1EndTime} onChange={this.handleChange("schedule1EndTime")}/>
                                    </div>
                                </div>
                                <div className="change-input-box2">
                                    <textarea placeholder="タイムテーブル内容" value={schedule1Content} onChange={this.handleChange("schedule1Content")} />
                                </div>
                                <div className="seminar-main-img">
                                    {schedule1Img!=="" && <img src={schedule1Img} alt="" />}
                                </div>
                                <div className="profile-input-upload event-input-upload">
                                    <input type="file" onChange={this.updateImage("schedule1Img")} ref={(ref) => this.uploadschedule1Img = ref}/>
                                    <button type="button" onClick={(e) => this.uploadschedule1Img.click()} >画像をアップロードする</button>
                                </div>
                            </div>
                            <div className="timetable-input-box">
                                <div className="change-input-box2">
                                    <input type="text" placeholder="タイムテーブル題名" value={schedule2Title} onChange={this.handleChange("schedule2Title")}/>
                                </div>
                                <div className="time-input-container">
                                    <div className="time-input-box">
                                        <label >始まる時間</label>
                                        <input type="time" value={schedule2StartTime} onChange={this.handleChange("schedule2StartTime")}/>
                                    </div>
                                    <div className="time-input-box">
                                        <label >終了時間</label>
                                        <input type="time" value={schedule2EndTime} onChange={this.handleChange("schedule2EndTime")}/>
                                    </div>
                                </div>
                                <div className="change-input-box2">
                                    <textarea placeholder="タイムテーブル内容" value={schedule2Content} onChange={this.handleChange("schedule2Content")}/>
                                </div>
                                <div className="seminar-main-img">
                                    {schedule2Img!=="" && <img src={schedule2Img} alt="" />}
                                </div>
                                <div className="profile-input-upload event-input-upload">
                                    <input type="file" onChange={this.updateImage("schedule2Img")} ref={(ref) => this.uploadschedule2Img = ref}/>
                                    <button type="button" onClick={(e) => this.uploadschedule2Img.click()} >画像をアップロードする</button>
                                </div>
                            </div>
                            <div className="timetable-input-box">
                                <div className="change-input-box2">
                                    <input type="text" placeholder="タイムテーブル題名" value={schedule3Title} onChange={this.handleChange("schedule3Title")}/>
                                </div>
                                <div className="time-input-container">
                                    <div className="time-input-box">
                                        <label >始まる時間</label>
                                        <input type="time" value={schedule3StartTime} onChange={this.handleChange("schedule3StartTime")}/>
                                    </div>
                                    <div className="time-input-box">
                                        <label >終了時間</label>
                                        <input type="time" value={schedule3EndTime} onChange={this.handleChange("schedule3EndTime")}/>
                                    </div>
                                </div>
                                <div className="change-input-box2">
                                    <textarea placeholder="タイムテーブル内容" value={schedule3Content} onChange={this.handleChange("schedule3Content")}></textarea>
                                </div>
                                <div className="seminar-main-img">
                                    {schedule3Img!=="" && <img src={schedule3Img} alt="" />}
                                </div>
                                <div className="profile-input-upload event-input-upload">
                                    <input type="file" onChange={this.updateImage("schedule3Img")} ref={(ref) => this.uploadschedule3Img = ref}/>
                                    <button type="button" onClick={(e) => this.uploadschedule3Img.click()} >画像をアップロードする</button>
                                </div>
                            </div>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>ランチ会場</h3>
                            <div className="change-input-box2">
                                <input type="text" placeholder="ランチ会場" value={lunchLocation} onChange={this.handleChange("lunchLocation")}/>
                            </div>
                            <div className="change-input-box2">
                                <textarea placeholder="ランチ会場紹介" value={lunchLocationDescription} onChange={this.handleChange("lunchLocationDescription")}></textarea>
                            </div>
                            <div className="seminar-main-img">
                                {restaurantImg!=="" && <img src={restaurantImg} alt="" />}
                            </div>
                            <div className="profile-input-upload event-input-upload">
                                <input type="file" onChange={this.updateImage("restaurantImg")} ref={(ref) => this.uploadrestaurantImg = ref}/>
                                <button type="button" onClick={(e) => this.uploadrestaurantImg.click()} >画像をアップロードする</button>
                            </div>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>講師紹介</h3>
                            <div className="change-input-box2">
                                <input type="text" placeholder="講師名" value={lecturerName} onChange={this.handleChange("lecturerName")}/>
                            </div>
                            <div className="change-input-box2">
                                <textarea placeholder="講師紹介" value={lecturerIntroduction} onChange={this.handleChange("lecturerIntroduction")}></textarea>
                            </div>
                            <div className="seminar-main-img">
                                {lecturerImg!=="" && <img src={lecturerImg} alt="" />}
                            </div>
                            <div className="profile-input-upload event-input-upload">
                                <input type="file" onChange={this.updateImage("lecturerImg")} ref={(ref) => this.uploadlecturerImg = ref}/>
                                <button type="button" onClick={(e) => this.uploadlecturerImg.click()} >画像をアップロードする</button>
                            </div>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>参加費</h3>
                            <div className="change-input-box2">
                                <input type="text" placeholder="参加費" value={fee} onChange={this.handleChange("fee")}/>
                            </div>
                        </div>
                        <div className="seminar-card seminar-detail-card">
                            <h3>会場</h3>
                            <div className="change-input-box2">
                                <input type="text" placeholder="部屋名" value={locationRoomName} onChange={this.handleChange("locationRoomName")}/>
                            </div>
                            <div className="change-input-box2">
                                <input type="text" placeholder="建物名" value={locationBuildingName} onChange={this.handleChange("locationBuildingName")}/>
                            </div>
                            <div className="change-input-box2">
                                <input type="text" placeholder="行く方法" value={locationWay} onChange={this.handleChange("locationWay")}/>
                            </div>
                            <div className="change-input-box2">
                                <input type="text" placeholder="詳細リンク" value={detailLink} onChange={this.handleChange("detailLink")}/>
                            </div>
                            <div className="change-input-box2">
                                <input type="text" placeholder="マップリンク" value={googleMapLink} onChange={this.handleChange("googleMapLink")}/>
                            </div>
                        </div>
                        <div className="profile-input-submit">
                            <button onClick={this.handleSubmit} type="button">追加する</button>
                        </div>
                    </div>
                    <Footer/>
                </div>
                {loading && <Preloader/>}
                
            </>
        )
    }
}

export default AddNewEvent
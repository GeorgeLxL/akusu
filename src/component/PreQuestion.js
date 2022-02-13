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
    
}

const jp ={
    
    scan:"スキャン",
    send_receive:"送る・受け取る",
    save:"貯める",
    charge:"チャージ",
    owned_point:"保有ポイント：",

}

class PreQuestion extends Component{

    constructor(props){
        super(props)
        this.state={
            loading:false,
            language:JSON.parse(localStorage.language).language,
            userPoint:"",
            business: true,
            realEstate: true,
            unoccupied: true,
            financial: true,
            content: '',
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
            this.getPreQuestion()
        }
    }

    getPreQuestion()
    {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'get',
            url: `${baseurl}/api/getprequestion`,
            headers: {
            'Authorization': 'Bearer ' + token,
            },
                data : {},
        };
        axios(config)
        .then((response) => {
            if (response.data.prequestion) {
                var prequestion = JSON.parse(response.data.prequestion)[0]
                console.log(prequestion)
                this.setState({
                    business: prequestion.fields.business,
                    realEstate: prequestion.fields.realEstate,
                    unoccupied: prequestion.fields.unoccupied,
                    financial: prequestion.fields.financial,
                    content: prequestion.fields.content
                })
            }
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

    sendPreQuestion = (e) => {
        this.setState({loading: true})
        const {business, realEstate, unoccupied, financial, content} = this.state;
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var data = JSON.stringify({'business': business, 'realEstate': realEstate, 'unoccupied': unoccupied, 'financial': financial, 'content': content})
        var config = {
            method: 'post',
            url: `${baseurl}/api/sendprequestion`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data : data,
        };
        axios(config)
        .then((response) => {
            window.location.assign('/home')
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

    render(){
        const{language,userPoint,loading, business, realEstate, unoccupied, financial, content} = this.state
        return(
            <>
                <div className="container">
                    <Header pageName="事前アンケート" />
                    <div className="top-content-spec top-main-link prequestion-container">
                        <h3>まずは下記の簡単なアンケートにお答え下さい。</h3>
                        <div className="prequestion-input">
                            <h4>ビジネスマッチングに興味はありますか？</h4>
                            <div className="prequestion-input-main">
                                <div>
                                    <input type="radio" name="business" value="y" id="business_y" checked={business==true} onChange={()=>this.setState({business: true})} />
                                    <label htmlFor="business_y">はい</label>
                                </div>
                                <div>
                                    <input type="radio" name="business" value="n" id="business_n" checked={business==false} onChange={()=>this.setState({business: false})}  />
                                    <label htmlFor="business_n">いいえ</label>
                                </div>
                            </div>
                        </div>
                        <div className="prequestion-input">
                            <h4>不動産情報に興味はありますか？</h4>
                            <div className="prequestion-input-main">
                                <div>
                                    <input type="radio" name="realEstate" value="y" id="realEstate_y" checked={realEstate==true} onChange={()=>this.setState({realEstate: true})} />
                                    <label htmlFor="realEstate_y">はい</label>
                                </div>
                                <div>
                                    <input type="radio" name="realEstate" value="n" id="realEstate_n" checked={realEstate==false} onChange={()=>this.setState({realEstate: false})} />
                                    <label htmlFor="realEstate_n">いいえ</label>
                                </div>
                            </div>
                        </div>
                        <div className="prequestion-input">
                            <h4>居抜き物件に興味はありますか？</h4>
                            <div className="prequestion-input-main">
                                <div>
                                    <input type="radio" name="unoccupied" value="y" id="unoccupied_y" checked={unoccupied==true} onChange={()=>this.setState({unoccupied: true})} />
                                    <label htmlFor="unoccupied_y">はい</label>
                                </div>
                                <div>
                                    <input type="radio" name="unoccupied" value="n" id="unoccupied_n" checked={unoccupied==false} onChange={()=>this.setState({unoccupied: false})} />
                                    <label htmlFor="unoccupied_n">いいえ</label>
                                </div>
                            </div>
                        </div>
                        <div className="prequestion-input">
                            <h4>金融情報（投資案件）に興味はありますか？</h4>
                            <div className="prequestion-input-main">
                                <div>
                                    <input type="radio" name="financial" value="y" id="financial_y" checked={financial==true} onChange={()=>this.setState({financial: true})} />
                                    <label htmlFor="financial_y">はい</label>
                                </div>
                                <div>
                                    <input type="radio" name="financial" value="n" id="financial_n" checked={financial==false} onChange={()=>this.setState({financial: false})} />
                                    <label htmlFor="financial_n">いいえ</label>
                                </div>
                            </div>
                        </div>
                        <div className="prequestion-input">
                            <h4>その他興味のあることを自由にご記入ください。</h4>
                            <textarea rows={5} value={content} onChange={(e)=>this.setState({content: e.target.value})}></textarea>
                        </div>
                        <button className="prequestion-btn" onClick={this.sendPreQuestion}>送信</button>
                    </div>
                    <Footer/>
                </div>
                {loading && <Preloader/>}
            </>
        )
    }
}

export default PreQuestion
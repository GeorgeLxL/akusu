import React, { Component } from 'react';

const baseurl = process.env.REACT_APP_API_BASE_URL;
const en = {
    home:"Home",
    user_name:"User name",
    user_type:"User type",
    points:"Points",
    store:"Store",
    usertypes:['Individual', 'Company', 'Administrator', 'Introducer A', 'Introducer B','Introducer C'],
    guide:"Beginner's Guide",
}

const jp ={
    home:"ホーム",
    user_name:"ユーザー名",
    user_type:"会員種類",
    points:"保有ポイント",
    store:"店舗売買",
    usertypes:['個人会員', '企業', '運営者', '紹介者A', '紹介者B','紹介者C'],
    guide:"初めての方へ",
}

class RealEstateGuide extends Component{   
    constructor(props) {
        super(props);
        this.state={
           language:JSON.parse(localStorage.language).language
        }
    }

    render(){
        const {language} = this.state
        return(
        <>
            <div className="real-container2">
                <div className="real-title"><h3>{eval(language).guide}</h3></div>
                <div className="real-guide-container">
                    <h4>居抜吉物件沖縄県内シェアNo1<br />売リ手にも買い手にもWIN・WINな契約をご提供。<br />最短2ヶ月での物件売買も可能です。</h4>
                    <div className="real-guide-img">
                        <div>
                            <div><img src="/assets/image/real-guide1.jpg" alt="real guide" /></div>
                            <div><img src="/assets/image/real-guide2.jpg" alt="real guide" /></div>
                        </div>
                        <div>
                            <div><img src="/assets/image/real-guide3.jpg" alt="real guide" /></div>
                            <div><img src="/assets/image/real-guide4.jpg" alt="real guide" /></div>
                        </div>
                    </div>
                    <div className="real-guide-detail">
                        <p><span>早期会員登録</span>がオススメ!</p>
                        <p><span className="real-guide-detail-span">安心・安全・秘密厳守！</span></p>
                        <p><span>生業中の登録が壬好条件の売買</span>につながります！</p>
                        <p><span>リアルタイム</span>で<span>売り手・買い手</span>のお客様に悄報提供！</p>
                        <p>居抜き<span>物件情報充実</span>（沖縄県内シェア<span>No1</span>）</p>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default RealEstateGuide
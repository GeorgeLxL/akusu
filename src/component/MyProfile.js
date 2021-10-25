import React, { Component } from 'react';
import Preloader from './Layout/preloader'
import axios from 'axios';
import Footer from './Layout/footer';
import Header from './Layout/header';

const baseurl = process.env.REACT_APP_API_BASE_URL;
const en = {
    accoutnsetting:"Account settings",
    mandatory:"Mandatory",
    any:"Any",
    name:"Name",
    name_freegana:"Furigana Name",
    maiden_name:"Maiden name",
    gender:"Gender",
    female:"Female",
    male:"Male",
    phone_number:"Phone Number",
    phone_number_description:"(No half-width number hyphen)",
    birthday:"Birthday",
    avatar:"Avatar",
    avartar_description:"If set, points will be given",
    uploadImg:"Upload an image",
    address:"Address",
    prefectures:"Prefectures",
    municipalities:"Municipalities",
    street_number:"Street Number",
    building_number:"Building name, room number, etc.",
    course:"Course",
    payment_method:"Payment method",
    mail_form: <p className="profile-input-payment-method">Please contact us from the <a>email form</a> for course changes and payment method changes.</p>,
    bank_account:"Account information",
    bank_name:"Financial institution name",
    branch_name:"Branch name",
    deposit_type:"Deposit type",
    account_number:"Account Number",
    account_holder:"Account holder",
    referral_code:"Referral code",
    update:"Update"
}

const jp ={
    accoutnsetting:"アカウント設定",
    mandatory:"必須",
    any:"任意",
    name:"お名前",
    name_freegana:"お名前 ふりがな",
    maiden_name:"旧姓",
    gender:"性別",
    female:"女性",
    male:"男性",
    phone_number:"電話番号",
    phone_number_description:"（半角数字ハイフンなし）",
    birthday:"生年月日",
    avatar:"顔写真",
    avartar_description:"設定すればポイント付与",
    uploadImg:"画像をアップロードする",
    address:"住所",
    prefectures:"都道府県",
    municipalities:"市区町村",
    street_number:"町名・番地",
    building_number:"建物名・部屋番号など",
    course:"コース",
    payment_method:"支払い方法",
    mail_form: <p className="profile-input-payment-method">コースの変更、お支払い方法の変更については、<a>メールフォーム</a>よりお問い合わせください。</p>,
    bank_account:"口座情報",
    bank_name:"金融機関名",
    branch_name:"支店名",
    deposit_type:"預金種別",
    account_number:"口座番号",
    account_holder:"口座名義",
    referral_code:"紹介コード",
    update:"この内容で更新する"
}

class MyProfile extends Component{   
    constructor(props) {
        super(props);
        this.state={
            language:JSON.parse(localStorage.language).language,
            loading:true,
            surname:"",
            lastname:"",
            surnameFurigana:"",
            lastnameFurigana:"",
            maidenname:"",
            gender:"1",
            phone:"",
            birthday:"",
            address1:"",
            address2:"",
            street:"",
            buildingName:"",
            bankName:"",
            branchName:"",
            depositType:"",
            accountNumber:"",
            accountName:"",
            referalcode:"",
            avatarimg:"",
            avatarimgFile:null,
            changeAvatar:false
        }
    }

    componentDidMount(){
        this.getUserdata()
    }

    getUserdata()
    {
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        var config = {
            method: 'get',
            url: `${baseurl}/api/account/profile`,
            headers: { 
            'Authorization': 'Bearer ' + token,
            },
                data : {},
        };
        axios(config)
        .then((response) => {
            var userData = response.data.user;
            const {name1, name2, kana1, kana2, maidenname, gender, phone, birthday, address1, address2, street, buildingName, bankName, branchName, depositType, accountNumber, accountName, referalcode} = userData
            var srcBase64 = "";
            if(userData.userAvatar)
            {
                srcBase64 = `${baseurl}/media/${userData.userAvatar}`
            }
            this.setState({
                loading:false,
                surname:name1,
                lastname:name2,
                surnameFurigana:kana1,
                lastnameFurigana:kana2,
                maidenname:maidenname,
                gender:gender? `${gender}` : "1",
                phone:phone,
                birthday:birthday,
                address1:address1,
                address2:address2,
                street:street,
                buildingName:buildingName,
                bankName:bankName,
                branchName:branchName,
                depositType:depositType,
                accountNumber:accountNumber,
                accountName:accountName,
                referalcode:referalcode,
                avatarimg: srcBase64
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

    render(){
        const {language, loading,surname,lastname,surnameFurigana, lastnameFurigana, maidenname, gender, phone, birthday, address1, address2, street, buildingName,  avatarimg, userType} = this.state
        return(
            <>
            <div className="container">
            <Header pageName={eval(language).accoutnsetting}/>
            <div className="seminar-card-container">
                    <div className="seminar-card">
                    
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).name}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <p>{surname + lastname}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).name_freegana}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <p>{surnameFurigana + lastnameFurigana}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).maiden_name}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <p>{maidenname}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).gender}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <p>{gender==="1" ? eval(language).female : eval(language).male}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).phone_number}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <p>{phone}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).birthday}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <p>{birthday}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).avatar}<span className="nini">{eval(language).any}</span></h3>
                                <p>{eval(language).avartar_description}</p>
                            </div>
                            <div className="profile-img">
                                <div>
                                    <img src={avatarimg==='' ? './assets/image/avatar.svg' : avatarimg} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="seminar-card">
                        <h3>{eval(language).address}</h3>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).prefectures}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <p>{address1}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).municipalities}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <p>{address2}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).street_number}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <p>{street}</p>
                        </div>
                        <div className="profile-box">
                            <div className="profile-title">
                                <h3>{eval(language).building_number}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <p>{buildingName}</p>
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

export default MyProfile
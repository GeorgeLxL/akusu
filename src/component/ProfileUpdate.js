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
    update:"Update",
    require_error:"This field is required.",
    phone_valid_error:"Enter a valid phone number.",
    user_type:"User type",
    individual_member:"Individual",
    company_member:"Company",
    operator:"Administrator",
    introducer1:"Introducer A",
    introducer2:"Introducer A",
    introducer3:"Introducer A",
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
    update:"この内容で更新する",
    require_error:"この項目は必須です。",
    phone_valid_error:"有効な電話番号を入力してください。",
    user_type:"会員種類",
    individual_member:"個人会員",
    company_member:"企業",
    operator:"運営者",
    introducer1:"紹介者A",
    introducer2:"紹介者B",
    introducer3:"紹介者C",
}

class ProfileUpdate extends Component{   
    constructor(props) {
        super(props);
        this.state={
            language:JSON.parse(localStorage.language).language,
            loading:false,
            surname:"",
            lastname:"",
            surnameFurigana:"",
            lastnameFurigana:"",
            maidenname:"",
            gender:"1",
            userType:"0",
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
            changeAvatar:false,
            errorName:"",
            errorFuriganaName:"",
            errorPhonNumber:"",
            errorbirthday:"",
            erroraddress1:"",
            erroraddress2:"",
            errorstreetName:"",
        }
    }

    handleChangeField = filedName => e=>{
        this.setState({
            [filedName]:e.target.value,
            errorName:"",
            errorFuriganaName:"",
            errorPhonNumber:"",
            errorbirthday:"",
            erroraddress1:"",
            erroraddress2:"",
            errorstreetName:"",
        })
    }


    updateAvatar = e => {
        let fileObj = e.target.files[0];
        let avatar = URL.createObjectURL(fileObj);
        this.setState({
            avatarimg:avatar,
            avatarimgFile:fileObj,
            changeAvatar:true
        })
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
            const {name1, name2, kana1, kana2, maidenname, gender, phone, birthday, address1, address2, street, buildingName, bankName, branchName, depositType, accountNumber, accountName, referalcode, userType} = userData
            var srcBase64 = "";
            if(userData.userAvatar)
            {
                srcBase64 = `${baseurl}/media/${userData.userAvatar}`
            }
            this.setState({
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
                avatarimg:srcBase64,
                userType:userType
            })
        })
        .catch((error)=>{
            if (error.response) {
                if(error.response.status===401){
                    localStorage.removeItem("userData");
                    window.location.assign('/');
                }
            }
        })
    }

    handleSubmit = e =>{
       
        const fd = new FormData();
        var userData = JSON.parse(localStorage.userData);
        var token = userData.token
        const{language,surname,lastname,surnameFurigana,lastnameFurigana,maidenname,gender,phone,birthday, userType, address1, address2, street, buildingName,bankName, branchName, depositType,accountNumber, accountName, referalcode, avatarimgFile,changeAvatar}=this.state
        
        var validate = true;
        if(surname==="" || lastname===""){
            this.setState({errorName:eval(language).require_error})
            validate = false;
        }
        if(surnameFurigana==="" || lastnameFurigana===""){
            this.setState({errorFuriganaName:eval(language).require_error})
            validate = false;
        }
        if(phone===""){
            this.setState({errorPhonNumber:eval(language).require_error})
            validate = false;
        }
        if(birthday===""){
            this.setState({errorbirthday:eval(language).require_error})
            validate = false;
        }
        if(address1===""){
            this.setState({erroraddress1:eval(language).require_error})
            validate = false;
        }
        if(address2===""){
            this.setState({erroraddress2:eval(language).require_error})
            validate = false;
        }
        if(street===""){
            this.setState({errorstreetName:eval(language).require_error})
            validate = false;
        }

        var phoneno = /^\d([0-9]{0,10}\d)?$/;
        if(phone!=="" && !phone.match(phoneno)) {
            this.setState({errorPhonNumber:eval(language).phone_valid_error})
            validate = false
        }
        if(!validate){
            return;
        }

        this.setState({loading:true});
        fd.append('userType', userType);
        fd.append('name1', surname);
        fd.append('name2', lastname);
        fd.append('kana1', surnameFurigana);
        fd.append('kana2', lastnameFurigana);
        fd.append('maidenname', maidenname);        
        fd.append('gender', gender);
        fd.append('phone', phone);
        fd.append('birthday', birthday);
        fd.append('address1', address1);
        fd.append('address2', address2);
        fd.append('street', street);
        fd.append('buildingName', buildingName);
        fd.append('bankName', bankName);
        fd.append('branchName', branchName);
        fd.append('depositType', depositType);
        fd.append('accountNumber', accountNumber);
        fd.append('accountName', accountName);
        fd.append('referalcode', referalcode);
        if(changeAvatar){
            fd.append('avatarimgFile', avatarimgFile);
        }

        axios.post(`${baseurl}/api/account/register`, fd, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then((response)=>{
           this.setState({loading:false});
           userData.userstatus = 2;
           localStorage.setItem("userData", JSON.stringify(userData))
           window.location.assign("/home");
        }).catch((error)=> {
           this.setState({loading:false});
        })       
    }

    render(){
        const {language, loading,surname,lastname,surnameFurigana, lastnameFurigana, maidenname, gender, phone, birthday, userType, address1, address2, street, buildingName, bankName, branchName, depositType, accountNumber, accountName, avatarimg, referalcode, errorName, errorFuriganaName, errorPhonNumber, erroraddress1, erroraddress2, errorbirthday, errorstreetName} = this.state
        return(
            <>
            <div className="container">
            {this.props.footer ? <Header pageName={eval(language).accoutnsetting}/>:
                <header>
                    <div className="content">
                        <button onClick={() => this.props.history.goBack()} className="back-button">
                            <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.0401 20.5802L0.790059 11.45C0.400059 11.06 0.400059 10.4401 0.790059 10.0501L10.0401 0.92C10.6001 0.36 11.51 0.36 12.08 0.92C12.64 1.47 12.64 2.38001 12.08 2.93001L4.17006 10.7501L12.08 18.5701C12.64 19.1201 12.64 20.0302 12.08 20.5802C11.51 21.1402 10.6001 21.1402 10.0401 20.5802Z" fill="#6F738D"/>
                            </svg>
                        </button>
                        <h3>{eval(language).accoutnsetting}</h3>
                    </div>
                </header>
            }
            <div className="seminar-card-container">
                <form className="profile-form" onSubmit={this.handleSubmit}>
                    <div className="seminar-card">
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).name}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="text" className="profile-input-input profile-input-input1" name="surname" value={surname} onChange={this.handleChangeField("surname")} placeholder="山田" />
                                <input type="text" className="profile-input-input profile-input-input1" name="lastname" value={lastname} onChange={this.handleChangeField("lastname")} placeholder="太郎" />
                            </div>
                        </div>
                        <span className="error">{errorName}</span>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).name_freegana}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="text" className="profile-input-input profile-input-input1" name="surname-furigana" value={surnameFurigana} onChange={this.handleChangeField("surnameFurigana")} placeholder="ヤマダ" />
                                <input type="text" className="profile-input-input profile-input-input1" name="lastname-furigana" value={lastnameFurigana} onChange={this.handleChangeField("lastnameFurigana")} placeholder="夕ロウ" />
                            </div>
                        </div>
                        <span className="error">{errorFuriganaName}</span>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).maiden_name}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="text" className="profile-input-input profile-input-input1" name="maidenname" value={maidenname} onChange={this.handleChangeField("maidenname")} placeholder="田中" />
                            </div>
                        </div>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).gender}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <div className="seminar-part-info-radio">
                                <label htmlFor="female">
                                    <input id="female" type="radio" value="1" checked={gender==="1"} onChange={this.handleChangeField("gender")} />
                                    <span></span>
                                    {eval(language).female}
                                </label>
                                <label htmlFor="male">
                                    <input id="male" type="radio" value="0" checked={gender==="0"} onChange={this.handleChangeField("gender")} />
                                    <span></span>
                                    {eval(language).male}
                                </label>
                            </div>
                        </div>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).phone_number}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="tel" className="profile-input-input profile-input-input2" name="phone" value={phone} onChange={this.handleChangeField("phone")} placeholder="08012345678" />
                                <p>{eval(language).phone_number_description}</p>
                            </div>
                        </div>
                        <span className="error">{errorPhonNumber}</span>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).birthday}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="date" className="profile-input-input profile-input-input1" name="birthday" value={birthday} onChange={this.handleChangeField("birthday")} placeholder="1986年4月3日" />
                            </div>
                        </div>
                        <span className="error">{errorbirthday}</span>
                        <div className="profile-input-box profile-input-photo">
                            <div className="profile-input-upload">
                                <div className="profile-title">
                                    <h3>{eval(language).avatar}<span className="nini">{eval(language).any}</span></h3>
                                    <p>{eval(language).avartar_description}</p>
                                </div>
                                <input type="file" onChange={this.updateAvatar} ref={(ref) => this.upload = ref}  multiple/>
                                <button type="button" onClick={(e) => this.upload.click()} >{eval(language).uploadImg}</button>
                            </div>
                            <div className="profile-img">
                                <div>
                                    <img src={avatarimg==='' ? './assets/image/avatar.svg' : avatarimg} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).user_type}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <select value={userType} onChange={this.handleChangeField("userType")}>
                                <option value="0">{eval(language).individual_member}</option>
                                <option value="1">{eval(language).company_member}</option>
                                <option value="2">{eval(language).operator}</option>
                                <option value="3">{eval(language).introducer1}</option>
                                <option value="4">{eval(language).introducer2}</option>
                                <option value="5">{eval(language).introducer3}</option>
                            </select>
                        </div>
                    </div>
                    <div className="seminar-card">
                        <h3 className="profile-input-main-title">{eval(language).address}</h3>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).prefectures}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="text" className="profile-input-input profile-input-input1" name="prefecture" value={address1} onChange={this.handleChangeField("address1")} placeholder="東京都"/>
                            </div>
                        </div>
                        <span className="error">{erroraddress1}</span>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).municipalities}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="text" className="profile-input-input profile-input-input2" name="municipality" value={address2} onChange={this.handleChangeField("address2")} placeholder="テスト市" />
                            </div>
                        </div>
                        <span className="error">{erroraddress2}</span>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).street_number}<span className="hissu">{eval(language).mandatory}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="text" className="profile-input-input profile-input-input2" name="street" value={street} onChange={this.handleChangeField("street")} placeholder="テスト町11" />
                            </div>
                        </div>
                        <span className="error">{errorstreetName}</span>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).building_number}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <input type="text" className="profile-input-input profile-input-input2" name="address" value={buildingName} onChange={this.handleChangeField("buildingName")} />
                            </div>
                        </div>
                        
                    </div>
                    <div className="seminar-card">
                        <h3 className="profile-input-main-title">{eval(language).course}</h3>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).payment_method}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            {eval(language).mail_form}
                        </div>
                    </div>
                    <div className="seminar-card">
                        <h3 className="profile-input-main-title">{eval(language).bank_account}</h3>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).bank_name}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <div className="profile-input-dash"></div>
                                <input type="text" className="profile-input-input profile-input-input2" name="fin-institution" value={bankName} onChange={this.handleChangeField("bankName")} />
                            </div>
                        </div>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).branch_name}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <div className="profile-input-dash"></div>
                                <input type="text" className="profile-input-input profile-input-input2" name="fin-branch" value={branchName} onChange={this.handleChangeField("branchName")} />
                            </div>
                        </div>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).deposit_type}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <div className="profile-input-dash"></div>
                                <input type="text" className="profile-input-input profile-input-input2" name="deposit-type" value={depositType} onChange={this.handleChangeField("depositType")} />
                            </div>
                        </div>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).account_number}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <div className="profile-input-dash"></div>
                                <input type="text" className="profile-input-input profile-input-input2" name="fin-number" value={accountNumber} onChange={this.handleChangeField("accountNumber")} />
                            </div>
                        </div>
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).account_holder}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <div className="profile-input-dash"></div>
                                <input type="text" className="profile-input-input profile-input-input2" name="fin-name" value={accountName} onChange={this.handleChangeField("accountName")} />
                            </div>
                        </div>
                    </div>
                    <div className="seminar-card">
                        <div className="profile-input-box">
                            <div className="profile-title">
                                <h3>{eval(language).referral_code}<span className="nini">{eval(language).any}</span></h3>
                            </div>
                            <div className="profile-input-container">
                                <div className="profile-input-dash"></div>
                                <input type="text" className="profile-input-input profile-input-input2" name="referral-code" value={referalcode} onChange={this.handleChangeField("referalcode")} />
                            </div>
                        </div>
                    </div>
                    <div className="profile-input-submit">
                        <button onClick={this.handleSubmit} type="button">{eval(language).update}</button>
                    </div>
                </form>
            </div>
            {this.props.footer && <Footer/>}
        </div>
         {loading &&
            <Preloader/>
         }
         </>
        )
    }
}

export default ProfileUpdate
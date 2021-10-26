import React, { Component } from 'react';

const en = {
    mypage:"My page",
    logout:"Sign out",
    intro:"Invite",
}

const jp = {
    mypage:"マイページ",
    logout:"ログアウト",
    intro:"友達紹介",
}

class Header extends Component{
    constructor(props) {
        super(props);
        this.state={
            maxHeight:"",
            toggle:false,
            language:JSON.parse(localStorage.language).language
        }
    }
    menu_click = e =>{
       this.setState({toggle:!this.state.toggle});
        var menu = document.getElementById('menu');
        if (this.state.maxHeight!=="") {
            this.setState({maxHeight:""});
        }
        else {
            this.setState({maxHeight:menu.scrollHeight + 'px'});
        }
    }

    handleLogout = e =>{
        localStorage.removeItem("userData");
        window.location.assign('/');
    }

    handleToMypage = e =>{
        window.location.assign('/mypage')
    }

    render(){
        const {language} = this.state;
        return(
            <>
            <header>
                <div className="content">
                    {!this.props.notback &&
                    <button className="back-button" onClick={(e)=>{window.history.back()}}>
                        <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0401 20.5802L0.790059 11.45C0.400059 11.06 0.400059 10.4401 0.790059 10.0501L10.0401 0.92C10.6001 0.36 11.51 0.36 12.08 0.92C12.64 1.47 12.64 2.38001 12.08 2.93001L4.17006 10.7501L12.08 18.5701C12.64 19.1201 12.64 20.0302 12.08 20.5802C11.51 21.1402 10.6001 21.1402 10.0401 20.5802Z" fill="#6F738D"/>
                        </svg>
                    </button>}
                    {this.props.Intro!=null &&
                    <a className="introduce" href="/invite">{eval(language).intro}</a>
                    }
                    <h3>{this.props.pageName}</h3>
                    <div className={this.state.toggle ? "menu_icon change" : "menu_icon"} onClick={this.menu_click}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                    <div id="menu" style={{maxHeight:this.state.maxHeight}}>
                    <div onClick={this.handleToMypage}><a>{eval(language).mypage}</a></div>
                        <div onClick={this.handleLogout}><a>{eval(language).logout}</a></div>
                    </div>
                </div>
            </header>
            </>
        )
    }
}

export default Header
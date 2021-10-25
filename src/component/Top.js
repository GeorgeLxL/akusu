import { Component } from "react";

const en = {
    signup:"Sign Up",
    login:"Log in",
    japanese:"Japanese",
    english:"English"
}

const jp = {
    signup:"新規登録",
    login:"ログイン",
    japanese:"日本語",
    english:"英語"
}

class Top extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            language:"jp",
            theme:"theme-select-green",
            theme1:""
        }
    }

    handleChangeLanguage = (event)=>{
        localStorage.setItem("language", JSON.stringify({language:event.target.value}))
        this.setState({language:event.target.value})
    }

    componentDidMount(){
        localStorage.setItem("language", JSON.stringify({language:"jp"}))
    }

    handleChangeTheme = (event)=> {
        var themeSelect = document.getElementsByClassName('theme-select-content');
        if (themeSelect[0].style.maxHeight) {
            themeSelect[0].style.maxHeight = null
        } else {
            themeSelect[0].style.maxHeight = themeSelect[0].scrollHeight + 'px';
        }
        var themeSelected1 = event.target
        if (themeSelected1.classList.contains('theme-select-green')) {
            this.setState({
                theme1:"theme-select-green"
            })
        } else 
        if (themeSelected1.classList.contains('theme-select-pink')) {
            this.setState({
                theme1:"theme-select-pink"
            })
        } else 
        if (themeSelected1.classList.contains('theme-select-dark')) {
            this.setState({
                theme1:"theme-select-dark"
            })
        } else {
            this.setState({
                theme1:"theme-select-blue"
            })
        }
    }

    handleChangeTheme1 = (event) => {
        var themeSelected = event.target
        var particle = document.getElementById('tsparticles');
        console.log(particle)
        if (themeSelected.classList.contains('theme-select-green')) {
            this.setState({
                theme:"theme-select-green"
            })
            themeSelected.classList.remove('theme-select-green');
            themeSelected.classList.add(this.state.theme1.toString());
            if (particle.classList.contains('theme-select-pink')) particle.classList.remove('theme-select-pink')
            if (particle.classList.contains('theme-select-dark')) particle.classList.remove('theme-select-dark')
            if (particle.classList.contains('theme-select-blue')) particle.classList.remove('theme-select-blue')
            if (!particle.classList.contains('theme-select-green')) particle.classList.add('theme-select-green')
        } else 
        if (themeSelected.classList.contains('theme-select-pink')) {
            this.setState({
                theme:"theme-select-pink"
            })
            themeSelected.classList.remove('theme-select-pink');
            themeSelected.classList.add(this.state.theme1.toString());
            if (particle.classList.contains('theme-select-green')) particle.classList.remove('theme-select-green')
            if (particle.classList.contains('theme-select-dark')) particle.classList.remove('theme-select-dark')
            if (particle.classList.contains('theme-select-blue')) particle.classList.remove('theme-select-blue')
            if (!particle.classList.contains('theme-select-pink')) particle.classList.add('theme-select-pink')
        } else 
        if (themeSelected.classList.contains('theme-select-dark')) {
            this.setState({
                theme:"theme-select-dark"
            })
            themeSelected.classList.remove('theme-select-dark');
            themeSelected.classList.add(this.state.theme1.toString());
            if (particle.classList.contains('theme-select-pink')) particle.classList.remove('theme-select-pink')
            if (particle.classList.contains('theme-select-green')) particle.classList.remove('theme-select-green')
            if (particle.classList.contains('theme-select-blue')) particle.classList.remove('theme-select-blue')
            if (!particle.classList.contains('theme-select-dark')) particle.classList.add('theme-select-dark')
        } else {
            this.setState({
                theme:"theme-select-blue"
            })
            themeSelected.classList.remove('theme-select-blue');
            themeSelected.classList.add(this.state.theme1.toString());
            if (particle.classList.contains('theme-select-pink')) particle.classList.remove('theme-select-pink')
            if (particle.classList.contains('theme-select-dark')) particle.classList.remove('theme-select-dark')
            if (particle.classList.contains('theme-select-green')) particle.classList.remove('theme-select-green')
            if (!particle.classList.contains('theme-select-blue')) particle.classList.add('theme-select-blue')
        }
        this.setState({
            theme1:this.state.theme.toString()
        })
        if (themeSelected.parentElement.style.maxHeight) {
            themeSelected.parentElement.style.maxHeight = null;
        }
    }

    render()
    {
       const {language} = this.state
        return(
            <>
                <div className="container container1">
                    <div className="main-title">
                        <img src="./assets/image/logo.png" alt="" />
                    </div>
                    <div className="main-link">
                        <a href="/signup">
                            <img src="./assets/image/icon2.png" alt="" />
                            <p>{eval(language).signup}</p>
                        </a>
                        <a href="/login">
                            <img src="./assets/image/icon3.png" alt="" />
                            <p>{eval(language).login}</p>
                        </a>
                        <div className="main-link-select">
                            <select name="language" value={this.state.language} onChange={this.handleChangeLanguage}>
                                <option value="jp">{eval(language).japanese}</option>
                                <option value="en">{eval(language).english}</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* <div className="theme-select">
                    <div className="theme-select-container">
                        <div className={`${this.state.theme} theme-select-main`} onClick={this.handleChangeTheme}></div>
                        <div className="theme-select-content">
                            <div className="theme-select-main theme-select-pink" onClick={this.handleChangeTheme1}></div>
                            <div className="theme-select-main theme-select-dark" onClick={this.handleChangeTheme1}></div>
                            <div className="theme-select-main theme-select-blue" onClick={this.handleChangeTheme1}></div>
                        </div>
                    </div>
                </div> */}
            </>
        )
    }
}

export default Top;